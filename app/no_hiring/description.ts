import { links } from "../components/links";

export const description = 
`
# The Open-Source Registry of Ghost Jobs and Broken Recruitment Processes.
Stop being free actors in their investment theater. Driven by developer Pull Requests. Verified by screenshots. 100% decentralized and immune to corporate PR cleanup.

## What is this?
The tech hiring market is fundamentally broken. You see thousands of open positions for Tech Leads, Architects, and Senior Engineers, but companies are not actually hiring.

Instead of filling positions, recruitment has turned into marketing, venture theater, and data harvesting. broken_hiring is an ultra-fast, open-source static registry designed to expose "Ghost Jobs" and filter out companies that respect neither your time nor your expertise.

## Why Companies Fake the Hiring Process
Investment Theater (Show Investors We Grow): Venture funds and angel investors demand scaling metrics. If a startup’s product or user growth stalls, founders fake "team expansion". Leaving dozens of ghost vacancies open on LinkedIn is a cheap way to tell investors: “Look, we are expanding aggressively, we need more capital immediately.”

HR Marketing & Cheap PR: Keeping premium positions perpetually open creates a false narrative that the company is thriving, stable, and highly desirable. It’s free brand exposure running on the stolen time of applicants.

Free Consultation & Market Research: Companies use endless interview rounds and "take-home assignments" to pull free architectural advice from senior candidates, mapping out their own systems without paying a dime.

## How it Works (The No-ATS Way)
We turn ghosted interviews and hidden budgets into a public metric of a company's internal failure.

No Ghosting Without Proof: We don't host anonymous rants. A company enters the registry only via a GitHub Pull Request backed by a redacted screenshot (e.g., hidden salary ranges, automated bot rejections after 4 tech rounds, or absolute ghosting).

Pre-Apply Filter: Before spending hours tailoring your CV or jumping on an "exploratory call", you check the registry. If a company has been running a ghost vacancy for 6 months with zero hires and 20 ghosted applicants, you pass.

Zero Corporate Censorship: Unlike commercial platforms, companies cannot pay to delete bad reviews here. The entire database lives as flat JSON/Markdown files in an open GitHub repository. If the proof is there, the entry stays.

## Contribute to the Blacklist
Found a ghost job? Met an HR refusing to disclose the budget? Got ghosted after a deep system design round?

Submit a Pull Request. Black out all personal names and contact data (we protect privacy, not broken processes), attach the screenshot, and help clean up the market.

[ Submit a Case via [GitHub](${links.external.contributing}) ]
`.trim();