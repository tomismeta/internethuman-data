import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const { id } = req.query;
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const filePath = join(process.cwd(), 'essays', `${id}.json`);
  
  if (!existsSync(filePath)) {
    return res.status(404).json({ 
      error: 'Essay not found',
      available: ['new-art']
    });
  }
  
  try {
    const data = JSON.parse(readFileSync(filePath, 'utf8'));
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read essay data' });
  }
}
