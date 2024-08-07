"use client";
import { handleSubmit } from "@/actions/server-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import React, { useRef } from "react";

const ChatInput = ({ paramsChatId }: { paramsChatId: string }) => {
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<section className="p-2">
			<form
				ref={formRef}
				action={async (formData) => {
					formRef.current?.reset();
					await handleSubmit(formData, paramsChatId);
				}}
				className="flex w-full max-w-3xl mx-auto items-center"
				autoComplete="off"
			>
				<Input
					className="flex-1 min-h-[30px] focus-visible:ring-0 focus-visible:ring-offset-0"
					placeholder="Type your question here..."
					type="text"
					name="input"
				/>
				<Button className="ml-2 h-9 w-11 py-1 px-2" type="submit">
					<SendHorizonal />
				</Button>
			</form>
		</section>
	);
};

export default ChatInput;
