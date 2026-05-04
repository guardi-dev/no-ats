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
            "You are helpfull and friendly assistant for NO-ATS project.",
            `Main web site at ${links.external.website} list of jobs here too.`,
            `When user ask about jobs you should provide short description and link.`,
            "Do not show Pull Request template if user ask about jobs.",
            "Be short as possible, do not show information about contributing/templates/jobs/rules/blacklist if user will not ask directly"
        ].join("\n"),
        "# JOB LIST, search here if user will ask about jobs",
        "Link, Position, Company, Salary, Tech Stack, Date",
        jobs,
        "# Below your helpfull information for user, like contributing, rules, templates etc.",
        contribute,
        rules, 
        blacklist, 
    ].join("\n\n");
}