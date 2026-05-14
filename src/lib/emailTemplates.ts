export type QuoteFormData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  description: string;
};

// Ügyfélnek küldött visszaigazoló email
export function getClientEmailHtml(data: QuoteFormData): string {
  return `
<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Ajánlatkérés visszaigazolása – Barella</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#111111;border-radius:24px;overflow:hidden;border:1px solid #222;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#111 0%,#1a1a1a 100%);padding:48px 40px 40px;text-align:center;border-bottom:1px solid #222;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div style="display:inline-block;background:#f0c040;border-radius:12px;padding:10px 20px;margin-bottom:24px;">
                      <span style="font-size:22px;font-weight:900;color:#000;letter-spacing:4px;text-transform:uppercase;">BARELLA</span>
                    </div>
                    <div style="font-size:11px;color:#888;letter-spacing:3px;text-transform:uppercase;margin-top:4px;">ÉPÜLETGÉPÉSZET</div>
                  </td>
                </tr>
              </table>
              <h1 style="margin:32px 0 8px;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-1px;text-transform:uppercase;">Köszönjük ajánlatkérését!</h1>
              <p style="margin:0;font-size:15px;color:#888;line-height:1.6;">Hamarosan felvesszük Önnel a kapcsolatot.</p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:40px;">

              <p style="margin:0 0 24px;font-size:15px;color:#ccc;line-height:1.7;">
                Kedves <strong style="color:#fff;">${data.name}</strong>,
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#999;line-height:1.7;">
                Megkaptuk ajánlatkérését, és <strong style="color:#fff;">munkanapokon belül</strong> – általában néhány órán belül – felvesszük Önnel a kapcsolatot. Addig is, ha sürgős a megkeresése, hívjon minket közvetlenül!
              </p>

              <!-- Összefoglaló kártya -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:16px;border:1px solid #2a2a2a;margin-bottom:32px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #222;">
                    <p style="margin:0;font-size:10px;font-weight:700;color:#f0c040;letter-spacing:3px;text-transform:uppercase;">AZ ÖN KÉRÉSÉNEK ÖSSZEFOGLALÓJA</p>
                  </td>
                </tr>
                ${data.service ? `<tr><td style="padding:14px 24px;border-bottom:1px solid #1e1e1e;">
                  <span style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px;">Szolgáltatás</span><br/>
                  <span style="font-size:15px;color:#fff;font-weight:600;">${data.service}</span>
                </td></tr>` : ''}
                ${data.location ? `<tr><td style="padding:14px 24px;border-bottom:1px solid #1e1e1e;">
                  <span style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px;">Munkavégzés helye</span><br/>
                  <span style="font-size:15px;color:#fff;font-weight:600;">${data.location}</span>
                </td></tr>` : ''}
                ${data.description ? `<tr><td style="padding:14px 24px;">
                  <span style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px;">Leírás</span><br/>
                  <span style="font-size:14px;color:#bbb;line-height:1.6;">${data.description}</span>
                </td></tr>` : ''}
              </table>

              <!-- Kapcsolat gomb -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <a href="tel:+36301738866" style="display:inline-block;background:#f0c040;color:#000;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:2px;padding:16px 36px;border-radius:12px;text-decoration:none;">
                      📞 +36 30 173 8866
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#666;line-height:1.7;">
                Üdvözlettel,<br/>
                <strong style="color:#bbb;">Baglyos Ferenc</strong><br/>
                <span style="color:#555;">Barella Épületgépészet</span>
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#0d0d0d;padding:24px 40px;border-top:1px solid #1e1e1e;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:#444;">
                Barella Épületgépészet &middot; Baglyos Ferenc E.V. &middot; 4525 Rétközberencs, Újsor út 1.
              </p>
              <p style="margin:0;font-size:11px;color:#333;">
                <a href="https://barella.hu" style="color:#555;text-decoration:none;">barella.hu</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:barella.gep@gmail.com" style="color:#555;text-decoration:none;">barella.gep@gmail.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// Barellának küldött belső értesítő email
export function getAdminEmailHtml(data: QuoteFormData): string {
  const now = new Date().toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' });
  return `
<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Új ajánlatkérés – Barella Admin</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#111111;border-radius:24px;overflow:hidden;border:1px solid #f0c040;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1400 0%,#2a1f00 100%);padding:36px 40px;text-align:center;border-bottom:1px solid #3a2e00;">
              <div style="display:inline-block;background:#f0c040;border-radius:12px;padding:10px 20px;margin-bottom:16px;">
                <span style="font-size:22px;font-weight:900;color:#000;letter-spacing:4px;text-transform:uppercase;">BARELLA</span>
              </div>
              <h1 style="margin:16px 0 4px;font-size:22px;font-weight:900;color:#f0c040;letter-spacing:-0.5px;">🔔 ÚJ AJÁNLATKÉRÉS ÉRKEZETT!</h1>
              <p style="margin:0;font-size:12px;color:#888;">${now}</p>
            </td>
          </tr>

          <!-- ÜGYFÉL ADATAI -->
          <tr>
            <td style="padding:32px 40px 0;">
              <p style="margin:0 0 16px;font-size:10px;font-weight:700;color:#f0c040;letter-spacing:3px;text-transform:uppercase;">ÜGYFÉL ADATAI</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:16px;border:1px solid #2a2a2a;overflow:hidden;">
                <tr><td style="padding:14px 20px;border-bottom:1px solid #222;">
                  <span style="font-size:11px;color:#555;text-transform:uppercase;letter-spacing:1px;">Név</span><br/>
                  <span style="font-size:16px;color:#fff;font-weight:700;">${data.name}</span>
                </td></tr>
                <tr><td style="padding:14px 20px;border-bottom:1px solid #222;">
                  <span style="font-size:11px;color:#555;text-transform:uppercase;letter-spacing:1px;">Email</span><br/>
                  <a href="mailto:${data.email}" style="font-size:15px;color:#f0c040;font-weight:600;text-decoration:none;">${data.email}</a>
                </td></tr>
                <tr><td style="padding:14px 20px;">
                  <span style="font-size:11px;color:#555;text-transform:uppercase;letter-spacing:1px;">Telefon</span><br/>
                  <a href="tel:${data.phone}" style="font-size:16px;color:#f0c040;font-weight:700;text-decoration:none;">${data.phone}</a>
                </td></tr>
              </table>
            </td>
          </tr>

          <!-- PROJEKT RÉSZLETEI -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0 0 16px;font-size:10px;font-weight:700;color:#f0c040;letter-spacing:3px;text-transform:uppercase;">PROJEKT RÉSZLETEI</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:16px;border:1px solid #2a2a2a;overflow:hidden;">
                ${data.service ? `<tr><td style="padding:14px 20px;border-bottom:1px solid #222;">
                  <span style="font-size:11px;color:#555;text-transform:uppercase;letter-spacing:1px;">Szolgáltatás</span><br/>
                  <span style="font-size:15px;color:#fff;font-weight:600;">${data.service}</span>
                </td></tr>` : ''}
                ${data.location ? `<tr><td style="padding:14px 20px;border-bottom:1px solid #222;">
                  <span style="font-size:11px;color:#555;text-transform:uppercase;letter-spacing:1px;">Helyszín</span><br/>
                  <span style="font-size:15px;color:#fff;font-weight:600;">${data.location}</span>
                </td></tr>` : ''}
                ${data.description ? `<tr><td style="padding:14px 20px;">
                  <span style="font-size:11px;color:#555;text-transform:uppercase;letter-spacing:1px;">Leírás</span><br/>
                  <span style="font-size:14px;color:#bbb;line-height:1.7;">${data.description}</span>
                </td></tr>` : ''}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:32px 40px 40px;text-align:center;">
              <a href="mailto:${data.email}" style="display:inline-block;background:#f0c040;color:#000;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:2px;padding:16px 36px;border-radius:12px;text-decoration:none;margin-right:12px;">
                ✉️ Válasz küldése
              </a>
              <a href="tel:${data.phone}" style="display:inline-block;background:#1e1e1e;color:#f0c040;border:2px solid #f0c040;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:2px;padding:14px 28px;border-radius:12px;text-decoration:none;">
                📞 Visszahívás
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#0d0d0d;padding:20px 40px;border-top:1px solid #1e1e1e;text-align:center;">
              <p style="margin:0;font-size:11px;color:#333;">Ez egy automatikus értesítő a barella.hu rendszeréből.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
