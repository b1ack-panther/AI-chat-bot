import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getDay(date: Date | null) {
	if (!date) return "";
	return new Date(date).toLocaleDateString("en-us", {
		weekday: "long"
	});
}
