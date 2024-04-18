import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lnhfdvnphjttttbjdieu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuaGZkdm5waGp0dHR0YmpkaWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3ODA2NjEsImV4cCI6MjAyODM1NjY2MX0.LhlE8mTEJ7wwwD6Gr2j8wUbguV-sDKBqm10bsJLArq8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
