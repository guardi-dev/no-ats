import Link from "next/link";
import { ReactNode } from "react";
import { links } from "./links";
import { getBlacklist } from "../utils/getBlacklist";
import { getJobListCount } from "../utils/getJobs";

export function Layout(props: { children: ReactNode }) {

    const bannedCompaniesCount = getBlacklist().length;
    const totalJobs = getJobListCount();

    const menu = [
        { link: links.ask_ai, title: "Ask AI" },
        { link: links.external.manifesto, title: "Manifesto", target: "_blank" },
        { link: links.external.rules, title: "Rules", target: "_blank" },
        { link: links.external.blacklist, title: `Blacklist (${bannedCompaniesCount})`, target: "_blank" },
        { link: links.external.sourceCode, title: "GitHub ↗", target: "_blank" }
    ]

    return (
        <div className="min-h-screen bg-[#f6f6ef] text-[#1a1a1a] font-mono selection:bg-[#ff6600]/20">
            <header className="bg-brand p-2 flex items-center justify-between border-b border-black/10 overflow-auto">
                <div className="flex items-center gap-4">
                    <Link href={links.home} className="font-bold text-white no-underline hover:underline text-lg whitespace-nowrap">
                        No-ATS
                    </Link>
                    <nav className="flex gap-3 text-sm text-white/80 whitespace-nowrap">
                        {menu.map((l,i) => {
                            return (
                                <Link 
                                    key={i}
                                    className="hover:text-white hover:underline"
                                    rel={l.target === "_blank" ? "noopener noreferrer" : ""}
                                    prefetch={l.target !== '_blank'}
                                    href={l.link}
                                    target={l.target}>
                                    {l.title}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
                <div className="text-sm text-white/70 px-2 hidden sm:block">
                    {totalJobs} active, honest jobs
                </div>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
                {props.children}
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