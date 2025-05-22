#!/usr/bin/env node
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

let store = { card: new Set(), restaurant: new Set() };

app.post('/favorites', (req, res) => {
  const { itemType, itemId } = req.body;
  if (!store[itemType]) return res.status(400).json({ error:'bad type' });
  if (store[itemType].has(itemId)) return res.status(409).json({ error:'Already favorited' });
  store[itemType].add(itemId);
  res.status(201).json({ itemType, itemId, favorited:true });
});

app.get('/favorites', (req, res) => {
  const { itemType } = req.query;
  if (!store[itemType]) return res.status(400).json({ error:'bad type' });
  res.json(Array.from(store[itemType]).map(id => ({ itemId: id })));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Favoriting service listening on port ${PORT}`));