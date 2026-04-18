import 'server-only'
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

export type Job = {
    id: string,
    position: string,
    company: string,
    salary: string,
    location: string,
    date: string;
    applyEmail: string,
    techStack: string,
    description: string,
}

const jobPath = "jobs";

export function getJobListCount (): number {
    let jobFiles = readdirSync(jobPath);
    return jobFiles.length
}

export function getJobById (id: string): Job {
    const md = readFileSync(join(jobPath, id + ".md")).toString();
    const [meta, description] = md.split("===DESCRIPTION===");
    const [position, company, salary, location, date, applyEmail, techStack] = meta.split("\n");
    const job: Job = {
        id,
        position,
        company,
        salary,
        location,
        date,
        applyEmail,
        techStack,
        description
    }
    return job;
}

export function getJobList(): Job[] {
    let jobFiles = readdirSync(jobPath);
    let jobList: Job[] = [];
    for (const f of jobFiles) {
        const id = f.slice(0, -3);
        const job = getJobById(id);
        jobList.push(job);
    }

    jobList.sort((a, b) => {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf()
    })

    return jobList;
}

export function getJobListMeta(): Omit<Job, "description">[] {
    return getJobList().map(i => {
        return {
            ...i,
            description: null
        }
    })
}