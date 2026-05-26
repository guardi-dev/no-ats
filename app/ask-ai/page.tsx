import { getAISystemPrompt } from "@/app/utils/getAISystemPrompt";
import { AskAI } from "./components/AskAI";
import { Layout } from "../components/Layout";

export default function AskAIPrepare () {
    const system = getAISystemPrompt();
    return (
        <Layout>
            <AskAI system={system} />
        </Layout>
    )
}