import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const { essayId } = req.query;
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const filePath = join(process.cwd(), 'essays', `${essayId}.json`);
  
  if (!existsSync(filePath)) {
    return res.status(404).json({ error: 'Essay not found' });
  }
  
  try {
    const data = JSON.parse(readFileSync(filePath, 'utf8'));
    const themes = data.themes || [];
    const relationships = data.theme_relationships || [];
    
    return res.status(200).json({ 
      essay_id: essayId,
      themes: themes.map(t => ({
        id: t.id,
        name: t.name,
        thesis: t.thesis,
        relates_to: t.relates_to
      })),
      relationships
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read theme data' });
  }
}
