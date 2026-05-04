import { getAISystemPrompt } from "@/app/utils/getAISystemPrompt";
import { AskAI } from "./components/AskAI";

export default function AskAIPrepare () {
    const system = getAISystemPrompt();
    return <AskAI system={system} />
}