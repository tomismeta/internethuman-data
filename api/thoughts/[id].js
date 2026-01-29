import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const { id } = req.query;
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const filePath = join(process.cwd(), 'thoughts', 'thoughts.json');
    const data = JSON.parse(readFileSync(filePath, 'utf8'));
    
    const thought = data.thoughts.find(t => t.id === id);
    
    if (!thought) {
      return res.status(404).json({
        error: 'Thought not found',
        available: data.thoughts.map(t => t.id)
      });
    }
    
    return res.status(200).json({
      ...thought,
      author: data.author
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read thought data' });
  }
}
