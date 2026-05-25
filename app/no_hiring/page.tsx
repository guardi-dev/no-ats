import Markdown from 'react-markdown';
import { description } from './description';

export default function NoHiring() {

  return (
    <>
      <section className="prose prose-sm prose-neutral max-w-none mb-10 pb-6 border-b border-black/5">
        <Markdown>
            {description}
        </Markdown>
      </section>
    </>
  );
}