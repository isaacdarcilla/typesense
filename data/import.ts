require('dotenv').config();

const fs = require('fs/promises');

module.exports = (async () => {
  const Typesense = require('typesense');
  let file = await fs.readFile("data/animals.jsonl");
  
  let client = new Typesense.Client({
    'nodes': [{
      'host': process.env.NEXT_PUBLIC_TYPESENSE_HOST,
      'port': process.env.NEXT_PUBLIC_TYPESENSE_PORT,
      'protocol': process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL,
    }],
    'apiKey': process.env.NEXT_PUBLIC_TYPESENSE_ADMIN_API_KEY,
    'connectionTimeoutSeconds': 2
  })

  const collectionName = `animals_${Date.now()}`;

  const schema = {
    name: collectionName,
    fields: [
      { name: 'animal_name', type: 'string' },
      { name: 'source', type: 'string' },
      { name: 'text', type: 'string', optional: true },
      { name: 'media_link', type: 'string', optional: true },
      { name: 'wikipedia_link', type: 'string', optional: true },
    ],
  };

  try {
    await client.collections().create(schema);
    await client.collections(collectionName).documents().import(file);

    console.log('Done... ✅');
  } catch (e) {
    console.log(`Error occurred: ${e}`);
  }
})();
