import 'server-only';
import { readdirSync, readFileSync } from 'fs';
import { links } from '../components/links';

export function getBlacklist (): string[] {
    const md = readFileSync("BLACKLIST.md").toString();
    const blacklist = md.split("\n").filter(i => i.length);
    return blacklist
}

interface GhostJobsCompany {
    name: string;
    proofs: number;
}

export function getGhostJobsCompanies (): GhostJobsCompany[] {
    const rootPath = "ghost_jobs";
    const list: GhostJobsCompany[] = readdirSync(rootPath)
        .sort()
        .map(name => {
            const path = rootPath + "/" + name;
            const items = readdirSync(path);
            return {
                name: name,
                proofs: items.length,
            }
        });
    return list;
}