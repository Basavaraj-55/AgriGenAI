import { useState } from "react";

function ProductImageGallery() {
  // Placeholder images for UI.
  // Later these will come from the backend.
  const images = [
    "https://placehold.co/600x500?text=Product+1",
    "https://placehold.co/600x500?text=Product+2",
    "https://placehold.co/600x500?text=Product+3",
    "https://placehold.co/600x500?text=Product+4",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <img
          src={selectedImage}
          alt="Product"
          className="h-[450px] w-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-xl border-2 transition ${
              selectedImage === image
                ? "border-green-600"
                : "border-gray-200 hover:border-green-400"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="h-24 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductImageGallery;