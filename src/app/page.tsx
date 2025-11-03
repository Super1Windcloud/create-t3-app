import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import HomePageContent from "./HomePageContent";

export default async function Home() {
	const hello = await api.post.hello({ text: "from tRPC" });
	const session = await auth();

	if (session?.user) {
		void api.post.getLatest.prefetch();
	}

	// Extract only the needed data to pass to the client component
	const sessionData = session ? {
		user: {
			name: session.user.name,
		}
	} : null;

	return (
		<HydrateClient>
			<HomePageContent hello={hello} session={sessionData} />
		</HydrateClient>
	);
}
