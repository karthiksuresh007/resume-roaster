import { supabase } from '../config/supabase'

/**
 * Test Supabase connection and user creation
 */
export async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase connection...')
  
  try {
    // Test 1: Check connection
    const { data: testData, error: testError } = await supabase
      .from('app_users')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ Connection test failed:', testError)
      return { success: false, error: testError.message }
    }
    
    console.log('✅ Connection successful')
    
    // Test 2: Try to insert a test user
    const testUser = {
      id: 'test-' + Date.now(),
      email: 'test@example.com',
      full_name: 'Test User',
      subscription_tier: 'free',
      credits_remaining: 10,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    console.log('🧪 Inserting test user:', testUser)
    
    const { data: insertData, error: insertError } = await supabase
      .from('app_users')
      .insert(testUser)
      .select()
    
    if (insertError) {
      console.error('❌ Insert test failed:', insertError)
      console.error('Error code:', insertError.code)
      console.error('Error message:', insertError.message)
      console.error('Error details:', insertError.details)
      console.error('Error hint:', insertError.hint)
      return { success: false, error: insertError.message }
    }
    
    console.log('✅ Insert successful:', insertData)
    
    // Clean up test user
    await supabase
      .from('app_users')
      .delete()
      .eq('id', testUser.id)
    
    console.log('✅ Cleanup successful')
    
    return { success: true, message: 'All tests passed!' }
  } catch (error) {
    console.error('❌ Test failed:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Get current user from database
 */
export async function getUserFromDatabase(userId) {
  console.log('🔍 Fetching user from database:', userId)
  
  try {
    // Use database function instead of direct query (bypasses API permissions)
    const { data, error } = await supabase
      .rpc('get_user_profile', {
        p_user_id: userId
      })
    
    if (error) {
      console.error('❌ Fetch error:', error)
      return null
    }
    
    console.log('✅ User found:', data)
    return data
  } catch (error) {
    console.error('❌ Fetch failed:', error)
    return null
  }
}
