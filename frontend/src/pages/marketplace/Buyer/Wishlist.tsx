import {
  useEffect,
  useState,
} from "react";


import {
  useNavigate,
} from "react-router-dom";


import MainLayout from "../../../components/layout/MainLayout";


import {
  FiLoader,
  FiHeart,
  FiShoppingCart,
  FiTrash2,
} from "react-icons/fi";









// ======================================================
// Wishlist Item Interface
// ======================================================


interface WishlistItem {


  _id:string;


  product_name:string;


  category:string;


  seller_name:string;


  price:number;


  unit:string;


  image_url:string;


}









// ======================================================
// Component
// ======================================================


export default function Wishlist(){



const navigate = useNavigate();









// ======================================================
// States
// ======================================================


const [wishlist,setWishlist] =

useState<WishlistItem[]>([]);







const [loading,setLoading] =

useState(true);









// ======================================================
// Load Wishlist
// ======================================================


const loadWishlist = ()=>{


try{


const storedWishlist = JSON.parse(

localStorage.getItem("wishlist") || "[]"

);





setWishlist(storedWishlist);



}

catch(error){


console.error(

"WISHLIST LOAD ERROR:",

error

);



setWishlist([]);



}

finally{


setLoading(false);


}



};









// ======================================================
// Initial Load
// ======================================================


useEffect(()=>{


loadWishlist();



},[]);
// ======================================================
// Save Wishlist
// ======================================================


const saveWishlist = (

updatedWishlist:WishlistItem[]

)=>{


setWishlist(updatedWishlist);



localStorage.setItem(

"wishlist",

JSON.stringify(updatedWishlist)

);



};









// ======================================================
// Remove Wishlist Item
// ======================================================


const removeItem = (

id:string

)=>{


const updatedWishlist = wishlist.filter(

(item)=>

item._id !== id

);





saveWishlist(updatedWishlist);



};









// ======================================================
// Add To Cart
// ======================================================


const addToCart = (

product:WishlistItem

)=>{



try{


const existingCart:any[] = JSON.parse(

localStorage.getItem("cart") || "[]"

);









const existingProduct = existingCart.find(

(item)=>

item._id === product._id

);









let updatedCart;





if(existingProduct){


updatedCart = existingCart.map(

(item)=>

item._id === product._id

?

{

...item,

quantity:item.quantity + 1

}

:

item

);



}

else{


updatedCart = [

...existingCart,

{

...product,

quantity:1,

}

];


}









localStorage.setItem(

"cart",

JSON.stringify(updatedCart)

);









// Remove from wishlist after adding


removeItem(product._id);








alert(

"Product added to cart"

);








navigate(

"/marketplace/cart"

);





}

catch(error){


console.error(

"ADD CART ERROR:",

error

);



}



};
// ======================================================
// Loading UI
// ======================================================


if(loading){


return (

<MainLayout>


<div className="flex min-h-screen items-center justify-center">


<FiLoader

size={50}

className="animate-spin text-green-600"

/>


</div>


</MainLayout>


);


}









// ======================================================
// JSX
// ======================================================


return (

<MainLayout>


<div className="min-h-screen bg-gray-50 py-10">


<div className="mx-auto max-w-7xl px-6">







{/* Header */}


<div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">



<div>


<h1 className="text-4xl font-bold text-gray-800">

❤️ My Wishlist

</h1>





<p className="mt-2 text-gray-500">

{wishlist.length} saved products

</p>



</div>








<button

onClick={()=>navigate("/marketplace")}

className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"

>


Continue Shopping


</button>



</div>









{/* Empty Wishlist */}



{

wishlist.length === 0 ? (



<div className="rounded-3xl bg-white py-20 text-center shadow-lg">



<FiHeart

size={80}

className="mx-auto text-red-500"

/>






<h2 className="mt-6 text-3xl font-bold text-gray-700">

Wishlist is Empty

</h2>








<p className="mt-3 text-gray-500">

Save your favourite agriculture products here.

</p>






<button

onClick={()=>navigate("/marketplace")}

className="mt-8 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white"

>


Browse Products


</button>





</div>



)

:

(



<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">






{

wishlist.map((product)=>(



<div

key={product._id}

className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2"

>









{/* Image */}


<img

src={

product.image_url ||

"https://placehold.co/600"

}

alt={product.product_name}

className="h-64 w-full object-cover"

/>









{/* Details */}


<div className="p-6">






<span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

{product.category}

</span>








<h2 className="mt-4 text-2xl font-bold text-gray-800">

{product.product_name}

</h2>







<p className="mt-2 text-gray-500">

Seller: {product.seller_name}

</p>







<h3 className="mt-4 text-3xl font-bold text-green-700">

₹{product.price}

<span className="ml-2 text-lg text-gray-500">

/ {product.unit}

</span>

</h3>
// ======================================================
// Action Buttons
// ======================================================


<div className="mt-8 flex gap-3">





<button

onClick={()=>addToCart(product)}

className="flex-1 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"

>


<FiShoppingCart className="mr-2 inline"/>

Add To Cart


</button>









<button

onClick={()=>removeItem(product._id)}

className="rounded-xl bg-red-100 px-5 text-red-600 transition hover:bg-red-200"

>


<FiTrash2 size={20}/>


</button>






</div>








</div>






</div>



))



}



</div>



)

}



</div>


</div>


</MainLayout>


);


}