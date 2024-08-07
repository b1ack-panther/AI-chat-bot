"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const handleSubmit = async (
	formData: FormData,
	paramsChatId: string
) => {
	const supabase = createClient();
	let chatId = paramsChatId;
	const input = formData.get("input") as string;
	if (paramsChatId === "new") {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) {
			redirect("/login");
		}
		let title =
			input.split(" ").slice(0, 8).join(" ") +
			(input.split(" ").length > 8 ? "..." : "");
		const { data, error } = await supabase
			.from("chats")
			.insert({ user_id: user.id, title })
			.select()
			.single();
		
		if (error) {
			console.log(error);
			return;
		}
		chatId = data.id;
	}
	try {
		await supabase.from("messages").insert({ chat_id: chatId, content: input, role: "user" })
		const url = "https://chatgpt-42.p.rapidapi.com/geminipro";
		const options = {
			method: "POST",
			headers: {
				"x-rapidapi-key":
				"1119f9054amshc0e6281822c7e14p16a3fcjsn07c2402dc006",
				"x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				messages: [
					{
						role: "user",
						content: input,
					},
				],
				temperature: 0.9,
				top_k: 5,
				top_p: 0.9,
				max_tokens: 256,
				web_access: false,
				stream: true,
			}),
		}
		const response = await fetch(url, options,);
		const { result } = await response.json();

		await supabase
			.from("messages")
			.insert([
				{ content: result, chat_id: chatId, role: "assistant" },
			])
		revalidatePath("/chat/"+paramsChatId)
	} catch (error) {
		console.log(error);
	} finally {
		if (paramsChatId === "new") redirect("/chat/" + chatId);
	}
};
