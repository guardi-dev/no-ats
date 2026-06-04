import Markdown from 'react-markdown';
import { Layout } from '../components/Layout';
import { getAbout } from './description';

export default function About() {
    const description = getAbout();
    return (
        <Layout>
            <section className="prose prose-sm prose-neutral max-w-none mb-10 pb-6 border-b border-black/5">
                <Markdown>
                    {description}
                </Markdown>
            </section>
        </Layout>
    );
}