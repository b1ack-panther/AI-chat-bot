import { Button } from "@/components/ui/button";
import getCurrentUser from "@/utils/getCurrentUser";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Index() {
	const profile = await getCurrentUser()
	if (profile?.id) redirect("/chat/new")
	
	return (
		<div className="flex flex-col items-center justify-center flex-1 ">
			<h1 className="text-4xl font-bold mb-6">Welcome to Chat AI</h1>
			<p className="text-lg mb-8">Your intelligent chat assistant</p>
			<Button asChild size="lg">
				<Link href="/login">Login</Link>
			</Button>
		</div>
	);
}
