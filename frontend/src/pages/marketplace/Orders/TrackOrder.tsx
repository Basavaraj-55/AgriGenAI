import {
  useEffect,
  useMemo,
  useState,
} from "react";


import {
  useNavigate,
  useParams,
} from "react-router-dom";


import axios from "axios";


import MainLayout from "../../../components/layout/MainLayout";


import {
  FiArrowLeft,
  FiPackage,
  FiTruck,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiMapPin,
  FiUser,
  FiPhone,
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


  product_name:string;


  quantity:number;


  price:number;


  total_amount:number;


  address:string;


  payment_method:string;


  seller_id:string;


  seller_name?:string;


  seller_phone?:string;


  status:OrderStatus;


  created_at:string;


}







interface TimelineStep {


  title:string;


  description:string;


  completed:boolean;


  icon:any;


}









// ======================================================
// Component
// ======================================================


export default function TrackOrder(){



  const navigate = useNavigate();



  const {

    orderId

  } = useParams<{orderId:string}>();






  const [order,setOrder] =

    useState<Order | null>(null);



  const [loading,setLoading] =

    useState(true);
// ======================================================
// Fetch Order
// ======================================================


const fetchOrder = async()=>{


  try{


    setLoading(true);



    const response = await axios.get(


      `${API_URL}/api/orders/${orderId}`


    );





    if(response.data.success){


      setOrder(

        response.data.order

      );


    }



  }

  catch(error){


    console.error(

      "FETCH ORDER ERROR:",

      error

    );


  }

  finally{


    setLoading(false);


  }


};









// ======================================================
// Load Order
// ======================================================


useEffect(()=>{


  if(orderId){


    fetchOrder();


  }

  else{


    setLoading(false);


  }


},[orderId]);









// ======================================================
// Timeline Steps
// ======================================================


const timeline = useMemo<TimelineStep[]>(()=>{


  const status =

    order?.status || "Processing";





  if(status === "Cancelled"){


    return [


      {

        title:"Order Confirmed",

        description:

        "Your order was placed successfully.",

        completed:true,

        icon:FiCheckCircle,

      },


      {

        title:"Order Cancelled",

        description:

        "This order has been cancelled.",

        completed:true,

        icon:FiXCircle,

      },


    ];


  }








  return [


    {


      title:"Order Confirmed",

      description:

      "Your order has been placed successfully.",

      completed:true,

      icon:FiCheckCircle,


    },





    {


      title:"Packed",

      description:

      "Seller packed your order.",

      completed:

        status === "Packed" ||

        status === "Shipped" ||

        status === "Delivered",


      icon:FiPackage,


    },







    {


      title:"Shipped",

      description:

      "Your order is on the way.",

      completed:

        status === "Shipped" ||

        status === "Delivered",


      icon:FiTruck,


    },







    {


      title:"Delivered",

      description:

      "Order delivered successfully.",

      completed:

        status === "Delivered",


      icon:FiCheckCircle,


    },


  ];



},[order]);









// ======================================================
// Status Message
// ======================================================


const getStatusMessage = ()=>{


  switch(order?.status){


    case "Delivered":

      return "Your order has been delivered successfully.";



    case "Shipped":

      return "Your order is on the way.";



    case "Packed":

      return "Your order has been packed.";



    case "Cancelled":

      return "Your order has been cancelled.";



    default:

      return "Your order is being processed.";


  }


};
// ======================================================
// Loading UI
// ======================================================


if(loading){


  return (

    <MainLayout>


      <div className="flex min-h-screen items-center justify-center">


        <div className="text-center">


          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-green-600 border-t-transparent">


          </div>


          <p className="mt-5 font-semibold text-gray-600">

            Loading order details...

          </p>


        </div>


      </div>


    </MainLayout>

  );


}









// ======================================================
// Main UI
// ======================================================


return (

<MainLayout>


<div className="min-h-screen bg-gray-50 py-10">


<div className="mx-auto max-w-7xl px-6">








{/* Header */}


<div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">


<div>


<h1 className="text-4xl font-bold text-gray-800">

Track Order

</h1>



<p className="mt-2 text-gray-500">

Track your delivery progress.

</p>



</div>








<button


onClick={()=>navigate("/marketplace/orders")}


className="flex items-center gap-2 rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-gray-100"


>


<FiArrowLeft/>


Back To Orders


</button>



</div>









{

!order ? (



<div className="rounded-3xl bg-white p-16 text-center shadow-lg">


<FiPackage

size={80}

className="mx-auto text-gray-300"

/>



<h2 className="mt-6 text-3xl font-bold text-gray-700">

Order Not Found

</h2>



<p className="mt-3 text-gray-500">

Unable to find this order.

</p>



</div>



)

:

(



<div className="grid gap-8 lg:grid-cols-3">








{/* Left Section */}


<div className="space-y-8 lg:col-span-2">








{/* Order Information */}


<div className="rounded-3xl bg-white p-8 shadow-lg">


<h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">


<FiPackage/>


Order Information


</h2>





<div className="grid gap-6 md:grid-cols-2">





<div>


<p className="text-gray-500">

Order ID

</p>


<h3 className="mt-2 font-bold">

#{order._id.slice(-6).toUpperCase()}

</h3>


</div>








<div>


<p className="text-gray-500">

Product

</p>


<h3 className="mt-2 font-bold">

{order.product_name}

</h3>


</div>








<div>


<p className="text-gray-500">

Quantity

</p>


<h3 className="mt-2 font-bold">

{order.quantity}

</h3>


</div>








<div>


<p className="text-gray-500">

Price

</p>


<h3 className="mt-2 font-bold text-green-700">

₹{order.price.toFixed(2)}

</h3>


</div>








<div>


<p className="text-gray-500">

Total Amount

</p>


<h3 className="mt-2 text-2xl font-bold text-green-700">

₹{order.total_amount.toFixed(2)}

</h3>


</div>








<div>


<p className="text-gray-500">

Order Date

</p>


<h3 className="mt-2 font-bold">

{

new Date(

order.created_at

).toLocaleDateString()

}

</h3>


</div>







</div>


</div>









{/* Current Status */}


<div className="rounded-3xl bg-white p-8 shadow-lg">


<h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">


<FiTruck/>


Current Status


</h2>





<div className="flex items-center gap-5">


<div className="rounded-full bg-green-100 p-5">


<FiTruck

size={35}

className="text-green-600"

/>


</div>






<div>


<h3 className="text-3xl font-bold text-green-700">

{order.status}

</h3>



<p className="mt-2 text-gray-600">

{getStatusMessage()}

</p>



</div>



</div>



</div>
// ======================================================
// Right Section
// ======================================================


<div className="space-y-6">





{/* Delivery Address */}


<div className="rounded-3xl bg-white p-6 shadow-lg">


<h2 className="mb-5 flex items-center gap-2 text-xl font-bold">


<FiMapPin/>


Delivery Address


</h2>



<p className="leading-7 text-gray-700">

{order.address}

</p>



</div>









{/* Payment Information */}


<div className="rounded-3xl bg-white p-6 shadow-lg">


<h2 className="mb-5 text-xl font-bold">

💳 Payment Information

</h2>



<div className="space-y-4">


<div className="flex justify-between">


<span className="text-gray-500">

Payment Method

</span>



<span className="font-semibold">

{order.payment_method}

</span>



</div>







<div className="flex justify-between">


<span className="text-gray-500">

Total Amount

</span>



<span className="font-bold text-green-700">

₹{order.total_amount.toFixed(2)}

</span>



</div>



</div>


</div>









{/* Seller Information */}


<div className="rounded-3xl bg-white p-6 shadow-lg">


<h2 className="mb-5 flex items-center gap-2 text-xl font-bold">


<FiUser/>


Seller Information


</h2>





<div className="space-y-4">



<div>


<p className="text-sm text-gray-500">

Seller Name

</p>


<p className="mt-2 font-semibold">

{order.seller_name || "Farmer"}

</p>


</div>







{

order.seller_phone && (


<button


onClick={()=>


window.open(

`tel:${order.seller_phone}`

)


}


className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"


>


<FiPhone/>


Contact Seller


</button>


)

}



</div>


</div>






</div>


</div>









{/* Timeline */}


<div className="mt-10 rounded-3xl bg-white p-8 shadow-lg">


<h2 className="mb-8 flex items-center gap-2 text-2xl font-bold">


<FiClock/>


Order Timeline


</h2>







<div className="space-y-8">


{

timeline.map((step,index)=>{


const Icon = step.icon;



return (



<div

key={step.title}

className="flex gap-5"

>



<div className="flex flex-col items-center">


<div


className={

`flex h-12 w-12 items-center justify-center rounded-full

${

step.completed

?

"bg-green-600 text-white"

:

"bg-gray-200 text-gray-500"

}`

}


>


<Icon size={22}/>


</div>








{

index !== timeline.length - 1 && (


<div


className={

`mt-2 h-16 w-1

${

step.completed

?

"bg-green-600"

:

"bg-gray-300"

}`

}


/>


)

}



</div>









<div className="flex-1 rounded-2xl border p-5">


<div className="flex items-center justify-between">


<h3 className="text-xl font-bold">

{step.title}

</h3>





<span


className={

`rounded-full px-4 py-1 text-sm font-semibold

${

step.completed

?

"bg-green-100 text-green-700"

:

"bg-gray-100 text-gray-500"

}`

}


>


{

step.completed

?

"Completed"

:

"Pending"

}


</span>


</div>





<p className="mt-3 text-gray-600">

{step.description}

</p>



</div>





</div>



)


})

}



</div>









{/* Status Message */}


<div className="mt-10 rounded-2xl bg-green-50 p-6">


<div className="flex items-center gap-4">


<FiTruck

size={35}

className="text-green-600"

/>



<div>


<h3 className="text-2xl font-bold text-green-700">

{getStatusMessage()}

</h3>



<p className="mt-2 text-gray-600">

We will keep updating your order progress.

</p>



</div>


</div>


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