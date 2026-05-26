import Link from 'next/link';
import { getJobListMeta } from './utils/getJobs';
import { links } from './components/links';
import { Layout } from './components/Layout';

export default function NoATSPage() {

  const jobs = getJobListMeta();

  return (
    <Layout>
      {/* Intro */}
      <section className="prose prose-sm prose-neutral max-w-none mb-10 pb-6 border-b border-black/5">
        <h1 className="text-xl font-bold mb-2">The Engineering Job Board (Zero ATS, Zero Spying)</h1>
        <p className="text-neutral-700 leading-relaxed">
          No-ATS is an open-source, non-profit protocol for direct hiring. We eliminate intermediaries, surveillance algorithms, and infinite interview loops.
          Here, engineers and companies connect directly, bound by a strict code of conduct.
        </p>
        <div className="flex gap-3 mt-4 text-xs">
          <Link href={links.external.rules} className="bg-btn-primary-bg hover:bg-btn-primary-hover text-btn-primary-text px-3 py-1 no-underline rounded-sm">Read the Rules</Link>
          <a href={links.external.contributing} target="_blank" rel="noopener noreferrer" className="bg-btn-secondary-bg hover:bg-btn-secondary-hover text-btn-secondary-text px-3 py-1 no-underline rounded-sm font-bold">Post a Job (via PR)</a>
        </div>
      </section>

      {/* List */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Active Openings</h2>
          <div className="text-xs flex flex-col sm:flex-row sm:gap-4">
            <span>Filter: All</span>
            <span>Sort: Newest / Salary</span>
          </div>
        </div>

        <div className="space-y-1">
          {jobs.map((job, index) => (
            <div
              key={job.id}
              className={`flex items-start gap-4 p-3 rounded-sm ${index % 2 === 0 ? 'bg-card-default' : 'bg-card-default/20'} border border-transparent hover:border-border-soft`}
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

                <div className="text-xs text-neutral-500 md:text-right">
                  {job.date} • {job.location} • {job.techStack}
                </div>
              </div>

              {/* Link */}
              <div className="text-xs pt-0.5">
                <a href={links.email.apply(job.applyEmail, job.position)} className="text-brand hover:underline font-bold">
                  Apply
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* More */}
        {/* <div className="mt-8 text-center text-sm">
          <button className="text-neutral-600 hover:text-black hover:underline">
            More jobs...
          </button>
        </div> */}
      </section>
    </Layout>
  );
}