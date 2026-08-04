import {
  useEffect,
  useState,
} from "react";


import {
  useNavigate,
} from "react-router-dom";


import MainLayout from "../../../components/layout/MainLayout";


import {
  FiShoppingCart,
  FiLoader,
  FiTrash2,
  FiMinus,
  FiPlus,
} from "react-icons/fi";




// ======================================================
// Cart Interface
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

"LOAD CART ERROR:",

error

);



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


if(item._id === id && item.quantity > 1){


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


const subtotal = cartItems.reduce(

(total,item)=>

total +

(item.price * item.quantity),

0

);





const deliveryCharge =

cartItems.length > 0

?

50

:

0;






const totalAmount =

subtotal +

deliveryCharge;
// ======================================================
// JSX
// ======================================================


return (

<MainLayout>


<div className="min-h-screen bg-gray-50 py-10">


<div className="mx-auto max-w-7xl px-6">







{
loading ? (



<div className="flex min-h-[500px] items-center justify-center">


<FiLoader

size={50}

className="animate-spin text-green-600"

/>


</div>



)

:

cartItems.length === 0 ? (



<div className="rounded-3xl bg-white py-20 text-center shadow-lg">


<FiShoppingCart

size={80}

className="mx-auto text-green-600"

/>





<h1 className="mt-6 text-3xl font-bold text-gray-700">

Your Cart is Empty

</h1>





<p className="mt-3 text-gray-500">

Add products from Agri Marketplace.

</p>






<button

onClick={()=>navigate("/marketplace")}

className="mt-8 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700"

>


Continue Shopping


</button>





</div>



)

:

(



<div className="grid gap-8 lg:grid-cols-3">








{/* Cart Items */}



<div className="rounded-3xl bg-white p-6 shadow-lg lg:col-span-2">





<div className="mb-6 flex items-center justify-between">


<h1 className="text-3xl font-bold text-gray-800">

Shopping Cart

</h1>




<button

onClick={clearCart}

className="rounded-xl bg-red-100 px-4 py-2 font-semibold text-red-600"

>


Clear


</button>



</div>









{

cartItems.map((item)=>(



<div

key={item._id}

className="flex flex-col gap-5 border-b py-6 md:flex-row md:items-center md:justify-between"

>







{/* Product */}


<div className="flex items-center gap-5">


<img

src={

item.image_url ||

"https://placehold.co/100"

}

alt={item.product_name}

className="h-24 w-24 rounded-xl object-cover"

/>





<div>


<h2 className="text-xl font-bold text-gray-800">

{item.product_name}

</h2>





<p className="text-gray-500">

{item.seller_name}

</p>





<p className="mt-2 font-bold text-green-700">

₹{item.price}

</p>



</div>


</div>









{/* Quantity Controls */}



<div className="flex items-center gap-3">





<button

onClick={()=>decreaseQuantity(item._id)}

className="rounded-lg bg-gray-200 p-2 hover:bg-gray-300"

>


<FiMinus/>


</button>







<span className="w-8 text-center font-bold">

{item.quantity}

</span>







<button

onClick={()=>increaseQuantity(item._id)}

className="rounded-lg bg-green-100 p-2 text-green-700 hover:bg-green-200"

>


<FiPlus/>


</button>







<button

onClick={()=>removeItem(item._id)}

className="rounded-lg bg-red-100 p-2 text-red-600"

>


<FiTrash2/>


</button>




</div>






</div>



))


}



</div>
// ======================================================
// Order Summary
// ======================================================


<div className="h-fit rounded-3xl bg-white p-6 shadow-lg">


<h2 className="mb-6 text-2xl font-bold text-gray-800">

Order Summary

</h2>





<div className="space-y-4">



<div className="flex justify-between text-gray-600">


<span>

Products

</span>


<span className="font-semibold">

{cartItems.length}

</span>


</div>







<div className="flex justify-between text-gray-600">


<span>

Subtotal

</span>


<span className="font-semibold">

₹{subtotal}

</span>


</div>







<div className="flex justify-between text-gray-600">


<span>

Delivery Charge

</span>


<span className="font-semibold">

₹{deliveryCharge}

</span>


</div>







<hr />







<div className="flex justify-between text-xl font-bold">


<span>

Total

</span>



<span className="text-green-700">

₹{totalAmount}

</span>


</div>








<button

onClick={()=>navigate("/marketplace/checkout")}

className="mt-8 w-full rounded-xl bg-green-600 py-4 font-bold text-white transition hover:bg-green-700"

>


Proceed To Checkout


</button>





</div>



</div>







</div>


)

}



</div>


</div>


</MainLayout>


);


}