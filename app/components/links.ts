const source = "https://github.com/guardi-dev/no-ats/"

export const links = {
    home: "/",
    ask_ai: "/ask-ai",
    ghost_jobs: "/ghost_jobs",
    ghost_jobs_registry: "/ghost_jobs/registry",

    /** Change if we will migrate out of GitHub Pages, required for links outside next.js */
    basePath: "/no-ats",
    email: {
        apply: (email: string, position: string) => `mailto:${email}?subject=Application: ${position}`
    },
    external: {
        website: "https://guardi-dev.github.io/no-ats",
        sourceCode: source,
        ghostJobs: source  + "blob/main/ghost_jobs",
        manifesto: source + "blob/main/MANIFESTO.md",
        rules: source + "blob/main/RULES.md",
        blacklist: source + "blob/main/BLACKLIST.md",
        contributing: source + "blob/main/CONTRIBUTING.md"
    }
}