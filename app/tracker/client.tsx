'use client'

import { DragEventHandler, useCallback, useState } from "react";
import { moveIcon } from "./icons/move";

const job = {
    company: "uRun",
    position: "Principal Engineer",
}

const mock = [
    {
        title: "New",
        jobs: [ job, job, job ]
    },
    {
        title: "Applied",
        jobs: [ job, job, job ]
    },
    {
        title: "Interview",
        jobs: [ job, job, job ]
    },
    {
        title: "Done",
        jobs: [ job, job, job ]
    },
    {
        title: "Archive",
        jobs: [ job, job, job ]
    }
]

export default function Kanban() {

    const [ data, setMock ] = useState(() => mock);
    const [ visibleDrop, setVisibleDrop ] = useState(false);

    const onDrag: DragEventHandler<HTMLDivElement> = useCallback((e) => {
        const transfer = { id: e.currentTarget.id, listId: e.currentTarget.getAttribute("data-list-id")};
        e.dataTransfer.setData("text/plain", JSON.stringify(transfer));
        setVisibleDrop(true);
    }, []);

    const onDragEnd = useCallback(() => {
        setVisibleDrop(false);
    }, [])

    const onDrop: DragEventHandler<HTMLDivElement> = useCallback((e) => {
        const listId = e.currentTarget.id;
        const transfer = JSON.parse(e.dataTransfer.getData("text/plain"));
        const upd = data.concat();
        const deleted = upd.find(i => i.title === transfer.listId)?.jobs.splice(transfer.id, 1);
        if (deleted?.length) {
            upd.find(i => i.title === listId)?.jobs.push(deleted[0]);
        }
        setMock(upd);
        setVisibleDrop(false);
    }, [ data ]);

    return (
        <>
            {/* Intro */}
            <section className="prose prose-sm prose-neutral max-w-none mb-10 pb-6 border-b border-black/5">
                <h1 className="text-xl font-bold mb-2">Job Tracker (Kanban Board)</h1>
                <p className="text-neutral-700 leading-relaxed">
                    Because modern hiring is broken, here is your personal job tracking board.
                </p>
                <div className="flex gap-3 mt-4 text-xs">
                    <button className="cursor-pointer bg-btn-primary-bg hover:bg-btn-primary-hover text-btn-primary-text px-3 py-1 no-underline rounded-sm">
                        + Job
                    </button>
                </div>
            </section>

            {/* List */}
            <section>
                <div 
                    style={{
                        gridTemplateColumns: `repeat(${mock.length}, 1fr)`
                    }}
                    className={`flex flex-col sm:grid gap-1`}>
                    {data.map((item, index) => (
                        <div key={index}>
                            <div className="text-neutral-600 text-xs">
                                {item.title}
                            </div>
                            <div 
                                className={`flex flex-col items-start gap-1 rounded-sm`}>
                                {item.jobs.map((j,i) => {
                                    return (
                                        <div
                                            id={i.toString()}
                                            data-list-id={item.title}
                                            onDragStart={onDrag}
                                            onDragEnd={onDragEnd}
                                            key={i} 
                                            draggable
                                            className={`flex justify-between gap-1 w-full rounded-xs p-1 border border-transparent hover:border-border-soft ${index % 2 === 0 ? 'bg-card-default' : 'bg-card-default/20'}`}>
                                            <div className='text-xs text-muted'>{i + 1}.</div>
                                            <div className="w-full">
                                                <div className='text-xs text-primary'>
                                                    {j.position}
                                                </div>
                                                <div className='text-xs'>{j.company}</div>
                                            </div>
                                            <div className="*:size-[10px] cursor-grab">
                                                {moveIcon}
                                            </div>
                                        </div>
                                    )
                                })}
                                <div
                                    data-visible={visibleDrop}
                                    id={item.title}
                                    onDragOver={e => e.preventDefault()}
                                    onDrop={onDrop}
                                    className={`hidden data-[visible=true]:block text-xs border border-border-soft border-dashed text-center gap-1 w-full rounded-xs p-1 ${index % 2 === 0 ? 'bg-card-default' : 'bg-card-default/20'}`}>
                                    +
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}