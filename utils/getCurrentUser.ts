import { createClient } from "./supabase/server";

const getCurrentUser = async () => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return user;
  const { data} = await supabase.from("profile").select().eq("id", user.id).single()
  return data as UserI;
}
export default getCurrentUser;