import { createClient } from '@supabase/supabase-js'

// Replace these with your Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Progress tracking functions
export const saveProgress = async (userId, lessonId, score, completed) => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        score: score,
        completed: completed,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,lesson_id'
      })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving progress:', error)
    return null
  }
}

export const getProgress = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching progress:', error)
    return []
  }
}

export const getOverallProgress = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('completed')
      .eq('user_id', userId)
    
    if (error) throw error
    
    const totalLessons = 20 // Update based on total lessons
    const completedLessons = data.filter(item => item.completed).length
    
    return {
      total: totalLessons,
      completed: completedLessons,
      percentage: Math.round((completedLessons / totalLessons) * 100)
    }
  } catch (error) {
    console.error('Error fetching overall progress:', error)
    return { total: 0, completed: 0, percentage: 0 }
  }
}

