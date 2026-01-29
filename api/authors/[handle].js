import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const { handle } = req.query;
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const essaysDir = join(process.cwd(), 'essays');
    const files = readdirSync(essaysDir).filter(f => f.endsWith('.json'));
    
    let authorInfo = null;
    const essays = [];
    const quotes = [];
    
    for (const file of files) {
      const data = JSON.parse(readFileSync(join(essaysDir, file), 'utf8'));
      const essayId = file.replace('.json', '');
      
      // Check if author is in this essay
      const author = (data.authors || []).find(a => a.handle === handle || a.name === handle);
      
      if (author) {
        if (!authorInfo) {
          authorInfo = author;
        }
        
        essays.push({
          id: essayId,
          title: data.title,
          href: `/api/essays/${essayId}`
        });
        
        // Collect quotes from this author
        for (const theme of (data.themes || [])) {
          for (const evidence of (theme.evidence || [])) {
            if (evidence.speaker === author.name || evidence.speaker === author.handle) {
              quotes.push({
                essay_id: essayId,
                theme_id: theme.id,
                theme_name: theme.name,
                quote: evidence.quote
              });
            }
          }
        }
      }
    }
    
    if (!authorInfo) {
      return res.status(404).json({ 
        error: 'Author not found',
        hint: 'Try searching by handle (e.g., "tomismeta") or name (e.g., "tom")'
      });
    }
    
    return res.status(200).json({
      author: authorInfo,
      essays,
      quotes,
      quote_count: quotes.length
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to search author data' });
  }
}
