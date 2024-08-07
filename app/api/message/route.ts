import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	const { content, chatId } = await req.json();
	const supabase = createClient();
	const {
		data, error
	} = await supabase.auth.getUser();
	console.log("🚀 ~ POST ~ user:", data)
	if (!data.user) {
		return NextResponse.json({ error: "Unauthorized"+ error}, { status: 401 });
	}
	

	const url = "https://chatgpt-42.p.rapidapi.com/geminipro";
	const options = {
		method: "POST",
		headers: {
			"x-rapidapi-key": "1119f9054amshc0e6281822c7e14p16a3fcjsn07c2402dc006",
			"x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			messages: [
				{
					role: "user",
					content,
				},
			],
			temperature: 0.9,
			top_k: 5,
			top_p: 0.9,
			max_tokens: 256,
			web_access: false,
		}),
	};
	try {
		const response = await fetch(url, options);

		const { result } = await response.json();
		console.log("🚀 ~ POST ~ result:", result)
		const { error, data } = await supabase
			.from("messages")
			.insert([
				{ content, chat_id: chatId, role: "user" },
				{ content: result, chat_id: chatId, role: "assistant" },
			])
			.select();
		if (error) {
			console.log(error);
		} else {
			console.log(data);
		}
		return NextResponse.json({ message: result }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Internal server error: ", error },
			{ status: 500 }
		);
	}
};
