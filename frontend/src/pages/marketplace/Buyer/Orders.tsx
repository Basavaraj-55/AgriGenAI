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
} from "react-icons/fi";









// ======================================================
// Order Interface
// ======================================================


interface OrderItem {

  _id:string;

  product_name:string;

  price:number;

  quantity:number;

}









interface Order {


  orderId:string;


  items:OrderItem[];


  address:{


    name:string;

    email:string;

    phone:string;

    address:string;

    city:string;

    state:string;

    pincode:string;


  };


  paymentMethod:string;


  total:number;


  orderDate:string;


  status:string;


}









// ======================================================
// Component
// ======================================================


export default function Orders(){



const navigate = useNavigate();









// ======================================================
// States
// ======================================================


const [orders,setOrders] =

useState<Order[]>([]);







const [loading,setLoading] =

useState(true);








const [selectedOrder,setSelectedOrder] =

useState<Order | null>(null);








const [cancelId,setCancelId] =

useState<string | null>(null);









// ======================================================
// Load Orders
// ======================================================


const loadOrders = ()=>{


try{


const latestOrder = JSON.parse(

localStorage.getItem("latestOrder") || "null"

);





if(latestOrder){


setOrders([

{

...latestOrder,


status:

latestOrder.status ||

"Placed",


}

]);


}


}


catch(error){


console.error(

"LOAD ORDERS ERROR:",

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


loadOrders();



},[]);
// ======================================================
// View Order Details
// ======================================================


const viewOrderDetails = (

order:Order

)=>{


setSelectedOrder(order);



};









// ======================================================
// Cancel Order
// ======================================================


const cancelOrder = ()=>{


if(!cancelId)

return;





const updatedOrders = orders.map(

(order)=>{


if(order.orderId === cancelId){


return {


...order,


status:"Cancelled",


};


}



return order;



}

);









setOrders(updatedOrders);









// Update localStorage


localStorage.setItem(

"latestOrder",

JSON.stringify(updatedOrders[0])

);









setCancelId(null);



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


<div className="mb-10">


<h1 className="text-4xl font-bold text-gray-800">

My Orders

</h1>



<p className="mt-2 text-gray-500">

Track your agriculture marketplace orders.

</p>


</div>









{/* Empty Orders */}


{

orders.length === 0 ? (



<div className="rounded-3xl bg-white py-20 text-center shadow-lg">



<h2 className="text-3xl font-bold text-gray-700">

No Orders Found

</h2>




<p className="mt-3 text-gray-500">

You have not placed any order yet.

</p>







<button

onClick={()=>navigate("/marketplace")}

className="mt-8 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700"

>


Start Shopping


</button>






</div>




)

:

(



<div className="overflow-hidden rounded-3xl bg-white shadow-lg">





<table className="min-w-full">



<thead className="bg-gray-100">


<tr>



<th className="px-6 py-4 text-left">

Order ID

</th>



<th className="px-6 py-4 text-left">

Date

</th>



<th className="px-6 py-4 text-left">

Items

</th>



<th className="px-6 py-4 text-left">

Amount

</th>



<th className="px-6 py-4 text-left">

Status

</th>



<th className="px-6 py-4 text-center">

Action

</th>



</tr>


</thead>









<tbody>


{

orders.map((order)=>(


<tr

key={order.orderId}

className="border-t hover:bg-gray-50"

>







<td className="px-6 py-4 font-semibold">

#{order.orderId}

</td>







<td className="px-6 py-4">

{order.orderDate}

</td>








<td className="px-6 py-4">

{order.items.length}

</td>








<td className="px-6 py-4 font-bold text-green-700">

₹{order.total}

</td>








<td className="px-6 py-4">


<span

className={

`rounded-full px-3 py-1 text-sm font-semibold

${

order.status === "Cancelled"

?

"bg-red-100 text-red-700"

:

order.status === "Delivered"

?

"bg-green-100 text-green-700"

:

"bg-blue-100 text-blue-700"

}`

}

>


{order.status}


</span>


</td>









<td className="px-6 py-4">


<div className="flex justify-center gap-3">





<button

onClick={()=>viewOrderDetails(order)}

className="rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700"

>


View


</button>








{

order.status !== "Cancelled" && (



<button

onClick={()=>setCancelId(order.orderId)}

className="rounded-xl bg-red-100 px-4 py-2 text-red-600 hover:bg-red-200"

>


Cancel


</button>



)

}





</div>


</td>







</tr>



))


}



</tbody>




</table>





</div>



)

}
// ======================================================
// Order Details Modal
// ======================================================


{

selectedOrder && (



<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">



<div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">





<h2 className="text-2xl font-bold text-gray-800">

Order Details

</h2>








<div className="mt-6 space-y-3 text-gray-700">



<p>

Order ID:

<span className="font-semibold">

 #{selectedOrder.orderId}

</span>

</p>







<p>

Date:

<span className="font-semibold">

 {selectedOrder.orderDate}

</span>

</p>







<p>

Payment:

<span className="font-semibold">

 {selectedOrder.paymentMethod}

</span>

</p>







<p>

Status:

<span className="font-semibold">

 {selectedOrder.status}

</span>

</p>







<p>

Total:

<span className="font-semibold text-green-700">

 ₹{selectedOrder.total}

</span>

</p>






</div>









<button

onClick={()=>setSelectedOrder(null)}

className="mt-8 w-full rounded-xl bg-gray-800 py-3 font-semibold text-white"

>


Close


</button>







</div>



</div>



)

}









// ======================================================
// Cancel Confirmation Modal
// ======================================================


{

cancelId && (



<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">



<div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">





<h2 className="text-2xl font-bold text-gray-800">

Cancel Order?

</h2>








<p className="mt-3 text-gray-500">

Are you sure you want to cancel this order?

</p>









<div className="mt-6 flex gap-4">





<button

onClick={()=>setCancelId(null)}

className="flex-1 rounded-xl border py-3 font-semibold"

>


No


</button>








<button

onClick={cancelOrder}

className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white"

>


Yes, Cancel


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