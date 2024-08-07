import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

const getInitialUser = async (): Promise<UserI | null> => {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		redirect("/login");
	}

	const { data } = await supabase.from("profile").select().eq("id", user.id);
	if (data?.[0]) {
		return data[0];
	}

	const userData = user?.user_metadata;
	const { data: newData, error } = await supabase
		.from("profile")
		.insert({
			id: user.id,
			name: userData?.full_name ?? "",
			avatar_url: userData?.avatar_url ?? "",
			email: user?.email,
		})
		.select();
	if (error) {
		return null;
	}
	return newData[0];
};

export default getInitialUser;
