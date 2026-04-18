import Link from 'next/link';
import { getJobListMeta } from './utils/getJobs';
import { links } from './components/links';

export default function NoATSPage() {

  const jobs = getJobListMeta();

  console.log(jobs)

  return (
    <>
      {/* Intro */}
      <section className="prose prose-sm prose-neutral max-w-none mb-10 pb-6 border-b border-black/5">
        <h1 className="text-xl font-bold mb-2">The Engineering Job Board (Zero ATS, Zero Spying)</h1>
        <p className="text-neutral-700 leading-relaxed">
          No-ATS is an open-source, non-profit protocol for direct hiring. We eliminate intermediaries, surveillance algorithms, and infinite interview loops.
          Here, engineers and companies connect directly, bound by a strict code of conduct.
        </p>
        <div className="flex gap-3 mt-4 text-xs">
          <Link href={links.external.rules} className="bg-black text-white px-3 py-1 no-underline hover:bg-neutral-800 rounded-sm">Read the Rules</Link>
          <a href={links.external.contributing} target="_blank" rel="noopener noreferrer" className="bg-brand text-white px-3 py-1 no-underline hover:bg-brand/80 rounded-sm font-bold">Post a Job (via PR)</a>
        </div>
      </section>

      {/* List */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Active Openings</h2>
          <div className="text-xs text-neutral-500 flex gap-4">
            <span>Filter: All / Rust / Go / AI</span>
            <span>Sort: Newest / Salary</span>
          </div>
        </div>

        <div className="space-y-1">
          {jobs.map((job, index) => (
            <div
              key={job.id}
              className={`flex items-start gap-4 p-2 rounded-sm ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'} hover:bg-brand/5 border border-transparent hover:border-brand/10`}
            >
              {/* Index*/}
              <span className="text-neutral-400 text-sm w-6 text-right pt-0.5">{index + 1}.</span>

              {/* Main Info */}
              <div className="flex-grow grid grid-cols-1 md:grid-cols-[1fr,auto,auto] gap-x-6 gap-y-1 items-baseline">
                <div>
                  <Link href={`/jobs/${job.id}`} className="font-medium text-[#000000] hover:underline decoration-brand">
                    {job.position}
                  </Link>
                  <span className="text-neutral-600 text-sm ml-2">at {job.company}</span>
                </div>

                {/* Детали (зп и локация) */}
                <div className="text-sm text-neutral-800 tabular-nums font-medium md:text-right">
                  {job.salary}
                </div>

                <div className="text-xs text-neutral-500 md:text-right whitespace-nowrap">
                  {job.date} • {job.location} • {job.techStack}
                </div>
              </div>

              {/* Link */}
              <div className="text-xs pt-0.5">
                <a href={"mailto:" + job.applyEmail} className="text-brand hover:underline font-bold">
                  Apply
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* More */}
        <div className="mt-8 text-center text-sm">
          <button className="text-neutral-600 hover:text-black hover:underline">
            More jobs...
          </button>
        </div>
      </section>
    </>
  );
}