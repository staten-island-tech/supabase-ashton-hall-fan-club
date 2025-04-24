import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://fzttjvopqjnwhxpmdmqi.supabase.co'
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6dHRqdm9wcWpud2h4cG1kbXFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwOTI2OTgsImV4cCI6MjA1ODY2ODY5OH0.p9guncqpjQUmqqr8VmrFnTwNElriHRl9U8h6_U7jWSE'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase
