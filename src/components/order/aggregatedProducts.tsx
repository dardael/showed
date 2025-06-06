type AggregatedProduct = {
    _id: string;
    name: string;
    totalQuantity: number;
};

type AggregatedProductsProps = {
    orders: {
        products: {
            product: { _id: string; name: string };
            quantity: number;
        }[];
    }[];
};

export default function AggregatedProducts({
    orders,
}: AggregatedProductsProps) {
    const aggregatedProducts = orders
        .flatMap((order) => order.products) // Flatten all products from all orders
        .reduce<Record<string, AggregatedProduct>>(
            (acc, { product, quantity }) => {
                // Aggregate quantities by product ID
                if (!acc[product._id]) {
                    acc[product._id] = {
                        _id: product._id,
                        name: product.name,
                        totalQuantity: 0,
                    };
                }
                acc[product._id].totalQuantity += quantity;
                return acc;
            },
            {}
        ); // Use an object to group products by ID

    const sortedProducts = Object.values(aggregatedProducts).sort(
        (a, b) => a.name.localeCompare(b.name) // Sort products by name
    );

    return (
        <>
            {sortedProducts.map((product) => (
                <div key={product._id}>
                    {product.name} (x{product.totalQuantity})
                </div>
            ))}
        </>
    );
}
