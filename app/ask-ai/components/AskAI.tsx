'use client'

import { useState, useEffect, useRef, SubmitEventHandler } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

type Status = "checking" | "ready" | "unsupported";

type Message = {
    role: "user" | "assistant" | "system",
    content: string;
}

export function AskAI (props: { system: string }) {
    const [status, setStatus] = useState<Status>('checking'); // checking, ready, unsupported
    const [prompt, setPrompt] = useState('');
    const [history, setHistory] = useState<Message[]>([
        { role: "system", content: props.system }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // check ai
    useEffect(() => {
        (async () => {
            try {
                // @ts-ignore: Prompt API
                const availability = await LanguageModel.availability();
                setStatus(availability === "available" ? "ready" : "unsupported");
            } catch {
                setStatus("unsupported");
            }
        })();
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [ history ]);

    const handleAsk: SubmitEventHandler = async (e) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        const userMsg = prompt;
        setHistory(prev => [...prev, { role: 'user', content: userMsg }]);
        setPrompt('');
        setIsLoading(true);

        try {
            // @ts-ignore: Prompt API
            const session = await LanguageModel.create({
                initialPrompts: history
            });

            const stream = await session.promptStreaming(userMsg);

            let result = "";
            let previousChunk = "";
            for await (const chunk of stream) {
                const newChunk = chunk.startsWith(previousChunk)
                ? chunk.slice(previousChunk.length)
                : chunk;
                result += newChunk;
                previousChunk = chunk;

                setHistory(prev => {
                    if (prev[prev.length -1]?.role === 'assistant') {
                        const upd = prev.concat();
                        upd[prev.length - 1].content = result;
                        return upd;
                    }

                    return [
                        ...prev,
                        { role: "assistant", content: result }
                    ]
                })
            }

            session.destroy();
        } catch (err) {
            setHistory(prev => [...prev, { role: 'assistant', content: 'Inference error. Please check your browser settings (Chrome Dev/Canary required).' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans text-black antialiased p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Intro Section - Matching NoATSPage */}
                <section className="prose prose-sm prose-neutral max-w-none mb-10 pb-6 border-b border-black/5">
                    <h1 className="text-xl font-bold mb-2">Ask AI Assistant (Local & Private)</h1>
                    <p className="text-neutral-700 leading-relaxed">
                        In line with the Zero Spying policy, this AI runs entirely on your machine.
                        No data is sent to external servers. Use it to compare your CV with active openings or refine your application.
                    </p>
                    {status === 'unsupported' && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-sm">
                            <p className="text-xs text-red-600 font-medium">
                                Warning: Built-In AI is not detected. Enable "Prompt API" in your Browser.
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
                                    className={`flex items-start gap-4 p-3 rounded-sm ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'} border border-transparent`}>
                                    <span className={`text-[10px] font-bold w-12 pt-1 uppercase ${msg.role === 'user' ? 'text-brand' : 'text-neutral-400'}`}>
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
                                AI is thinking...
                            </div>
                        )}
                    </div>
                </section>

                {/* Input Area */}
                <section className="sticky bottom-8 bg-white pt-4">
                    <form onSubmit={handleAsk} className="flex gap-2">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={status === 'ready' ? "Ask about jobs, tech stack or help with applying..." : "System offline"}
                            disabled={status !== 'ready' || isLoading}
                            className="flex-grow border border-black/10 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-brand/50 placeholder:text-neutral-400"
                        />
                        <button
                            type="submit"
                            disabled={!prompt.trim() || isLoading || status !== 'ready'}
                            className="bg-black text-white px-6 py-2 text-xs font-bold hover:bg-neutral-800 rounded-sm disabled:opacity-20 transition-opacity">
                            ASK
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};