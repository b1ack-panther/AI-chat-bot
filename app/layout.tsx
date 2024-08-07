import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import AuthButton from "@/components/AuthButton";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					disableTransitionOnChange
					defaultTheme="dark"
				>
						<div className="min-h-screen w-full flex flex-col items-center">
							<nav className="w-full px-4 flex sticky top-0 bg-background/50 backdrop-blur-md z-[100] justify-between border-b border-b-foreground/10 h-16">
								<header className="p-4 border-b flex items-center">
									<Link href="/">
										<h1 className="text-lg lg:text-2xl md:text-xl font-bold">AI Chat</h1>
									</Link>
								</header>
								<div className="max-w-4xl flex items-center p-4 text-sm">
									<ModeToggle />
									<AuthButton />
								</div>
							</nav>
							{children}
						</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
