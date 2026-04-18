import Link from "next/link";
import { ReactNode } from "react";

const totalJobs = 42;
const bannedCompaniesCount = 7;

export function Layout(props: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#f6f6ef] text-[#1a1a1a] font-mono selection:bg-[#ff6600]/20">
            <header className="bg-brand p-2 flex items-center justify-between border-b border-black/10">
                <div className="flex items-center gap-4">
                    <Link href="/" className="font-bold text-white no-underline hover:underline text-lg">
                        No-ATS
                    </Link>
                    <nav className="flex gap-3 text-sm text-white/80">
                        <Link href="/manifesto" className="hover:text-white hover:underline">Manifesto</Link>
                        <Link href="/rules" className="hover:text-white hover:underline">Rules</Link>
                        <Link href="/blacklist" className="hover:text-white hover:underline">Blacklist ({bannedCompaniesCount})</Link>
                        <a href="https://github.com/guardi/no-ats" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">GitHub ↗</a>
                    </nav>
                </div>
                <div className="text-sm text-white/70 px-2">
                    {totalJobs} active, honest jobs
                </div>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
                {props.children}
            </main>

            {/* Footer */}
            <footer className="max-w-6xl mx-auto px-8 py-6 mt-12 border-t border-black/5 text-center text-xs text-neutral-500">
                <p>No-ATS Manifesto © 2026. Fully Open Source & Non-Profit.</p>
                <p className="mt-1">
                    Built with direct, honest connections. No data selling, no tracking.
                    <a href="https://github.com/guardi/no-ats" className="ml-2 text-brand hover:underline">Contribute on GitHub</a>
                </p>
            </footer>
        </div>
    )
}