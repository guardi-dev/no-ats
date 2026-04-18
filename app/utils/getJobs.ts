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

export function getJobList(): Job[] {
    let jobFiles = readdirSync(jobPath);
    let jobList: Job[] = [];
    for (const f of jobFiles) {
        const md = readFileSync(join(jobPath, f)).toString();
        const id = f.slice(0, -3);
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