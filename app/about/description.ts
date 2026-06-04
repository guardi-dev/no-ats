import { readFileSync } from 'fs';
import 'server-only';

export function getAbout () {
    const value = readFileSync("MANIFESTO.md").toString();
    return value;
}