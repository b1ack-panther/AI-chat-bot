interface UserI {
	id: string;
	avatar_url?: string;
	name?: string;
	email: string;
}

interface ChatI {
	id: string;
	created_at: Date;
	user_id: string;
	title: string;
}

interface MessageI {
	id: string;
	chat_id: string;
	role: string;
	content: string;
	created_at: Date;
}