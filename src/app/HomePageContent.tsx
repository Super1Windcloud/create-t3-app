'use client';

import Link from "next/link";
import { useTranslation } from "@/components/I18nProvider";
import { LatestPost } from "./_components/post";

// Client Component to use translations
export default function HomePageContent({ 
	hello, 
	session 
}: { 
	hello: { greeting: string } | undefined; 
	session: { 
		user: { 
			name: string | null | undefined 
		} 
	} | null 
}) {
	const { t, i18n } = useTranslation();

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
				<h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem]">
					{t('welcome')} <span className="text-[hsl(280,100%,70%)]">T3</span> App
				</h1>
				<div className="flex flex-wrap justify-center gap-4 mb-4">
					<button 
						onClick={() => i18n.changeLanguage('en')}
						className="rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"
					>
						English
					</button>
					<button 
						onClick={() => i18n.changeLanguage('zh')}
						className="rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"
					>
						中文
					</button>
					<button 
						onClick={() => i18n.changeLanguage('es')}
						className="rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"
					>
						Español
					</button>
					<button 
						onClick={() => i18n.changeLanguage('fr')}
						className="rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"
					>
						Français
					</button>
					<button 
						onClick={() => i18n.changeLanguage('de')}
						className="rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"
					>
						Deutsch
					</button>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
					<Link
						className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
						href="https://create.t3.gg/en/usage/first-steps"
						target="_blank"
					>
						<h3 className="font-bold text-2xl">{t('navigation.home')} →</h3>
						<div className="text-lg">
							{t('description')}
						</div>
					</Link>
					<Link
						className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
						href="https://create.t3.gg/en/introduction"
						target="_blank"
					>
						<h3 className="font-bold text-2xl">{t('navigation.about')} →</h3>
						<div className="text-lg">
							{t('greeting', { name: session?.user?.name || 'Guest' })}
						</div>
					</Link>
				</div>
				<div className="flex flex-col items-center gap-2">
					<p className="text-2xl text-white">
						{hello ? hello.greeting : t('buttons.submit')}
					</p>

					<div className="flex flex-col items-center justify-center gap-4">
						<p className="text-center text-2xl text-white">
							{session && <span>{t('greeting', { name: session.user?.name || t('buttons.cancel') })}</span>}
						</p>
						<Link
							href={session ? "/api/auth/signout" : "/api/auth/signin"}
							className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
						>
							{session ? t('buttons.cancel') : t('buttons.submit')}
						</Link>
					</div>
				</div>

				{session?.user && <LatestPost />}
			</div>
		</main>
	);
}