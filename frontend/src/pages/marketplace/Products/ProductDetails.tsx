import {
  useEffect,
  useState,
} from "react";


import {
  useNavigate,
  useParams,
} from "react-router-dom";


import MainLayout from "../../../components/layout/MainLayout";


import {
  getProductById,
  getProducts,
} from "../marketApi";


import type {
  Product,
} from "../marketApi";


import {
  FiHeart,
  FiShoppingCart,
  FiTruck,
  FiShield,
  FiStar,
  FiMapPin,
} from "react-icons/fi";




// ======================================================
// Cart Interface
// ======================================================


interface CartItem {

  _id: string;

  product_name: string;

  price: number;

  quantity: number;

  image_url: string;

  seller_name: string;

  seller_id: string;

}





// ======================================================
// Component
// ======================================================


export default function ProductDetails(){



  const navigate = useNavigate();



  const {id} = useParams<{

    id:string

  }>();





  // ======================================================
  // States
  // ======================================================


  const [product,setProduct] =

    useState<Product | null>(null);



  const [relatedProducts,setRelatedProducts] =

    useState<Product[]>([]);



  const [loading,setLoading] =

    useState(true);



  const [quantity,setQuantity] =

    useState(1);



  const [wishlist,setWishlist] =

    useState(false);



  const [selectedImage,setSelectedImage] =

    useState("");
// ======================================================
// Load Product
// ======================================================


useEffect(()=>{


  if(id){


    loadProduct();


  }


},[id]);








// ======================================================
// Fetch Product
// ======================================================


const loadProduct = async()=>{


  try{


    setLoading(true);



    const response = await getProductById(

      id as string

    );



    const productData =

      response.product || response;



    setProduct(productData);



    setSelectedImage(

      productData.image_url || ""

    );



    loadRelatedProducts(

      productData.category

    );



  }

  catch(error){


    console.error(

      "PRODUCT FETCH ERROR:",

      error

    );


  }

  finally{


    setLoading(false);


  }


};









// ======================================================
// Related Products
// ======================================================


const loadRelatedProducts = async(

  category:string

)=>{


  try{


    const response = await getProducts();



    const products =

      response.products || response;



    const related = products.filter(

      (item:Product)=>

        item.category === category &&

        item._id !== id

    );



    setRelatedProducts(

      related.slice(0,4)

    );



  }

  catch(error){


    console.error(

      "RELATED PRODUCTS ERROR:",

      error

    );


  }


};









// ======================================================
// Quantity
// ======================================================


const increaseQuantity = ()=>{


  if(

    product &&

    quantity < product.quantity

  ){


    setQuantity(

      previous=>previous+1

    );


  }


};








const decreaseQuantity = ()=>{


  if(quantity > 1){


    setQuantity(

      previous=>previous-1

    );


  }


};









// ======================================================
// Add To Cart
// ======================================================


const addToCart = ()=>{


  if(!product)

    return;





  const cart:CartItem[] = JSON.parse(


    localStorage.getItem("cart") || "[]"


  );





  const existing = cart.find(

    item=>

    item._id === product._id

  );





  if(existing){


    existing.quantity += quantity;


  }

  else{


   cart.push({

    _id: product._id || "",

    product_name: product.product_name,

    price: product.price,

    quantity,

    image_url: product.image_url || "",

    seller_name: product.seller_name || "Farmer",

    seller_id: product.seller_id || ""

});

  }






  localStorage.setItem(

    "cart",

    JSON.stringify(cart)

  );






  alert(

    "Added to cart"

  );


};









// ======================================================
// Wishlist
// ======================================================


const addToWishlist = ()=>{


  if(!product)

    return;





  const wishlistItems = JSON.parse(


    localStorage.getItem("wishlist") || "[]"


  );





  const exists = wishlistItems.find(

    (item:any)=>

    item._id === product._id

  );





  if(exists){


    alert(

      "Already added"

    );


    return;


  }






  wishlistItems.push(product);





  localStorage.setItem(

    "wishlist",

    JSON.stringify(wishlistItems)

  );





  setWishlist(true);





};









// ======================================================
// Buy Now
// ======================================================


const buyNow = ()=>{


  addToCart();



  navigate(

    "/marketplace/checkout"

  );


};
// ======================================================
// JSX
// ======================================================


return (

<MainLayout>


<div className="min-h-screen bg-gray-50 py-10">


<div className="mx-auto max-w-7xl px-6">






{/* Loading */}

{

loading ? (


<div className="flex min-h-[500px] items-center justify-center">


<div className="h-14 w-14 animate-spin rounded-full border-4 border-green-600 border-t-transparent">


</div>


</div>



)

:

!product ? (



<div className="rounded-3xl bg-white p-12 text-center shadow-lg">


<h2 className="text-3xl font-bold text-gray-700">

Product Not Found

</h2>




<button

onClick={()=>navigate("/marketplace")}

className="mt-6 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white"

>


Back To Marketplace


</button>


</div>



)

:

(


<div className="space-y-10">







{/* Product Main Section */}


<div className="grid gap-10 rounded-3xl bg-white p-8 shadow-lg lg:grid-cols-2">






{/* Image Section */}


<div>


<div className="relative">


<img


src={

selectedImage ||

"https://placehold.co/600x400"

}


alt={product.product_name}


className="h-[450px] w-full rounded-3xl object-cover"


/>







<button


onClick={addToWishlist}


className="absolute right-5 top-5 rounded-full bg-white p-4 shadow"


>


<FiHeart

size={26}

className={

wishlist

?

"text-red-600"

:

"text-gray-400"

}

/>


</button>




</div>


</div>









{/* Product Information */}


<div className="space-y-6">







<span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

{product.category}

</span>








<h1 className="text-4xl font-bold text-gray-800">

{product.product_name}

</h1>








<p className="leading-7 text-gray-600">

{product.description}

</p>









{/* Rating */}


<div className="flex items-center gap-2">


<FiStar

className="fill-yellow-400 text-yellow-400"

/>



<span className="font-semibold">

{product.rating || 4.8}

</span>



<span className="text-gray-500">

Customer Reviews

</span>



</div>









{/* Price */}


<div>


<p className="text-gray-500">

Price

</p>



<h2 className="text-4xl font-bold text-green-700">

₹{product.price}


<span className="ml-2 text-lg text-gray-500">

/ {product.unit || "Kg"}

</span>


</h2>


</div>









{/* Seller Information */}


<div className="rounded-2xl bg-green-50 p-5">


<h3 className="text-xl font-bold text-gray-800">

Seller Information

</h3>



<p className="mt-3">

👨‍🌾 {product.seller_name || "Farmer"}

</p>





<div className="mt-2 flex items-center gap-2 text-gray-600">


<FiMapPin/>


{product.location || "India"}


</div>



</div>









{/* Quantity */}


<div>


<h3 className="mb-3 font-semibold">

Quantity

</h3>





<div className="flex items-center gap-5">



<button


onClick={decreaseQuantity}


className="rounded-xl bg-gray-200 px-5 py-2 text-xl"


>


-


</button>







<span className="text-2xl font-bold">

{quantity}

</span>








<button


onClick={increaseQuantity}


className="rounded-xl bg-green-600 px-5 py-2 text-xl text-white"


>


+


</button>





</div>



</div>









{/* Action Buttons */}


<div className="grid gap-4 sm:grid-cols-2">



<button


onClick={addToCart}


className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-4 font-bold text-white hover:bg-green-700"


>


<FiShoppingCart/>


Add To Cart


</button>







<button


onClick={buyNow}


className="rounded-xl bg-orange-500 py-4 font-bold text-white hover:bg-orange-600"


>


Buy Now


</button>




</div>
// ======================================================
// Product Features
// ======================================================


<div className="grid gap-4 sm:grid-cols-3">


<div className="rounded-2xl bg-green-50 p-5 text-center">


<FiTruck

size={35}

className="mx-auto text-green-600"

/>


<h3 className="mt-3 font-bold">

Fast Delivery

</h3>


<p className="text-sm text-gray-500">

Direct farmer delivery

</p>


</div>







<div className="rounded-2xl bg-blue-50 p-5 text-center">


<FiShield

size={35}

className="mx-auto text-blue-600"

/>


<h3 className="mt-3 font-bold">

Quality Product

</h3>


<p className="text-sm text-gray-500">

Verified farmers

</p>


</div>







<div className="rounded-2xl bg-yellow-50 p-5 text-center">


<FiStar

size={35}

className="mx-auto fill-yellow-400 text-yellow-400"

/>


<h3 className="mt-3 font-bold">

Trusted Rating

</h3>


<p className="text-sm text-gray-500">

Customer reviews

</p>


</div>



</div>



</div>

</div>









{/* Related Products */}


{

relatedProducts.length > 0 && (


<section>


<h2 className="mb-6 text-3xl font-bold text-gray-800">

Related Products

</h2>





<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">



{

relatedProducts.map((item)=>(


<div

key={item._id}

className="overflow-hidden rounded-2xl bg-white shadow-lg"

>



<img


src={

item.image_url ||

"https://placehold.co/400"

}


alt={item.product_name}


className="h-40 w-full object-cover"


/>







<div className="p-4">



<h3 className="font-bold text-gray-800">

{item.product_name}

</h3>





<p className="mt-2 font-bold text-green-700">

₹{item.price}

</p>







<button


onClick={()=>


navigate(

`/marketplace/product/${item._id}`

)


}


className="mt-4 w-full rounded-xl bg-green-600 py-2 font-semibold text-white hover:bg-green-700"


>


View Product


</button>




</div>




</div>



))


}



</div>



</section>


)



}






</div>


)


}



</div>


</div>


</MainLayout>


);


}