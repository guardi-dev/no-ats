const source = "https://github.com/guardi-dev/no-ats/"

export const links = {
    home: "/",
    email: {
        apply: (email: string, position: string) => `mailto:${email}?subject=Application: ${position}`
    },
    external: {
        sourceCode: source,
        manifesto: source + "blob/main/MANIFESTO.md",
        rules: source + "blob/main/RULES.md",
        blacklist: source + "blob/main/BLACKLIST.md",
        contributing: source + "blob/main/CONTRIBUTING.md"
    }
}