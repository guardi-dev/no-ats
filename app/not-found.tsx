import Link from "next/link";
import { links } from "./components/links";

const menu = [
    { id: 1, title: 'Active Vacancies', desc: 'Browse all current open positions', path: links.home },
    { id: 2, title: 'Project Repository', desc: 'Our GitHub source and contribution history', path: links.external.sourceCode },
    { id: 3, title: 'Code of Conduct', desc: 'Guidelines for transparent recruitment', path: links.external.rules }
]

export default function App() {
    return (
        <>

            {/* Intro Section - Error Message */}
            <section className="prose prose-sm prose-neutral max-w-none mb-10 pb-6 border-b border-black/5">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-neutral-100 text-text-muted px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider">
                        Error 404
                    </span>
                </div>
                <h1 className="text-xl font-bold mb-2 text-text-primary">Page Not Found</h1>
                <p className="text-text-muted leading-relaxed max-w-2xl">
                    This job listing may have been closed or the link has expired.
                    No-ATS operates in real-time: listings appear and disappear instantly through Pull Requests.
                </p>
                <div className="flex gap-3 mt-6 text-xs">
                    <Link href="/" className="bg-btn-primary-bg text-btn-primary-text px-4 py-2 no-underline hover:bg-btn-primary-hover rounded-sm flex items-center gap-2 transition-colors">
                        {/* CSS Left Arrow */}
                        <span className="border-t-2 border-l-2 border-white w-1.5 h-1.5 -rotate-45 block"></span>
                        Back to Home
                    </Link>
                    <Link
                        href={links.ask_ai}
                        className="border border-neutral-200 bg-btn-secondary-bg text-btn-secondary-text px-4 py-2 no-underline hover:bg-btn-secondary-hover rounded-sm transition-colors">
                        Ask AI
                    </Link>
                </div>
            </section>

            {/* Navigation List - Interactive Options */}
            <section>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-text-primary tracking-tight">Looking for something else?</h2>
                    <div className="text-[10px] text-text-muted font-mono uppercase tracking-[0.2em] mt-1 sm:mt-0">
                        Zero ATS • Direct Hiring
                    </div>
                </div>

                <div className="space-y-1">
                    {menu.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex items-start gap-4 p-3 rounded-sm ${index % 2 === 0 ? 'bg-card-default' : 'bg-card-default/50'} hover:bg-card-default/80 border border-transparent hover:border-border-soft transition-all group`}
                        >
                            {/* Indexing */}
                            <span className="text-neutral-300 text-sm w-6 text-right pt-0.5 font-mono">{index + 1}.</span>

                            {/* Main Content */}
                            <div className="flex-grow grid grid-cols-1 md:grid-cols-[auto,1fr,auto] gap-x-4 items-baseline">
                                <Link href={item.path} className="font-medium text-black hover:underline decoration-neutral-400">
                                    {item.title}
                                </Link>
                                <span className="text-neutral-500 text-sm hidden sm:inline">— {item.desc}</span>
                                <div className="text-[10px] text-neutral-400 md:text-right uppercase tracking-tighter font-bold pt-1 md:pt-0">
                                    Redirect
                                </div>
                            </div>

                            {/* CSS Chevron Right */}
                            <div className="pt-1.5 pr-1">
                                <div className="text-neutral-900 group-hover:translate-x-1 transition-transform">
                                    <span className="border-t-2 border-r-2 border-current w-2 h-2 rotate-45 block"></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}