"use client";

import { useEffect, useRef, useState } from "react";
import { convert } from "html-to-text";
import removeMarkdown from "markdown-to-text";
import { BotIcon, UserRound } from "lucide-react";
import { getDay } from "@/lib/utils";

export default function Page({ messages }: { messages: MessageI[] }) {
	const chatParent = useRef<HTMLUListElement>(null);
	let prevDate: Date | null = null;
	const [client, setClient] = useState(false);

	useEffect(() => {
		const domNode = chatParent.current;
		if (
			domNode &&
			domNode.scrollHeight - domNode.scrollTop - domNode.clientHeight < 300
		) {
			domNode.scrollTop = domNode.scrollHeight;
		}
	}, [messages]);

	useEffect(() => {
		const domNode = chatParent.current;
		if (domNode) {
			domNode.scrollTop = domNode.scrollHeight;
		}
	}, []);

	useEffect(() => {
		setClient(true);
	}, []);

	if (!client) return;

	const messageList = messages?.sort((a, b) => {
		if (new Date(a.created_at) > new Date(b.created_at)) return 1;
		else return -1;
	});

	return (
		<div className="flex flex-col flex-grow gap-4 mx-auto lg:max-w-3xl max-w-xl w-full overflow-y-scroll no-scrollbar">
			<ul
				ref={chatParent}
				className=" px-4 flex-grow rounded-lg max-sm:text-sm flex flex-col gap-4 h-full overflow-y-scroll no-scrollbar w-full"
			>
				{messageList?.map((m) => (
					<>
						{(() => {
							if (getDay(prevDate) !== getDay(m.created_at)) {
								prevDate = m.created_at;
								const real = getDay(m.created_at);
								return (
									<span className="mx-auto text-sm rounded-md px-2 py-1 bg-zinc-300/80 dark:bg-zinc-700/90">
										{real}
									</span>
								);
							}
						})()}
						{m.role === "user" ? (
							<li key={m.id} className="flex gap-0.5">
								<UserRound className="h-8 w-7 mt-2" />
								<div className="flex flex-col gap-0.5">
									<div className="rounded-xl p-3 bg-background shadow-md flex min-w-36">
										<p className="text-primary">{m.content}</p>
									</div>
									<span className="text-xs px-2">
										{new Date(m.created_at).toLocaleTimeString("en-us", {
											hour: "2-digit",
											minute: "2-digit",
											hour12: true,
										})}
									</span>
								</div>
							</li>
						) : (
							<li key={m.id} className="flex flex-row-reverse gap-2">
								<BotIcon className="h-8 w-8 mt-2" />
								<div className="flex flex-col w-3/4">
									<div className="rounded-xl p-4 bg-background shadow-md flex">
										<p className="text-primary overflow-hidden">
											{convert(removeMarkdown(m.content))}
										</p>
									</div>
									<span className="text-xs px-1 self-end">
										{new Date(m.created_at).toLocaleTimeString("en-us", {
											hour: "2-digit",
											minute: "2-digit",
											hour12: true,
										})}
									</span>
								</div>
							</li>
						)}
					</>
				))}
				<div className="h-8 shrink-0"></div>
			</ul>
		</div>
	);
}
