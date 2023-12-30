require('dotenv').config();

const fs = require('fs/promises');

module.exports = (async () => {
  const Typesense = require('typesense');
  let file = await fs.readFile("data/movies.jsonl");
  
  let client = new Typesense.Client({
    'nodes': [{
      'host': process.env.NEXT_PUBLIC_TYPESENSE_HOST,
      'port': process.env.NEXT_PUBLIC_TYPESENSE_PORT,
      'protocol': process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL,
    }],
    'apiKey': process.env.NEXT_PUBLIC_TYPESENSE_ADMIN_API_KEY,
    'connectionTimeoutSeconds': 2
  })

  const collectionName = `movies_${Date.now()}`;

  const schema = {
    name: collectionName,
    fields: [
      { name: 'budget', type: 'string', optional: true },
      { name: 'genres', type: 'string' },
      { name: 'homepage', type: 'string', optional: true },
      { name: 'original_language', type: 'string', optional: true },
      { name: 'overview', type: 'string', optional: true },
      { name: 'popularity', type: 'string', optional: true },
      { name: 'poster_path', type: 'string', optional: true },
      { name: 'release_date', type: 'string', sort: true, optional: true },
      { name: 'revenue', type: 'string', optional: true },
      { name: 'runtime', type: 'string', optional: true },
      { name: 'tagline', type: 'string', optional: true },
      { name: 'title', type: 'string' },
      { name: 'vote_average', type: 'string', optional: true },
      { name: 'vote_count', type: 'string', optional: true },
      { name: 'certification', type: 'string', optional: true },
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
