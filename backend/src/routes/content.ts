import { Router } from 'express';
import { generateContent, saveContent } from '../services/openaiService';
import { getSupabaseClient } from '../services/supabaseService';

const router = Router();

router.post('/generate', async (req, res) => {
  try {
    const { platform, topic, tone } = req.body;
    
    if (!platform || !topic || !tone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const content = await generateContent(platform, topic, tone);
    const saved = await saveContent({ platform, topic, tone, content });
    
    res.json({ success: true, data: saved });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
