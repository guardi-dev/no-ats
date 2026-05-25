import Link from 'next/link';
import { links } from '@/app/components/links';
import { getGhostJobsCompanies } from '@/app/utils/getBlacklist';

export default function NoATSPage() {

    const companies = getGhostJobsCompanies();

    return (
        <>
            {/* Intro */}
            <section className="prose prose-sm prose-neutral max-w-none mb-10 pb-6 border-b border-black/5">
                <h1 className="text-xl font-bold mb-2">Ghost Jobs Registry</h1>
                <p className="text-neutral-700 leading-relaxed">
                    The open-source list of tech companies posting fake vacancies for PR and investor metrics instead of actual hiring. Verified by developer PRs.
                </p>
                <div className="flex gap-3 mt-4 text-xs">
                    <a href={links.external.contributing} target="_blank" rel="noopener noreferrer" className="bg-btn-secondary-bg hover:bg-btn-secondary-hover text-btn-secondary-text px-3 py-1 no-underline rounded-sm font-bold">
                        Post a Proof (via PR)
                    </a>
                </div>
            </section>

            {/* List */}
            <section>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Companies</h2>
                </div>

                <div className="space-y-1">
                    {companies.map((company, index) => (
                        <div
                            key={company.name}
                            className={`flex items-start gap-4 p-3 rounded-sm ${index % 2 === 0 ? 'bg-card-default' : 'bg-card-default/20'} border border-transparent hover:border-border-soft`}
                        >
                            {/* Index*/}
                            <span className="text-neutral-400 text-sm w-6 text-right pt-0.5">{index + 1}.</span>

                            {/* Main Info */}
                            <div className="flex-grow grid grid-cols-1 md:grid-cols-[1fr,auto,auto] gap-x-6 gap-y-1 items-baseline">
                                <div>
                                    <Link 
                                        target='_blank'
                                        href={`${links.external.ghostJobs}/${company.name}`} className="font-medium text-[#000000] hover:underline decoration-brand">
                                        {company.name}
                                    </Link>
                                </div>
                            </div>

                            {/* Link */}
                            <div className="text-xs pt-0.5 text-brand font-bold">
                                Proofs {company.proofs}
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
        </>
    );
}