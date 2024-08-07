import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import { MessageSquarePlus, PanelLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import getInitialUser from "@/utils/getInitialUser";
import { createClient } from "@/utils/supabase/server";
import { Separator } from "./ui/separator";
import ConversationList from "./ConversationList";

export default async function Sidebar({ chatId }: { chatId: string }) {
	const user = await getInitialUser();

	const supabase = createClient();
	const { data } = await supabase
		.from("chats")
		.select()
		.eq("user_id", user?.id);
	const conversations = data as unknown as ChatI[];


	return (
		<>
			{/* <Sheet >
				<SheetTrigger>
					<div className="flex flex-row items-center gap-2">
						<PanelLeftIcon className="w-5 h-5 mt-1" />
						<span className="mt-1 sm:hidden flex">Menu</span>
					</div>
				</SheetTrigger>
				<SheetContent side="left" className="min-w-[390px] px-0">
					<div>
						<h3 className="px-7 text-xl font-semibold">History</h3>
						
					</div>
				</SheetContent>
			</Sheet> */}
			<ScrollArea className="h-[calc(100vh-80px)]">
				<div className="h-full">
					<div className="sticky left-0 right-0 top-0 z-20 bg-background  rounded-md juice:static juice:pt-0">
						<div className="last:pb-0 juice:pb-0">
							<Link
								className="group flex h-10 items-center gap-2 rounded-lg px-1  dark:hover:bg-[#4242427b] hover:bg-[#a4a2a253] font-semibold juice:gap-2.5 juice:font-normal hover:bg-token-sidebar-surface-secondary"
								href="/chat/new"
							>
								<div className="h-6 w-6 flex-shrink-0">
									<div className="gizmo-shadow-stroke relative flex h-full items-center justify-center rounded-full bg-token-main-surface-primary text-token-text-primary">
										<MessageSquarePlus className="h-5 w-5" />
									</div>
								</div>
								<div className="grow overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-light text-token-text-primary">
									New Chat
								</div>
								<div className="flex gap-3 juice:gap-2">
									<span className="flex items-center" data-state="closed">
										<button className="invisible mr-1 text-token-text-tertiary hover:text-token-text-secondary group-hover:visible juice:text-token-text-secondary juice:hover:text-token-text-primary">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												fill="currentColor"
												viewBox="0 0 24 24"
												className="icon-md"
											>
												<path d="M15.673 3.913a3.121 3.121 0 1 1 4.414 4.414l-5.937 5.937a5 5 0 0 1-2.828 1.415l-2.18.31a1 1 0 0 1-1.132-1.13l.311-2.18A5 5 0 0 1 9.736 9.85zm3 1.414a1.12 1.12 0 0 0-1.586 0l-5.937 5.937a3 3 0 0 0-.849 1.697l-.123.86.86-.122a3 3 0 0 0 1.698-.849l5.937-5.937a1.12 1.12 0 0 0 0-1.586M11 4A1 1 0 0 1 10 5c-.998 0-1.702.008-2.253.06-.54.052-.862.141-1.109.267a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.126-.247.215-.569.266-1.108.053-.552.06-1.256.06-2.255a1 1 0 1 1 2 .002c0 .978-.006 1.78-.069 2.442-.064.673-.192 1.27-.475 1.827a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.233-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.729.185-1.369.487-1.961A5 5 0 0 1 5.73 3.545c.556-.284 1.154-.411 1.827-.475C8.22 3.007 9.021 3 10 3A1 1 0 0 1 11 4"></path>
											</svg>
										</button>
									</span>
								</div>
							</Link>
							<Separator className="h-[1.5px] mt-2 mb-3 w-full rounded-md mx-auto bg-zinc-300 dark:bg-zinc-700/80" />
						</div>
					</div>
					<h4 className="w-full pl-2 mb-2 font-semibold leading-none text-lg sticky top-0">
						History
					</h4>
					{conversations.length ? conversations.map((cn) => (
						<ConversationList conversation={cn} chatId={chatId} />
					)) : <p className="ml-2 mt-auto font-bold text-gray-500">No Chats</p>}
				</div>
			</ScrollArea>
		</>
	);
}
