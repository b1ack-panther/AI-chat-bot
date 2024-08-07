import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	console.log(user?.id);

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
 
	const { data } = await supabase
		.from("chats")
		.insert({ user_id: user.id })
		.select().single();
	return NextResponse.json({ data });
};
