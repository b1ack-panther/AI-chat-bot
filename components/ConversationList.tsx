"use client";
import { cn as joinCn } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ConversationList({
	chatId,
	conversation,
}: {
	chatId: string;
	conversation: ChatI;
}) {
	const [edit, setEdit] = useState(false);
	const [title, setTitle] = useState(conversation.title);
	const supabase = createClient();
	const router = useRouter();

	const handleSubmit = async() => {
		await supabase.from("chats").update({title}).eq("id", conversation.id)
		router.refresh()
	}
	const handleDelete = async () => {
		await supabase.from("chats").delete().eq("id", conversation.id)
		router.refresh();
		router.push("/chat/new")
	}
	return edit ? (
		<form onSubmit={handleSubmit}>
			<Input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				autoComplete="off"
				className="h-9 mt-0.5 focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
				onClick={(e)=>{e.stopPropagation()}}
			/>
		</form>
	) : (
		<Link
			href={`/chat/${conversation.id}`}
			key={conversation.id}
			className={joinCn(
				" rounded-md mt-0.5 flex w-[240px] font-light h-9 dark:hover:bg-[#4242427b] hover:bg-[#a4a2a22c] p-2",
				chatId === conversation.id ? "dark:bg-[#4242427b] bg-[#a4a2a22c]" : ""
				)}
				title={conversation.title}
		>
			<span className="w-[200px] capitalize text-[15px] whitespace-nowrap inline-block text-ellipsis overflow-hidden">
				{conversation.title}
			</span>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button>
						<EllipsisVertical className={joinCn("h-4 w-4 z-1 hidden", chatId===conversation.id ? "block": "")} />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuItem
						onClick={() => setEdit(true)}
						onChange={() => setEdit(false)}
					>
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem className="text-red-600" onClick={handleDelete}>Delete</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Link>
	);
}
