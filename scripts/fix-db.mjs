import pkg from 'pg';
const { Client } = pkg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const client = new Client({
  connectionString: databaseUrl,
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to database');

    console.log('Adding price_includes column to products table...');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS price_includes text;');
    console.log('Successfully added price_includes column');

    console.log('Adding unique constraint to admin_users email...');
    // We wrap this in a try-catch because it might already exist or fail if data is not unique
    try {
        await client.query('ALTER TABLE admin_users ADD CONSTRAINT admin_users_email_unique UNIQUE (email);');
        console.log('Successfully added unique constraint');
    } catch (e) {
        console.log('Note: Could not add unique constraint (maybe it already exists?):', e.message);
    }

  } catch (err) {
    console.error('Error executing SQL:', err);
  } finally {
    await client.end();
  }
}

run();
