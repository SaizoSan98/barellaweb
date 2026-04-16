import { Client } from 'pg';

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Add new columns to products table
    const queries = [
      'ALTER TABLE products ADD COLUMN IF NOT EXISTS price_title VARCHAR(255)',
      'ALTER TABLE products ADD COLUMN IF NOT EXISTS vat_info VARCHAR(255)',
      'ALTER TABLE products ADD COLUMN IF NOT EXISTS availability_info VARCHAR(255)',
      'ALTER TABLE products ADD COLUMN IF NOT EXISTS exclusive_label VARCHAR(255)',
    ];

    for (const query of queries) {
      try {
        await client.query(query);
        console.log(`Executed: ${query}`);
      } catch (err) {
        if (err.message.includes('already exists')) {
          console.log(`Column already exists, skipping...`);
        } else {
          throw err;
        }
      }
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
