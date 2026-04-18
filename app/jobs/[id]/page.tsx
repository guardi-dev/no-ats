import { links } from '@/app/components/links';
import { getJobById, getJobListMeta } from '@/app/utils/getJobs';
import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

export async function generateStaticParams() {
    const jobs = getJobListMeta();
    return jobs.map(j => {
        return {
            id: j.id
        }
    })
}

export default async function JobDetailPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const jobData = getJobById(id);
    const techStack = jobData.techStack.split(", ");

    return (
        <div className="min-h-screen bg-[#f6f6ef] text-[#1a1a1a] font-mono selection:bg-[#ff6600]/20">

            {/* Header */}
            <header className="p-2 flex items-center border-b border-black/10">
                <div className="max-w-4xl mx-auto w-full flex items-center gap-4">
                    <Link href={links.home} className="font-bold text-black/40 no-underline hover:underline">
                        ←
                    </Link>
                    <span className="text-black/40 text-xs whitespace-nowrap">/ jobs</span>
                    <span className="text-black/40 text-xs whitespace-nowrap truncate">/ {id}</span>
                </div>
            </header>

            <main className="max-w-4xl mx-auto sm:p-4 md:p-8">
                {/* Short card */}
                <div className="bg-white border border-black/10 p-6 mb-8 shadow-[2px_2px_0px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">{jobData.position}</h1>
                            <p className="text-lg text-neutral-600">at {jobData.company}</p>
                        </div>
                        <div className="text-right w-full sm:w-fit">
                            <div className="text-xl font-bold text-[#238636] whitespace-nowrap">{jobData.salary}</div>
                            <div className="text-sm text-neutral-500">{jobData.location}</div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-black/5 flex flex-wrap gap-2">
                        {techStack.map(tech => (
                            <span key={tech} className="bg-neutral-100 px-2 py-1 text-xs border border-neutral-200">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <article 
                    className={`
                        max-w-2xl mx-auto prose prose-neutral
                        [&_ol]:ml-5 [&_ul]:ml-5
                    `}>
                    <Markdown
                        remarkPlugins={[remarkGfm]}>
                        {jobData.description}
                    </Markdown>
                </article>

                {/* Actions */}
                <section className="mt-12 p-8 bg-black text-white rounded-sm text-center">
                    <h2 className="text-xl font-bold mb-4">Ready to apply?</h2>
                    <p className="mb-6 text-white/70">
                        Send your CV or GitHub profile directly to the hiring team. <br />
                        No forms, no ATS tracking, just a direct email.
                    </p>
                    <a
                        href={`mailto:${jobData.applyEmail}?subject=Application: ${jobData.position}`}
                        className="inline-block bg-[#ff6600] text-black font-bold px-8 py-3 rounded-sm hover:bg-[#ff6600]/90 transition-transform active:scale-95"
                    >
                        Apply to: {jobData.applyEmail}
                    </a>
                    <p className="mt-4 text-[10px] text-white/40 uppercase tracking-widest italic">
                        Reminder: If this company asks for a 3rd technical round, report it in GitHub Issues.
                    </p>
                </section>

                {/* Back */}
                <div className="mt-12 text-center">
                    <Link href={links.home} className="text-sm text-neutral-500 hover:text-black hover:underline">
                        ← Back to all vacancies
                    </Link>
                </div>
            </main>
        </div>
    );
}