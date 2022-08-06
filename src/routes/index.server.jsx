import FeaturedCollections from '../components/FeaturedCollections.server';
import { Layout } from '../components/Layout.server';
import { Suspense } from 'react';

export default function Home() {
    return (
        <Layout>
            <Suspense>
                <FeaturedCollections />
            </Suspense>
        </Layout>
    );
}
