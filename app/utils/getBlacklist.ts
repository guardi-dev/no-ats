import 'server-only';
import { readFileSync } from 'fs';

export function getBlacklist (): string[] {
    const md = readFileSync("BLACKLIST.md").toString();
    const blacklist = md.split("\n").filter(i => i.length);
    return blacklist
}