import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const { essayId, themeId } = req.query;
  
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
    const theme = (data.themes || []).find(t => t.id === themeId);
    
    if (!theme) {
      return res.status(404).json({ 
        error: 'Theme not found',
        available: (data.themes || []).map(t => t.id)
      });
    }
    
    // Get relationships involving this theme
    const relationships = (data.theme_relationships || []).filter(
      r => r.from === themeId || r.to === themeId
    );
    
    return res.status(200).json({
      essay_id: essayId,
      theme,
      relationships
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read theme data' });
  }
}
