import getCurrentUser from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";

const Page =async () => {
	const user = await getCurrentUser()
	if (user) {
		redirect("/login")
	}
	redirect("/chat/new");
};

export default Page;
