// test_favorites.js
import fetch from 'node-fetch';

async function run() {
  console.log('📌 Adding “Demo Item” to favorites…');
  let res = await fetch('http://localhost:3000/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itemType: 'card', itemId: 'demo-123' })
  });
  console.log('Response:', await res.json());
  
  console.log('\n📋 Listing favorites for cards…');
  res = await fetch('http://localhost:3000/favorites?itemType=card');
  console.log('Response:', await res.json());
}

run().catch(console.error);