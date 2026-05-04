import 'server-only';
import fs from 'fs';
import { getJobListMeta } from './getJobs';
import { links } from '../components/links';

export function getAISystemPrompt () {
    const contribute = fs.readFileSync("CONTRIBUTING.md").toString();
    const rules = fs.readFileSync("RULES.md").toString();
    const blacklist = fs.readFileSync("BLACKLIST.md").toString();
    const jobs = getJobListMeta().map(j => {
        return `${links.external.website}/jobs/${j.id}, ${j.position}, ${j.company}, ${j.salary}, ${j.techStack}, ${j.date}`
    }).join("\n");
    return [ 
        [
            "You are NO-ATS assistant.",
            `Main web site at ${links.external.website}.`,
            `When user ask about jobs you should provide short description and link. like ${links.external.website}/jobs/ID`,
            "Do not show Pull Request template if user ask about jobs",
            `Do not show link ${links.external.website}/jobs`
        ].join("\n"),
        "# JOB LIST, search here if user will ask about jobs",
        "ID, Position, Company, Salary, Tech Stack, Date",
        jobs,
        "# Below your helpfull information for user, like contributing, rules, templates etc.",
        contribute,
        rules, 
        blacklist, 
    ].join("\n\n");
}