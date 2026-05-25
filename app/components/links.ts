const source = "https://github.com/guardi-dev/no-ats/"

export const links = {
    home: "/",
    ask_ai: "/ask-ai",
    no_hiring: "/no_hiring",
    email: {
        apply: (email: string, position: string) => `mailto:${email}?subject=Application: ${position}`
    },
    external: {
        website: "https://guardi-dev.github.io/no-ats",
        sourceCode: source,
        manifesto: source + "blob/main/MANIFESTO.md",
        rules: source + "blob/main/RULES.md",
        blacklist: source + "blob/main/BLACKLIST.md",
        contributing: source + "blob/main/CONTRIBUTING.md"
    }
}