import {
  useEffect,
  useState,
} from "react";


import {
  useNavigate,
} from "react-router-dom";


import MainLayout from "../../../components/layout/MainLayout";


import {
  FiShoppingBag,
  FiTruck,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiRefreshCw,
  FiMapPin,
  FiLoader,
} from "react-icons/fi";




// ======================================================
// API
// ======================================================


const API_URL =

  import.meta.env.VITE_API_URL ||

  "http://127.0.0.1:5000";






// ======================================================
// Types
// ======================================================


type OrderStatus =

  | "Processing"

  | "Packed"

  | "Shipped"

  | "Delivered"

  | "Cancelled";






interface Order {


  _id:string;


  product_id:string;


  product_name:string;


  product_image?:string;


  quantity:number;


  price:number;


  total_amount:number;


  address:string;


  payment_method:string;


  status:OrderStatus;


  created_at:string;


}







// ======================================================
// Component
// ======================================================


export default function Orders(){



  const navigate = useNavigate();




  const user = JSON.parse(

    localStorage.getItem("user") || "{}"

  );





  const [orders,setOrders] =

    useState<Order[]>([]);




  const [loading,setLoading] =

    useState(true);




  const [cancelling,setCancelling] =

    useState<string | null>(null);
// ======================================================
// Fetch Orders
// ======================================================


const fetchOrders = async()=>{


  try{


    setLoading(true);



    const response = await fetch(


      `${API_URL}/api/orders/user/${user._id}`


    );



    const data = await response.json();




    if(data.success){


      setOrders(

        data.orders || []

      );


    }



  }

  catch(error){


    console.error(

      "FETCH ORDERS ERROR:",

      error

    );


  }

  finally{


    setLoading(false);


  }


};









// ======================================================
// Load Orders
// ======================================================


useEffect(()=>{


  if(user?._id){


    fetchOrders();


  }

  else{


    setLoading(false);


  }


},[]);









// ======================================================
// Cancel Order
// ======================================================


const cancelOrder = async(

  orderId:string

)=>{


  try{


    setCancelling(orderId);





    const response = await fetch(


      `${API_URL}/api/orders/cancel/${orderId}`,


      {


        method:"PUT",


      }


    );





    const data = await response.json();





    if(data.success){


      alert(

        "Order cancelled successfully"

      );



      fetchOrders();


    }



  }

  catch(error){


    console.error(

      "CANCEL ORDER ERROR:",

      error

    );



    alert(

      "Failed to cancel order"

    );


  }

  finally{


    setCancelling(null);


  }


};









// ======================================================
// Reorder Product
// ======================================================


const reorder = (

  order:Order

)=>{


  const cart = JSON.parse(


    localStorage.getItem("cart") || "[]"


  );





  cart.push({


    _id:

      order.product_id,



    product_name:

      order.product_name,



    price:

      order.price,



    quantity:

      order.quantity,



  });






  localStorage.setItem(


    "cart",


    JSON.stringify(cart)


  );






  navigate(

    "/marketplace/cart"

  );


};









// ======================================================
// Status Icon
// ======================================================


const statusIcon = (

  status:OrderStatus

)=>{


  switch(status){


    case "Delivered":

      return (

        <FiCheckCircle

          className="text-green-600"

        />

      );



    case "Shipped":

      return (

        <FiTruck

          className="text-blue-600"

        />

      );



    case "Packed":

      return (

        <FiTruck

          className="text-purple-600"

        />

      );



    case "Cancelled":

      return (

        <FiXCircle

          className="text-red-600"

        />

      );



    default:

      return (

        <FiClock

          className="text-yellow-500"

        />

      );


  }


};









// ======================================================
// Status Style
// ======================================================


const statusStyle = (

  status:OrderStatus

)=>{


  switch(status){


    case "Delivered":

      return "bg-green-100 text-green-700";



    case "Shipped":

      return "bg-blue-100 text-blue-700";



    case "Packed":

      return "bg-purple-100 text-purple-700";



    case "Cancelled":

      return "bg-red-100 text-red-700";



    default:

      return "bg-yellow-100 text-yellow-700";


  }


};
// ======================================================
// Loading State
// ======================================================


if(loading){


  return (

    <MainLayout>


      <div className="flex min-h-screen items-center justify-center">


        <div className="text-center">


          <FiLoader

            size={50}

            className="mx-auto animate-spin text-green-600"

          />


          <p className="mt-5 font-semibold text-gray-600">

            Loading orders...

          </p>


        </div>


      </div>


    </MainLayout>


  );


}









// ======================================================
// UI
// ======================================================


return (

<MainLayout>


<div className="min-h-screen bg-gray-50 py-10">


<div className="mx-auto max-w-7xl px-6">







{/* Header */}


<div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">


<div>


<h1 className="text-4xl font-bold text-gray-800">

My Orders

</h1>



<p className="mt-2 text-gray-500">

View and manage your marketplace orders.

</p>



</div>






<div className="rounded-2xl bg-green-600 px-8 py-5 text-white shadow-lg">


<p className="text-sm">

Total Orders

</p>



<h2 className="text-4xl font-bold">

{orders.length}

</h2>


</div>



</div>









{/* Empty State */}


{

orders.length === 0 ? (



<div className="rounded-3xl bg-white p-16 text-center shadow-lg">


<FiShoppingBag

size={80}

className="mx-auto text-gray-300"

/>





<h2 className="mt-6 text-3xl font-bold text-gray-700">

No Orders Yet

</h2>





<p className="mt-3 text-gray-500">

Start shopping and your orders will appear here.

</p>






<button


onClick={()=>navigate("/marketplace")}


className="mt-8 rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700"


>


Browse Products


</button>




</div>



)

:

(



<div className="space-y-8">


{

orders.map((order)=>(



<div

key={order._id}

className="overflow-hidden rounded-3xl bg-white shadow-lg"

>









{/* Order Header */}


<div className="flex flex-col justify-between gap-5 border-b bg-gray-50 p-6 md:flex-row md:items-center">



<div>


<h2 className="text-2xl font-bold text-gray-800">

Order #

{order._id.slice(-6).toUpperCase()}

</h2>





<p className="mt-2 text-sm text-gray-500">


Placed on{" "}


{

new Date(

order.created_at

).toLocaleDateString()

}



</p>



</div>









<div


className={`flex items-center gap-2 rounded-full px-5 py-2 font-semibold ${statusStyle(order.status)}`}


>


{

statusIcon(order.status)

}


{order.status}



</div>



</div>




{/* Product Section */}


<div className="p-6">


<div className="flex flex-col gap-6 md:flex-row">





<img


src={

order.product_image ||

"https://placehold.co/120"

}


alt={order.product_name}


className="h-32 w-32 rounded-xl object-cover"


/>








<div>


<h3 className="text-2xl font-bold text-gray-800">

{order.product_name}

</h3>





<p className="mt-3 text-gray-600">

Quantity:

<span className="ml-2 font-semibold">

{order.quantity}

</span>

</p>






<p className="mt-2 text-gray-600">

Price:

<span className="ml-2 font-semibold">

₹{order.price}

</span>

</p>





<h3 className="mt-3 text-2xl font-bold text-green-700">

₹{order.total_amount}

</h3>



</div>



</div>
// ======================================================
// Delivery Information
// ======================================================


<div className="mt-8 grid gap-6 md:grid-cols-2">





{/* Delivery Address */}

<div>


<h4 className="text-sm font-semibold uppercase text-gray-500">

Delivery Address

</h4>



<div className="mt-3 flex gap-3 rounded-xl bg-gray-50 p-4 text-gray-700">


<FiMapPin

className="mt-1 text-green-600"

/>


<p>

{order.address}

</p>


</div>



</div>









{/* Payment Method */}

<div>


<h4 className="text-sm font-semibold uppercase text-gray-500">

Payment Method

</h4>




<div className="mt-3 rounded-xl bg-gray-50 p-4 font-semibold text-gray-700">

{order.payment_method}

</div>



</div>



</div>









// ======================================================
// Action Buttons
// ======================================================


<div className="mt-8 flex flex-wrap gap-4">







{/* View Details */}


<button


onClick={()=>


navigate(

`/marketplace/orders/${order._id}`

)


}


className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-100"


>


<FiEye/>


View Details


</button>









{/* Track Order */}


<button


onClick={()=>


navigate(

`/marketplace/orders/track/${order._id}`

)


}


className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-100"


>


<FiMapPin/>


Track Order


</button>









{/* Reorder */}


<button


onClick={()=>reorder(order)}


className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"


>


<FiRefreshCw/>


Reorder


</button>









{/* Cancel */}


{


order.status === "Processing" && (


<button


onClick={()=>cancelOrder(order._id)}


disabled={cancelling === order._id}


className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white disabled:opacity-50"


>


{


cancelling === order._id

?

"Cancelling..."

:

"Cancel Order"


}



</button>


)


}



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