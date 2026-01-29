import { readdirSync } from 'fs';
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
    const essays = files.map(f => ({
      id: f.replace('.json', ''),
      href: `/api/essays/${f.replace('.json', '')}`
    }));
    
    return res.status(200).json({ essays });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to list essays' });
  }
}
