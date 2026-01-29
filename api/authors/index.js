import { readFileSync, readdirSync } from 'fs';
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
    const essaysDir = join(process.cwd(), 'essays');
    const files = readdirSync(essaysDir).filter(f => f.endsWith('.json'));
    
    const authorsMap = new Map();
    
    for (const file of files) {
      const data = JSON.parse(readFileSync(join(essaysDir, file), 'utf8'));
      const essayId = file.replace('.json', '');
      
      for (const author of (data.authors || [])) {
        const key = author.handle || author.name;
        if (!authorsMap.has(key)) {
          authorsMap.set(key, {
            ...author,
            essays: [],
            href: `/api/authors/${author.handle || author.name}`
          });
        }
        authorsMap.get(key).essays.push(essayId);
      }
    }
    
    return res.status(200).json({
      authors: Array.from(authorsMap.values())
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to list authors' });
  }
}
