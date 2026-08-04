import ProductCard from "./ProductCard";

function ProductGrid() {
  // Later this will come from Flask API
  const products: any[] = [];

  return (
    <section className="py-16">

      {/* Section Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Latest Products
          </h2>

          <p className="mt-2 text-gray-500">
            Discover agricultural products from verified sellers.
          </p>
        </div>

        <button className="rounded-xl border border-green-600 px-5 py-2 font-medium text-green-600 transition hover:bg-green-600 hover:text-white">
          View All
        </button>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-20 text-center">

          <h3 className="text-2xl font-semibold text-gray-700">
            No Products Available
          </h3>

          <p className="mt-3 text-gray-500">
            Products added by sellers will appear here.
          </p>

        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              category={product.category}
              price={product.price}
              location={product.location}
              seller={product.seller}
              rating={product.rating}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductGrid;