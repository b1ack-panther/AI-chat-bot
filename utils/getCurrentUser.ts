import { createClient } from "./supabase/server";

const getCurrentUser = async () => {
	const supabase = createClient();
	const {
		data: { user },
  } = await supabase.auth.getUser();
  
  return user;

};
export default getCurrentUser;
