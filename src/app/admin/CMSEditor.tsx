'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ChevronRight, ChevronDown, FileText, Mail, Phone, MapPin, Type } from 'lucide-react';

// Content key to Hungarian label mapping
const CONTENT_LABELS: Record<string, { label: string; icon: any; description: string }> = {
  'hero_title': {
    label: 'Főoldal címsor',
    icon: Type,
    description: 'A főoldal főcíme (pl. BARELLA)'
  },
  'hero_cta_text': {
    label: 'Hero gomb szöveg',
    icon: FileText,
    description: 'A főoldali CTA gomb szövege (pl. AJÁNLATKÉRÉS)'
  },
  'contact_email': {
    label: 'Email cím',
    icon: Mail,
    description: 'Kapcsolati email cím'
  },
  'contact_phone': {
    label: 'Telefonszám',
    icon: Phone,
    description: 'Kapcsolati telefonszám'
  },
  'contact_address': {
    label: 'Székhely',
    icon: MapPin,
    description: 'Cég székhelye'
  },
  'brands_title': {
    label: 'Partnerek szekció címe',
    icon: FileText,
    description: 'A technológiai partnerek szekció fejléc szövege'
  },
  'process_subtitle': {
    label: 'Folyamat alcím',
    icon: FileText,
    description: 'A folyamat szekció alcíme (pl. Hogyan dolgozunk?)'
  },
  'process_title': {
    label: 'Folyamat főcím',
    icon: FileText,
    description: 'A folyamat szekció főcíme (pl. A közös munka lépései)'
  },
  'process_step_1_title': {
    label: '1. lépés címe',
    icon: FileText,
    description: 'Az első folyamat lépés címe'
  },
  'process_step_1_desc': {
    label: '1. lépés leírása',
    icon: FileText,
    description: 'Az első folyamat lépés leírása'
  },
  'process_step_2_title': {
    label: '2. lépés címe',
    icon: FileText,
    description: 'A második folyamat lépés címe'
  },
  'process_step_2_desc': {
    label: '2. lépés leírása',
    icon: FileText,
    description: 'A második folyamat lépés leírása'
  },
  'process_step_3_title': {
    label: '3. lépés címe',
    icon: FileText,
    description: 'A harmadik folyamat lépés címe'
  },
  'process_step_3_desc': {
    label: '3. lépés leírása',
    icon: FileText,
    description: 'A harmadik folyamat lépés leírása'
  },
  'process_step_4_title': {
    label: '4. lépés címe',
    icon: FileText,
    description: 'A negyedik folyamat lépés címe'
  },
  'process_step_4_desc': {
    label: '4. lépés leírása',
    icon: FileText,
    description: 'A negyedik folyamat lépés leírása'
  },
  'faq_subtitle': {
    label: 'GYIK alcím',
    icon: FileText,
    description: 'A GYIK szekció alcíme (pl. Tudnivalók)'
  },
  'faq_title': {
    label: 'GYIK főcím',
    icon: FileText,
    description: 'A GYIK szekció főcíme (pl. Gyakori kérdések)'
  },
  'faq_1_question': {
    label: '1. kérdés',
    icon: FileText,
    description: 'Az első gyakori kérdés'
  },
  'faq_1_answer': {
    label: '1. válasz',
    icon: FileText,
    description: 'Az első kérdés válasza'
  },
  'faq_2_question': {
    label: '2. kérdés',
    icon: FileText,
    description: 'A második gyakori kérdés'
  },
  'faq_2_answer': {
    label: '2. válasz',
    icon: FileText,
    description: 'A második kérdés válasza'
  },
  'faq_3_question': {
    label: '3. kérdés',
    icon: FileText,
    description: 'A harmadik gyakori kérdés'
  },
  'faq_3_answer': {
    label: '3. válasz',
    icon: FileText,
    description: 'A harmadik kérdés válasza'
  },
  'faq_4_question': {
    label: '4. kérdés',
    icon: FileText,
    description: 'A negyedik gyakori kérdés'
  },
  'faq_4_answer': {
    label: '4. válasz',
    icon: FileText,
    description: 'A negyedik kérdés válasza'
  },
  'faq_5_question': {
    label: '5. kérdés',
    icon: FileText,
    description: 'Az ötödik gyakori kérdés'
  },
  'faq_5_answer': {
    label: '5. válasz',
    icon: FileText,
    description: 'Az ötödik kérdés válasza'
  },
  'service_1_image': {
    label: 'Klímatechnika szolgáltatás képe',
    icon: FileText,
    description: 'Klímatechnika szolgáltatás főképe'
  },
  'service_2_image': {
    label: 'Hőszivattyú szolgáltatás képe',
    icon: FileText,
    description: 'Hőszivattyú szolgáltatás főképe'
  },
  'service_3_image': {
    label: 'Ventiláció szolgáltatás képe',
    icon: FileText,
    description: 'Ventiláció szolgáltatás főképe'
  },
  'service_4_image': {
    label: 'Vízgazdálkodás szolgáltatás képe',
    icon: FileText,
    description: 'Vízgazdálkodás szolgáltatás főképe'
  },
  'service_5_image': {
    label: 'Gépészet szolgáltatás képe',
    icon: FileText,
    description: 'Gépészet szolgáltatás főképe'
  },
  'service_6_image': {
    label: 'Karbantartás szolgáltatás képe',
    icon: FileText,
    description: 'Karbantartás szolgáltatás főképe'
  },
  'service_1_ref_1': {
    label: 'Klímatechnika referencia kép 1',
    icon: FileText,
    description: 'Klímatechnika szolgáltatás első referencia képe'
  },
  'service_1_ref_2': {
    label: 'Klímatechnika referencia kép 2',
    icon: FileText,
    description: 'Klímatechnika szolgáltatás második referencia képe'
  },
  'service_2_ref_1': {
    label: 'Hőszivattyú referencia kép 1',
    icon: FileText,
    description: 'Hőszivattyú szolgáltatás első referencia képe'
  },
  'service_2_ref_2': {
    label: 'Hőszivattyú referencia kép 2',
    icon: FileText,
    description: 'Hőszivattyú szolgáltatás második referencia képe'
  },
  'service_3_ref_1': {
    label: 'Ventiláció referencia kép 1',
    icon: FileText,
    description: 'Ventiláció szolgáltatás első referencia képe'
  },
  'service_3_ref_2': {
    label: 'Ventiláció referencia kép 2',
    icon: FileText,
    description: 'Ventiláció szolgáltatás második referencia képe'
  },
  'service_4_ref_1': {
    label: 'Vízgazdálkodás referencia kép 1',
    icon: FileText,
    description: 'Vízgazdálkodás szolgáltatás első referencia képe'
  },
  'service_4_ref_2': {
    label: 'Vízgazdálkodás referencia kép 2',
    icon: FileText,
    description: 'Vízgazdálkodás szolgáltatás második referencia képe'
  },
  'service_5_ref_1': {
    label: 'Gépészet referencia kép 1',
    icon: FileText,
    description: 'Gépészet szolgáltatás első referencia képe'
  },
  'service_5_ref_2': {
    label: 'Gépészet referencia kép 2',
    icon: FileText,
    description: 'Gépészet szolgáltatás második referencia képe'
  },
  'service_6_ref_1': {
    label: 'Karbantartás referencia kép 1',
    icon: FileText,
    description: 'Karbantartás szolgáltatás első referencia képe'
  },
  'service_6_ref_2': {
    label: 'Karbantartás referencia kép 2',
    icon: FileText,
    description: 'Karbantartás szolgáltatás második referencia képe'
  }
};

type CmsPage = {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

type CmsSection = {
  id: number;
  pageId: number;
  slug: string;
  title: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

type CmsContent = {
  id: number;
  sectionId: number;
  key: string;
  type: string;
  value: string | null;
  jsonValue: any;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function CMSEditor() {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [expandedPage, setExpandedPage] = useState<number | null>(null);
  const [sections, setSections] = useState<Record<number, CmsSection[]>>({});
  const [contents, setContents] = useState<Record<number, CmsContent[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingContent, setEditingContent] = useState<CmsContent | null>(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/cms/pages');
      if (!res.ok) throw new Error('Failed to fetch pages');
      const data = await res.json();
      setPages(data);

      // Auto-seed if no pages exist
      if (data.length === 0) {
        console.log('No pages found, auto-seeding CMS...');
        try {
          const seedRes = await fetch('/api/cms/seed', { method: 'POST' });
          if (seedRes.ok) {
            console.log('Auto-seed successful');
            // Refetch pages after seed
            const refetchRes = await fetch('/api/cms/pages');
            if (refetchRes.ok) {
              const refetchData = await refetchRes.json();
              setPages(refetchData);
            }
          }
        } catch (seedErr) {
          console.error('Auto-seed failed:', seedErr);
        }
      }
    } catch (err) {
      setError('Hiba történt az oldalak betöltésekor');
    } finally {
      setLoading(false);
    }
  };

  const fetchSections = async (pageId: number) => {
    try {
      const res = await fetch(`/api/cms/sections?pageId=${pageId}`);
      if (!res.ok) throw new Error('Failed to fetch sections');
      const data = await res.json();
      setSections(prev => ({ ...prev, [pageId]: data }));
    } catch (err) {
      console.error('Error fetching sections:', err);
    }
  };

  const fetchContents = async (sectionId: number) => {
    try {
      const res = await fetch(`/api/cms/contents?sectionId=${sectionId}`);
      if (!res.ok) throw new Error('Failed to fetch contents');
      const data = await res.json();
      setContents(prev => ({ ...prev, [sectionId]: data }));
    } catch (err) {
      console.error('Error fetching contents:', err);
    }
  };

  const handlePageExpand = async (pageId: number) => {
    if (expandedPage === pageId) {
      setExpandedPage(null);
    } else {
      setExpandedPage(pageId);
      if (!sections[pageId]) {
        await fetchSections(pageId);
      }
    }
  };

  const handleSectionExpand = async (sectionId: number) => {
    if (!contents[sectionId]) {
      await fetchContents(sectionId);
    }
  };

  const handleEditContent = (content: CmsContent) => {
    setEditingContent(content);
    setShowContentModal(true);
  };

  const handleSaveContent = async (data: any) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/cms/contents/${editingContent?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        // Revalidate and refresh
        await fetchContents(editingContent?.sectionId || 0);
        setShowContentModal(false);
        setEditingContent(null);
      }
    } catch (err) {
      console.error('Error saving content:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Betöltés...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-6">📝 Tartalomkezelő</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {pages.map((page) => (
          <div key={page.id} className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden">
            {/* Page Header */}
            <div
              className="flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => handlePageExpand(page.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <FileText className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{page.title}</h3>
                  <p className="text-sm text-gray-400">{page.description || page.slug}</p>
                </div>
              </div>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform ${
                  expandedPage === page.id ? 'rotate-180' : ''
                }`}
              />
            </div>

            {/* Page Content */}
            {expandedPage === page.id && (
              <div className="p-6 space-y-4">
                {sections[page.id] && sections[page.id].length > 0 ? (
                  sections[page.id].map((section) => (
                    <div key={section.id} className="bg-zinc-800/50 border border-white/10 rounded-xl overflow-hidden">
                      {/* Section Header */}
                      <div
                        className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => handleSectionExpand(section.id)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-primary">{section.order + 1}.</span>
                          <span className="text-base font-medium text-white">{section.title}</span>
                        </div>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform ${
                            contents[section.id] ? 'rotate-180' : ''
                          }`}
                        />
                      </div>

                      {/* Section Contents */}
                      {contents[section.id] && (
                        <div className="p-4 space-y-3">
                          {contents[section.id].map((content) => {
                            const labelInfo = CONTENT_LABELS[content.key] || {
                              label: content.key,
                              icon: FileText,
                              description: 'Egyedi tartalom'
                            };
                            const Icon = labelInfo.icon;

                            return (
                              <div
                                key={content.id}
                                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-primary/30 transition-all"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-4 flex-1">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                      <Icon className="text-primary" size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-bold text-white mb-1">{labelInfo.label}</h4>
                                      <p className="text-xs text-gray-500 mb-2">{labelInfo.description}</p>
                                      <div className="bg-zinc-900/50 rounded-lg p-3 border border-white/10">
                                        <p className="text-sm text-gray-300 break-words">
                                          {content.value || '<üres>'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleEditContent(content)}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg font-bold hover:bg-white transition-colors shrink-0"
                                  >
                                    <Edit2 size={16} />
                                    Szerkesztés
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Nincsenek szekciók ezen az oldalon</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {pages.length === 0 && !loading && (
        <div className="text-center py-16">
          <FileText size={64} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400 mb-2">Nincsenek oldalak a rendszerben</p>
          <p className="text-sm text-gray-500">Az oldalak automatikusan létrejönnek a seed folyamat során</p>
        </div>
      )}
      {showContentModal && editingContent && (
        <ContentEditModal
          content={editingContent}
          onClose={() => {
            setShowContentModal(false);
            setEditingContent(null);
          }}
          onSave={handleSaveContent}
          saving={saving}
        />
      )}
    </div>
  );
}

function ContentEditModal({ content, onClose, onSave, saving }: { content: CmsContent; onClose: () => void; onSave: (data: any) => void; saving: boolean }) {
  const labelInfo = CONTENT_LABELS[content.key] || {
    label: content.key,
    icon: FileText,
    description: 'Egyedi tartalom'
  };
  const Icon = labelInfo.icon;
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(content.value || '');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/cms/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setPreviewUrl(data.url);
        onSave({ ...content, value: data.url });
      }
    } catch (err) {
      alert('Kép feltöltése sikertelen');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Icon className="text-primary" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{labelInfo.label}</h3>
            <p className="text-xs text-gray-500">{labelInfo.description}</p>
          </div>
        </div>
        <div className="space-y-4">
          {content.type === 'text' && (
            <div>
              <label className="block text-sm font-bold mb-2">Érték</label>
              <textarea
                value={content.value || ''}
                onChange={(e) => onSave({ ...content, value: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
                placeholder="Írd be az új értéket..."
              />
            </div>
          )}
          {content.type === 'image' && (
            <div>
              <label className="block text-sm font-bold mb-2">Kép</label>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <span className="text-sm">{uploading ? 'Feltöltés...' : 'Kép feltöltése'}</span>
                  </label>
                </div>
                {previewUrl && (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800 border border-white/10">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold mb-2">Vagy kézileg adja meg az URL-t:</label>
                  <input
                    type="text"
                    value={previewUrl}
                    onChange={(e) => {
                      setPreviewUrl(e.target.value);
                      onSave({ ...content, value: e.target.value });
                    }}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-white/10 rounded-lg font-bold hover:bg-white/5 transition-colors"
          >
            Mégse
          </button>
          <button
            onClick={() => onSave(content)}
            disabled={saving || uploading}
            className="flex-1 px-4 py-2 bg-primary text-black rounded-lg font-bold hover:bg-white transition-colors disabled:opacity-50"
          >
            {saving ? 'Mentés...' : uploading ? 'Feltöltés...' : 'Mentés'}
          </button>
        </div>
      </div>
    </div>
  );
}
