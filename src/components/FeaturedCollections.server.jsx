import { Link, Image, gql, useShopQuery, CacheLong } from '@shopify/hydrogen';

export default function FeaturedCollections() {
    const {
        data: { collections },
    } = useShopQuery({
        query: QUERY,
        cache: CacheLong(),
    });

    return (
        <section className="mx-auto max-w-7xl gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
            <h2 className="text-white whitespace-pre-wrap max-w-prose font-bold text-2xl">
                Collections
            </h2>
            <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-10 grid-cols-1 false sm:grid-cols-3 false false">
                {collections.nodes.map((collection) => {
                    console.log(
                        collection.products.nodes[0].priceRange.minVariantPrice
                            .amount
                    );
                    return (
                        <div className="card rounded-lg text-white overflow-hidden shadow-2xl hover:scale-105 bg-neutral neutral-content">
                            <Link
                                key={collection.id}
                                to={`/collections/${collection.handle}`}
                            >
                                <div className="absolute m-4 badge badge-secondary">
                                    NEW
                                </div>
                                {collection?.image && (
                                    <figure>
                                        <Image
                                            className="shadow-border inline-block"
                                            width={'100%'}
                                            height={'100%'}
                                            alt={`Image of ${collection.title}`}
                                            data={collection.image}
                                        />
                                    </figure>
                                )}
                                <div className="card-body">
                                    <div className="mb-4 flex lg:flex-row items-center justify-between">
                                        <h2 className="card-title whitespace-pre-wrap max-w-prose font-medium text-copy">
                                            {collection.title}
                                        </h2>
                                    </div>
                                    <div className="flex lg:flex-row md:flex-col sm:flex-col items-center justify-between">
                                        <div className="badge badge-accent badge-outline lg:badge-lg lg:text-lg md:mb-4 sm:mb-4">
                                            <em>
                                                From{'  $'}
                                                {/* Pull Minimum Price Data from Query */}
                                                {Math.floor(
                                                    collection.products.nodes[0]
                                                        .priceRange
                                                        .minVariantPrice.amount
                                                )}
                                                !
                                            </em>
                                        </div>
                                        <div className="badge badge-outline">
                                            Fashion
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

const QUERY = gql`
    query FeaturedCollections {
        collections(
            first: 3
            query: "collection_type:smart"
            sortKey: UPDATED_AT
        ) {
            nodes {
                id
                title
                handle
                image {
                    altText
                    width
                    height
                    url
                }
                products(first: 1, sortKey: PRICE) {
                    nodes {
                        priceRange {
                            minVariantPrice {
                                amount
                            }
                        }
                    }
                }
            }
        }
    }
`;
