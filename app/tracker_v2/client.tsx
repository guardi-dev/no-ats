'use client'

import { SubmitEventHandler, useState } from 'react';
import './page.css';

type Job = {
    id: string;
    company: string;
    role: string;
    status: 'New' | 'Applied' | 'Ghosted',
    salary: string;
    notes: string;
    hasProof: boolean;
    updatedAt: string;
};

type KanbanItem = {
    title: string,
    status: Job['status']
}

const kanbanItems: KanbanItem[] = [
    { title: "New", status: "New" },
    { title: "In Progress", status: "Applied" },
    { title: "Ghosted", status: "Ghosted" }
]

export default function App() {
    // State for Job Cards
    const [jobs, setJobs] = useState<Job[]>([
        {
            id: '1',
            company: 'uRun',
            role: 'Rust Backend Engineer',
            status: 'Ghosted',
            salary: '$120k - $140k',
            notes: 'Passed 3 technical rounds. They stopped replying after telling me "the team is finalising budget". Typical corporate theatre.',
            hasProof: true,
            updatedAt: '12h ago'
        },
        {
            id: '2',
            company: 'Polymarket Cloners',
            role: 'Lead Solidity/HFT Developer',
            status: 'Applied',
            salary: '$200k - $250k',
            notes: 'Live coding assessment went great. Building microsecond-level orderbook sync tools.',
            hasProof: false,
            updatedAt: '2d ago'
        },
        {
            id: '3',
            company: 'TechCorp',
            role: 'Senior React Developer',
            status: 'Applied',
            salary: '$150k - $170k',
            notes: 'Applied through standard channels. Let\'s see if this one is also a ghost vacancy.',
            hasProof: false,
            updatedAt: 'Just now'
        }
    ]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);

    // Form Fields
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState<Job['status']>('New');
    const [salary, setSalary] = useState('');
    const [notes, setNotes] = useState('');
    const [hasProof, setHasProof] = useState(false);

    // Open Modal for Create
    const handleOpenCreate = () => {
        setEditingJob(null);
        setCompany('');
        setRole('');
        setStatus('New');
        setSalary('');
        setNotes('');
        setHasProof(false);
        setIsModalOpen(true);
    };

    // Open Modal for Edit
    const handleOpenEdit = (job: Job) => {
        setEditingJob(job);
        setCompany(job.company);
        setRole(job.role);
        setStatus(job.status);
        setSalary(job.salary);
        setNotes(job.notes);
        setHasProof(job.hasProof);
        setIsModalOpen(true);
    };

    // Submit Handler
    const handleSubmit: SubmitEventHandler = (e) => {
        e.preventDefault();
        if (!company.trim() || !role.trim()) return;

        if (editingJob) {
            // Update
            setJobs(jobs.map(j => j.id === editingJob.id ? {
                ...j,
                company,
                role,
                status: status as Job['status'],
                salary,
                notes,
                hasProof,
                updatedAt: 'Updated just now'
            } : j));
        } else {
            // Create
            const newJob: Job = {
                id: Date.now().toString(),
                company,
                role,
                status: status as Job['status'],
                salary,
                notes,
                hasProof,
                updatedAt: 'Created just now'
            };
            setJobs([newJob, ...jobs]);
        }
        setIsModalOpen(false);
    };

    const deleteJob = (id: string) => {
        setJobs(jobs.filter(j => j.id !== id));
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-canvas p-4 md:p-8 text-primary">
            {/* Header Area */}
            <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
                        <span>📋</span> Job Tracker
                    </h1>
                    <p className="text-secondary mt-1">
                        Because modern hiring is broken, here is your personal job tracking board.
                    </p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="btn-primary flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg shadow-sm font-medium self-start sm:self-auto cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Job
                </button>
            </div>

            {/* Kanban Board Container */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Wishlist / Applied Column */}
                {kanbanItems.map(k => {
                    const kanbanJobs = jobs.filter(j => j.status === k.status);
                    return (
                        <div 
                            key={k.title}
                            className="bg-subtle p-4 rounded-xl border border-soft">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-bold text-primary flex items-center gap-2">
                                    <span 
                                        data-status={k.status}
                                        className="w-2.5 h-2.5 rounded-full bg-stone-500 data-[status=Applied]:bg-amber-600 data-[status=Ghosted]:bg-red-600"></span>
                                    {k.title}
                                </h2>
                                <span className="text-xs bg-canvas px-2 py-0.5 rounded-full border border-soft font-semibold text-secondary">
                                    {kanbanJobs.length}
                                </span>
                            </div>
                            <div className="space-y-3">
                                {kanbanJobs.map(job => (
                                    <JobCard key={job.id} job={job} onEdit={handleOpenEdit} />
                                ))}
                                {kanbanJobs.length === 0 && (
                                    <EmptyPlaceholder onClick={handleOpenCreate} />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* MODAL - STYLED WITH YOUR WARM NATURAL TOKENS */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Underlay Backing */}
                    <div
                        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    {/* Modal Container */}
                    <div className="relative bg-canvas w-full max-w-lg rounded-xl border border-soft shadow-2xl p-6 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-soft">
                            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                <span>{editingJob ? '✏️ Edit Job Status' : '💼 Track New Job'}</span>
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-muted hover:text-primary transition-colors p-1.5 rounded-md hover:bg-stone-200/50"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Row: Company & Role */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        placeholder="e.g. uRun"
                                        className="w-full bg-main border border-soft rounded-lg px-3.5 py-2 text-primary focus:outline-none focus:ring-1 focus:ring-stone-500 placeholder-stone-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                                        Role Title
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        placeholder="e.g. Rust Developer"
                                        className="w-full bg-main border border-soft rounded-lg px-3.5 py-2 text-primary focus:outline-none focus:ring-1 focus:ring-stone-500 placeholder-stone-500"
                                    />
                                </div>
                            </div>

                            {/* Row: Status & Salary */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                                        Current Status
                                    </label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value as Job['status'])}
                                        className="w-full bg-main border border-soft rounded-lg px-3 py-2 text-primary focus:outline-none focus:ring-1 focus:ring-stone-500">
                                        {(["New", "Applied", "Ghosted"] as Job['status'][]).map(i => {
                                            return <option key={i} value={i}>{i}</option>
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                                        Salary range / budget
                                    </label>
                                    <input
                                        type="text"
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        placeholder="e.g. $140k - $160k"
                                        className="w-full bg-main border border-soft rounded-lg px-3.5 py-2 text-primary focus:outline-none focus:ring-1 focus:ring-stone-500 placeholder-stone-500"
                                    />
                                </div>
                            </div>

                            {/* Notes Area */}
                            <div>
                                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                                    Interview Notes / Timeline Details
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={3}
                                    placeholder="Record who interviewed you, when did they stop replying, or feedback received."
                                    className="w-full bg-main border border-soft rounded-lg px-3.5 py-2 text-primary focus:outline-none focus:ring-1 focus:ring-stone-500 placeholder-stone-500 text-sm"
                                ></textarea>
                            </div>

                            {/* Proof Checkbox */}
                            <div className="flex items-center gap-3 bg-main p-3 rounded-lg border border-soft">
                                <input
                                    type="checkbox"
                                    id="hasProof"
                                    checked={hasProof}
                                    onChange={(e) => setHasProof(e.target.checked)}
                                    className="w-4 h-4 rounded text-stone-700 bg-canvas border-soft focus:ring-stone-500"
                                />
                                <label htmlFor="hasProof" className="text-sm font-medium text-primary cursor-pointer select-none">
                                    I have screenshot proof of ghosting / fake job
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-4 border-t border-soft mt-6">
                                {editingJob ? (
                                    <button
                                        type="button"
                                        onClick={() => deleteJob(editingJob.id)}
                                        className="text-xs font-bold uppercase tracking-wider text-red-700 hover:underline px-2 py-1 cursor-pointer"
                                    >
                                        Delete Tracker
                                    </button>
                                ) : (
                                    <div></div>
                                )}

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="btn-secondary px-4 py-2 rounded-lg font-medium text-sm cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-primary px-5 py-2 rounded-lg font-medium text-sm cursor-pointer"
                                    >
                                        {editingJob ? 'Save Changes' : 'Add Tracker'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// Sub-component: Individual Kanban Card with drag-grip indicators
function JobCard({ job, onEdit }: { job: Job, onEdit: (value: Job) => void }) {
    return (
        <div className="card-custom p-4 rounded-lg shadow-sm flex flex-col justify-between space-y-3 relative group">

            {/* Grab/Drag handle & Title */}
            <div className="flex items-start justify-between">
                <div>
                    <span className="text-xs font-semibold text-muted tracking-wide uppercase">
                        {job.company}
                    </span>
                    <h4 className="font-bold text-primary text-base leading-tight mt-0.5">
                        {job.role}
                    </h4>
                </div>

                {/* Grab Grip Icons */}
                <div className="flex items-center gap-1.5 text-stone-400 group-hover:text-stone-600 transition-colors cursor-move">
                    {/* Drag Handle Dots SVG */}
                    <svg className="w-5 h-5 opacity-60 hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <circle cx="9" cy="5" r="1" />
                        <circle cx="9" cy="12" r="1" />
                        <circle cx="9" cy="19" r="1" />
                        <circle cx="15" cy="5" r="1" />
                        <circle cx="15" cy="12" r="1" />
                        <circle cx="15" cy="19" r="1" />
                    </svg>
                </div>
            </div>

            {/* Description / Notes snippet */}
            {job.notes && (
                <p className="text-xs text-secondary bg-main/50 px-1 rounded font-serif italic">
                    {job.notes}
                </p>
            )}

            {/* Footer Metrics */}
            <div className="flex items-center justify-between pt-2 border-t border-soft/30 text-xs text-muted">
                <span className="font-medium text-primary">{job.salary || 'No budget range'}</span>

                {/* Badges / Proof indicator */}
                <div className="flex items-center gap-1.5">
                    {job.hasProof && (
                        <span className="badge-error text-[10px] px-1.5 py-0.5 rounded font-extrabold uppercase">
                            Proof
                        </span>
                    )}

                    <button
                        onClick={() => onEdit(job)}
                        className="cursor-pointer text-primary hover:underline font-bold ml-1 flex items-center gap-0.5">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

// Sub-component: Empty Column Placeholder
function EmptyPlaceholder({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full border-2 border-dashed border-soft/80 hover:border-soft p-4 rounded-lg text-xs text-muted font-medium flex flex-col items-center justify-center gap-2 py-6 cursor-pointer hover:bg-main/30 transition-all"
        >
            <svg className="w-6 h-6 stroke-stone-400" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Empty column. Click to track.</span>
        </button>
    );
}