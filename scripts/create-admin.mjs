import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { readFileSync } from 'fs';

// Load .env manually
for (const file of ['.env.local', '.env']) {
  try {
    const env = readFileSync(file, 'utf8');
    for (const line of env.split('\n')) {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const val = match[2].trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) process.env[key] = val;
      }
    }
    break;
  } catch {}
}

const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

const EMAIL = process.env.ADMIN_EMAIL || process.argv[2];
const PASSWORD = process.env.ADMIN_INIT_PASSWORD || process.argv[3];

async function main() {
  if (!EMAIL || !PASSWORD) {
    console.error('Használat: node scripts/create-admin.mjs <email> <jelszó>');
    console.error('Vagy állítsd be: ADMIN_EMAIL és ADMIN_INIT_PASSWORD env változókat');
    process.exit(1);
  }
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  // Create table if not exists
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  // Delete existing users
  await sql`DELETE FROM admin_users`;

  // Create new admin user
  const hash = await bcrypt.hash(PASSWORD, 12);
  await sql`INSERT INTO admin_users (email, password_hash) VALUES (${EMAIL}, ${hash})`;

  console.log('');
  console.log('✅ Admin felhasználó sikeresen létrehozva!');
  console.log('');
  console.log('  📧 Email:   ' + EMAIL);
  console.log('  🔒 Jelszó:  ' + PASSWORD);
  console.log('');
  console.log('  Belépés: /admin/login');
  console.log('');
}

main().catch(console.error);
