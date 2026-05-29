'use client'

import { useState, useEffect, useRef, SubmitEventHandler } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { loadLLM, Session } from './ai';

type Status = "checking" | "ready" | "unsupported";

type Message = {
    role: "user" | "assistant" | "system",
    content: string;
}

export function AskAI(props: { system: string }) {
    const [status, setStatus] = useState<Status>('ready'); // checking, ready, unsupported
    const [prompt, setPrompt] = useState('');
    const [history, setHistory] = useState<Message[]>([
        { role: "system", content: props.system }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [llm, setLLM] = useState<Session | null>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [history]);

    const handleAsk: SubmitEventHandler = async (e) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        const userMsg = prompt;
        const upd = [...history, { role: 'user', content: userMsg }];
        setHistory(upd as Message[]);
        setPrompt('');
        setIsLoading(true);

        try {
            let session = llm;
            if (!session) {
                session = await loadLLM({
                    systemPrompt: props.system,
                    onDownload(value) {
                        setLoadingProgress(value);
                    },
                })
                setLLM(session);
            }
            const stream = session.promptStreaming(userMsg);
            const out: Message = { role: "assistant", content: "" };
            for await (const delta of stream) {
                out.content += delta;
                setHistory(prev => {
                    const offset = prev.at(-1)?.role === 'assistant' ? 1 : 0;
                    return [ ...prev.slice(0, prev.length - offset), out ];
                })
            }
        } catch (err) {
            console.error(err);
            setStatus('unsupported')
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Intro Section - Matching NoATSPage */}
            <section className="prose prose-sm prose-neutral max-w-none mb-10 pb-6 border-b border-black/5">
                <h1 className="text-xl font-bold mb-2">Ask AI Assistant (Local & Private)</h1>
                <p className="text-neutral-700 leading-relaxed">
                    In line with the Zero Spying policy, this AI runs entirely on your machine.
                    No data is sent to external servers. Use it to compare your CV with active openings or refine your application.
                </p>
                {status === 'unsupported' && (
                    <div className="mt-4 p-3 border bg-status-error/5 border-status-error/50 rounded-sm">
                        <p className="text-xs text-status-error font-medium">
                            Warning: Built-In AI is not detected. Enable "Prompt API" in your Browser. <br/>
                            Enable in Chrome <a href="chrome://flags/#prompt-api-for-gemini-nano" target="_blank">chrome://flags/#prompt-api-for-gemini-nano</a>
                        </p>
                    </div>
                )}
            </section>

            {/* Chat History */}
            <section className="space-y-1 mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Conversation</h2>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400">Local Session</span>
                </div>

                <div ref={scrollRef} className="space-y-1">
                    {history.map((msg, index) => {
                        if (msg.role === 'system') return null;

                        return (
                            <div
                                key={index}
                                className={`flex items-start gap-4 p-3 rounded-sm ${index % 2 === 0 ? 'bg-card-default' : 'bg-card-default/50'} border border-transparent`}>
                                <span className={`text-[10px] font-bold w-12 pt-1 uppercase ${msg.role === 'user' ? 'text-text-primary' : 'text-text-muted'}`}>
                                    {msg.role === 'user' ? 'You' : 'AI'}
                                </span>
                                <div className="flex-grow prose prose-sm prose-neutral max-w-none">
                                    <div className="text-neutral-800 leading-relaxed m-0">
                                        <Markdown
                                            remarkPlugins={[remarkGfm]}>
                                            {msg.content}
                                        </Markdown>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {isLoading && (
                        <div className="p-3 bg-neutral-50/50 animate-pulse text-xs text-neutral-400">
                            {
                                loadingProgress === 100 ?
                                'AI is thinking...' :
                                `Loading... ${loadingProgress.toFixed(2)}%`
                            }
                        </div>
                    )}
                </div>
            </section>

            {/* Input Area */}
            <section className="sticky bottom-8 bg-bg-main pt-4">
                <form onSubmit={handleAsk} className="flex gap-2">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={status === 'ready' ? "Ask about jobs, tech stack or help with applying..." : "System offline"}
                        disabled={status !== 'ready' || isLoading}
                        className="bg-bg-canvas flex-grow border border-black/10 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-brand/50 placeholder:text-neutral-400"
                    />
                    <button
                        type="submit"
                        disabled={!prompt.trim() || isLoading || status !== 'ready'}
                        className="cursor-pointer bg-btn-primary-bg text-btn-primary-text px-6 py-2 text-xs font-bold rounded-sm disabled:opacity-20 transition-opacity">
                        ASK
                    </button>
                </form>
            </section>
        </>
    );
};