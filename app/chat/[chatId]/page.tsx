
import Chat from "@/components/Chat";
import { createClient } from "@/utils/supabase/server";
import React, { Suspense } from "react";
import ChatInput from "./ChatInput";
import getInitialUser from "@/utils/getInitialUser";

const Page = async({
	params: { chatId: paramsChatId },
}: {
	params: { chatId: string };
	}) => { 
	const supabase = createClient();
	await getInitialUser()
	const { data: messages } = (await supabase
		.from("messages")
		.select()
		.eq("chat_id", paramsChatId)) as any;
	
	return (
			<main className="flex flex-col justify-center h-[calc(100vh-70px)] flex-1 bg-muted/50 py-2">
				<Suspense key={paramsChatId} fallback={<p className="h-10 text-lg mt-5">Loading...</p>}>
					<Chat messages={messages} />
				</Suspense>
				<ChatInput paramsChatId={paramsChatId} />
			</main>
	);
};

export default Page;