import {
  useEffect,
  useMemo,
  useState,
} from "react";


import {
  useNavigate,
} from "react-router-dom";


import MainLayout from "../../../components/layout/MainLayout";


import {
  FiShoppingCart,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiTag,
} from "react-icons/fi";









// ======================================================
// Cart Item Interface
// ======================================================


interface CartItem {


  _id:string;


  product_name:string;


  category:string;


  seller_name:string;


  price:number;


  quantity:number;


  unit:string;


  image_url:string;


}









// ======================================================
// Component
// ======================================================


export default function Cart(){



const navigate = useNavigate();









// ======================================================
// States
// ======================================================


const [cartItems,setCartItems] =

useState<CartItem[]>([]);





const [loading,setLoading] =

useState(true);





const [coupon,setCoupon] =

useState("");









// ======================================================
// Load Cart
// ======================================================


const loadCart = ()=>{


try{


const storedCart = JSON.parse(

localStorage.getItem("cart") || "[]"

);





setCartItems(storedCart);



}

catch(error){


console.error(

"CART LOAD ERROR:",

error

);



setCartItems([]);



}

finally{


setLoading(false);


}



};









// ======================================================
// Initial Load
// ======================================================


useEffect(()=>{


loadCart();



},[]);
// ======================================================
// Save Cart
// ======================================================


const saveCart = (

updatedCart:CartItem[]

)=>{


setCartItems(updatedCart);



localStorage.setItem(

"cart",

JSON.stringify(updatedCart)

);



};









// ======================================================
// Increase Quantity
// ======================================================


const increaseQuantity = (

id:string

)=>{


const updatedCart = cartItems.map(

(item)=>

item._id === id

?

{

...item,

quantity:item.quantity + 1

}

:

item

);





saveCart(updatedCart);



};









// ======================================================
// Decrease Quantity
// ======================================================


const decreaseQuantity = (

id:string

)=>{


const updatedCart = cartItems.map(

(item)=>{


if(

item._id === id &&

item.quantity > 1

){


return {

...item,

quantity:item.quantity - 1

};


}



return item;


}

);





saveCart(updatedCart);



};









// ======================================================
// Remove Item
// ======================================================


const removeItem = (

id:string

)=>{


const updatedCart = cartItems.filter(

(item)=>

item._id !== id

);





saveCart(updatedCart);



};









// ======================================================
// Clear Cart
// ======================================================


const clearCart = ()=>{


setCartItems([]);



localStorage.removeItem(

"cart"

);



};









// ======================================================
// Price Calculation
// ======================================================


const subtotal = useMemo(()=>{


return cartItems.reduce(

(total,item)=>

total +

(item.price * item.quantity),

0

);



},[cartItems]);









const deliveryCharge =


subtotal >= 500

?

0

:

cartItems.length > 0

?

40

:

0;









const gst = useMemo(()=>{


return Math.round(

subtotal * 0.05

);



},[subtotal]);









const grandTotal =

subtotal +

deliveryCharge +

gst;
// ======================================================
// Loading UI
// ======================================================


if(loading){


return (

<MainLayout>


<div className="flex min-h-screen items-center justify-center bg-gray-50">


<div className="h-14 w-14 animate-spin rounded-full border-4 border-green-600 border-t-transparent">


</div>


</div>


</div>


</MainLayout>


);


}









// ======================================================
// Empty Cart
// ======================================================


if(cartItems.length === 0){


return (

<MainLayout>


<div className="flex min-h-screen items-center justify-center bg-gray-50">


<div className="rounded-3xl bg-white p-12 text-center shadow-lg">


<FiShoppingCart

size={80}

className="mx-auto text-green-600"

/>





<h2 className="mt-6 text-3xl font-bold text-gray-800">

Your Cart is Empty

</h2>






<p className="mt-3 text-gray-500">

Add products from Agri Marketplace.

</p>








<button

onClick={()=>navigate("/marketplace")}

className="mt-8 rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700"

>


Continue Shopping


</button>




</div>


</div>


</div>


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

🛒 Shopping Cart

</h1>




<p className="mt-2 text-gray-500">

{cartItems.length} item(s) in your cart

</p>



</div>








<button

onClick={()=>navigate("/marketplace")}

className="flex items-center justify-center gap-2 rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-gray-100"

>


<FiArrowLeft/>

Continue Shopping


</button>





</div>









{/* Main Layout */}


<div className="grid gap-10 lg:grid-cols-3">









{/* Cart Products */}


<div className="space-y-6 lg:col-span-2">





{

cartItems.map((item)=>(


<div

key={item._id}

className="rounded-3xl bg-white p-6 shadow-lg"

>



<div className="flex flex-col gap-6 md:flex-row md:items-center">







{/* Image */}


<img

src={

item.image_url ||

"https://placehold.co/400"

}

alt={item.product_name}

className="h-36 w-full rounded-2xl object-cover md:w-44"

/>









{/* Details */}


<div className="flex-1">


<h2 className="text-2xl font-bold text-gray-800">

{item.product_name}

</h2>





<p className="mt-2 text-gray-500">

Seller: {item.seller_name}

</p>





<h3 className="mt-4 text-3xl font-bold text-green-600">

₹{item.price}

<span className="ml-2 text-lg text-gray-500">

/ {item.unit}

</span>

</h3>



</div>









{/* Actions */}


<div className="flex flex-col items-center gap-4">





<button

onClick={()=>removeItem(item._id)}

className="rounded-xl bg-red-100 p-3 text-red-600 hover:bg-red-200"

>


<FiTrash2/>

</button>









<div className="flex items-center overflow-hidden rounded-xl border">



<button

onClick={()=>decreaseQuantity(item._id)}

className="px-4 py-3 hover:bg-gray-100"

>


<FiMinus/>


</button>







<div className="border-x px-5 py-3 font-bold">

{item.quantity}

</div>







<button

onClick={()=>increaseQuantity(item._id)}

className="px-4 py-3 text-green-700 hover:bg-green-50"

>


<FiPlus/>


</button>




</div>









<p className="text-xl font-bold text-gray-800">

₹{item.price * item.quantity}

</p>





</div>





</div>



</div>



))


}



</div>
// ======================================================
// Order Summary
// ======================================================


<div>


<div className="sticky top-24 rounded-3xl bg-white p-6 shadow-lg">





<div className="mb-6 flex items-center gap-3">


<FiShoppingCart

className="text-green-600"

size={28}

/>


<h2 className="text-2xl font-bold text-gray-800">

Order Summary

</h2>


</div>









{/* Coupon */}


<div className="mb-6">


<label className="mb-2 flex items-center gap-2 font-semibold text-gray-700">


<FiTag/>


Coupon Code


</label>







<div className="flex gap-2">



<input

type="text"

value={coupon}

onChange={(e)=>setCoupon(e.target.value)}

placeholder="Enter coupon code"

className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-green-500"

/>







<button

className="rounded-xl bg-green-600 px-5 font-semibold text-white hover:bg-green-700"

>


Apply


</button>






</div>



</div>









{/* Price Details */}


<div className="space-y-4">





<div className="flex justify-between text-gray-600">


<span>

Subtotal

</span>


<span>

₹{subtotal}

</span>


</div>







<div className="flex justify-between text-gray-600">


<span>

Delivery

</span>


<span>


{

deliveryCharge === 0

?

"FREE"

:

`₹${deliveryCharge}`

}


</span>


</div>







<div className="flex justify-between text-gray-600">


<span>

GST (5%)

</span>


<span>

₹{gst}

</span>


</div>








<hr/>








<div className="flex justify-between text-2xl font-bold text-green-700">


<span>

Total

</span>


<span>

₹{grandTotal}

</span>


</div>









<button

onClick={()=>navigate("/marketplace/checkout")}

className="mt-8 w-full rounded-xl bg-green-600 py-4 text-lg font-bold text-white transition hover:bg-green-700"

>


Proceed To Checkout


</button>






</div>







</div>


</div>








</div>


</div>


</MainLayout>


);


}