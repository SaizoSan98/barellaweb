import { neon } from '@neondatabase/serverless';
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

async function main() {
  const sql = neon(process.env.DATABASE_URL);

  console.log('Creating products table...');

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      brand VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      description TEXT,
      features JSONB DEFAULT '[]'::jsonb,
      images JSONB DEFAULT '[]'::jsonb,
      price INTEGER DEFAULT 0,
      sale_price INTEGER DEFAULT 0,
      sale BOOLEAN DEFAULT false,
      "order" INTEGER DEFAULT 0,
      published BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  // Add new columns if they don't exist (for existing tables)
  try {
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS price INTEGER DEFAULT 0`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS sale_price INTEGER DEFAULT 0`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS sale BOOLEAN DEFAULT false`;
  } catch (e) {
    // Columns might already exist, ignore
  }

  console.log('✅ Products table created successfully!');
}

main().catch(console.error);
