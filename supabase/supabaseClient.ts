// supabase/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
// import {config} from 'dotenv';

// config();

const supabaseUrl:string = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey:string = import.meta.env.VITE_SUPABASE_ANON_KEY!;
// console.log(supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey);