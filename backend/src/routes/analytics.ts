import { Router } from 'express';
import { getSupabaseClient } from '../services/supabaseService';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
