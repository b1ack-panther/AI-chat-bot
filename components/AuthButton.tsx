import getCurrentUser from "@/utils/getCurrentUser";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function AuthButton() {
	const user = await getCurrentUser();
	const signOut = async () => {
		"use server";
		const supabase = createClient();
		await supabase.auth.signOut();
		return redirect("/");
	};

	return user ? (
		<div className="flex items-center gap-4 flex-shrink">
			<p className=" overflow-hidden hidden sm:block text-ellipsis min-w-0">
				Hey, {user.user_metadata.full_name}!
			</p>
			<form action={signOut} className="flex-1">
				<button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
					Logout
				</button>
			</form>
		</div>
	) : (
		<Link
			href="/login"
			className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
		>
			Login
		</Link>
	);
}
