import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
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
    
    // Return summary list
    const thoughts = data.thoughts.map(t => ({
      id: t.id,
      title: t.title,
      href: `/api/thoughts/${t.id}`,
      tags: t.tags
    }));
    
    return res.status(200).json({
      collection: data.collection,
      description: data.description,
      author: data.author,
      epigraphs: data.epigraphs,
      count: thoughts.length,
      thoughts
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read thoughts data' });
  }
}
