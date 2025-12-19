import OpenAI from 'openai';
import { getSupabaseClient } from './supabaseService';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateContent(platform: string, topic: string, tone: string) {
  const prompt = `Generate a ${tone} social media post for ${platform} about "${topic}". Keep it engaging and platform-appropriate. Maximum 200 characters.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 200,
  });

  return completion.choices[0].message.content;
}

export async function saveContent(data: any) {
  const supabase = getSupabaseClient();
  const { data: saved, error } = await supabase
    .from('content')
    .insert([{
      platform: data.platform,
      topic: data.topic,
      tone: data.tone,
      generated_content: data.content,
      status: 'draft'
    }])
    .select()
    .single();
  
  if (error) throw error;
  return saved;
}
