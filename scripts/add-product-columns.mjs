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

    console.log('Adding new columns to products table...');
    
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS price_title varchar(255);');
    console.log('Successfully added price_title column');

    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS vat_info varchar(255);');
    console.log('Successfully added vat_info column');

    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS availability_info varchar(255);');
    console.log('Successfully added availability_info column');

    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS exclusive_label varchar(255);');
    console.log('Successfully added exclusive_label column');

  } catch (err) {
    console.error('Error executing SQL:', err);
  } finally {
    await client.end();
  }
}

run();