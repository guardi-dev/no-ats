import Link from "next/link";
import { ReactNode } from "react";
import { links } from "./links";
import { getJobListCount } from "../utils/getJobs";

export function Layout(props: { children: ReactNode, inline?: boolean }) {

    const totalJobs = getJobListCount();

    const menu = [
        { link: links.ask_ai, title: "Ask AI" },
        { link: links.ghost_jobs, title: "Ghost Jobs"},
        { link: links.tracker, title: "Tracker" },
        { link: links.external.sourceCode, title: "GitHub ↗", target: "_blank" }
    ]

    return (
        <div className="min-h-screen font-mono">
            <header className="bg-brand p-2 flex items-center justify-between border-b border-black/10 overflow-auto">
                <div className="flex items-center gap-4">
                    <Link href={links.home} className="font-bold text-text-primary no-underline hover:underline text-lg whitespace-nowrap">
                        No-ATS
                    </Link>
                    <nav className="flex gap-3 text-sm text-text-primary whitespace-nowrap">
                        {menu.map((l,i) => {
                            return (
                                <Link 
                                    key={i}
                                    className="hover:underline"
                                    href={l.link}
                                    target={l.target}>
                                    {l.title}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
                <div className="text-sm text-text-primary px-2 hidden sm:block">
                    {totalJobs} active, honest jobs
                </div>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
                {
                    props.inline ?
                    props.children :
                    <div className="min-h-screen bg-bg-main text-text-primary antialiased p-4 sm:p-8 md:p-12">
                        <div className="max-w-[1000px] mx-auto">
                            {props.children}
                        </div>
                    </div>
                }
            </main>

            {/* Footer */}
            <footer className="max-w-6xl mx-auto px-8 py-6 mt-12 border-t border-black/5 text-center text-xs text-neutral-500">
                <p>No-ATS Manifesto © {new Date().getFullYear()}. Fully Open Source & Non-Profit.</p>
                <p className="mt-1">
                    Built with direct, honest connections. No data selling, no tracking.
                    <a href={links.external.sourceCode} className="ml-2 text-brand hover:underline">Contribute on GitHub</a>
                </p>
            </footer>
        </div>
    )
}