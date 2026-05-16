import { upload } from '@vercel/blob/client';
import imageCompression from 'browser-image-compression';

export async function uploadImage(file: File, endpoint: string = '/api/upload'): Promise<string> {
  const compressed = await imageCompression(file, {
    maxSizeMB: 1.5,
    maxWidthOrHeight: 2400,
    useWebWorker: true,
    fileType: 'image/webp',
    initialQuality: 0.85,
  });

  const filename = file.name.replace(/\.[^.]+$/, '.webp');
  const webpFile = new File([compressed], filename, { type: 'image/webp' });

  const blob = await upload(webpFile.name, webpFile, {
    access: 'public',
    handleUploadUrl: endpoint,
  });

  return blob.url;
}
