import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const { tag } = req.query;
  
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
    
    const matching = data.thoughts.filter(t => 
      t.tags.some(tg => tg.toLowerCase() === tag.toLowerCase())
    );
    
    if (matching.length === 0) {
      // Get all unique tags
      const allTags = [...new Set(data.thoughts.flatMap(t => t.tags))].sort();
      return res.status(404).json({
        error: 'No thoughts with this tag',
        available_tags: allTags
      });
    }
    
    return res.status(200).json({
      tag,
      count: matching.length,
      thoughts: matching.map(t => ({
        id: t.id,
        title: t.title,
        text: t.text,
        tweet_url: t.tweet_url,
        href: `/api/thoughts/${t.id}`
      }))
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to search by tag' });
  }
}
