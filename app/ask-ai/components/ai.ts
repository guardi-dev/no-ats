import type { ReadableStream } from 'stream/web';

export type SessionInput = { 
    role: "system" | "user" | "assistant", 
    content: string 
}

export type SessionOptions = {
    signal?: AbortSignal
}

export interface Session {
    promptStreaming: (input: SessionInput[] | string, options?: SessionOptions) => ReadableStream<string>
}

/** Experimental API */
export async function loadLLM(props: {
    systemPrompt: string,
    onDownload? (value: number): void
}): Promise<Session> {
    if (!('LanguageModel' in window)) {
        const config = {
            apiKey: 'dummy', // Required for now by the loader
            modelName: 'Llama-3.2-1B-Instruct-q4f16_1-MLC'
        };
        // @ts-ignore
        window.WEBLLM_CONFIG = config;
        // @ts-ignore
        await import('prompt-api-polyfill');
    }

    //@ts-ignore
    const session = await LanguageModel.create({
        monitor(m: HTMLDivElement) {
            m.addEventListener('downloadprogress', (e) => {
                const { loaded } = e as Event & { loaded: number }
                props.onDownload?.(loaded * 100);
            });
        },
        initialPrompts: [
            {
                role: 'system',
                content: props.systemPrompt,
            },
        ],
        expectedOutputs: [{ type: 'text', languages: ['en'] }],
    });

    return session;
}