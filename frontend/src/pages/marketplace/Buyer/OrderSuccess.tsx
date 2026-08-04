import {
  useNavigate,
} from "react-router-dom";


import MainLayout from "../../../components/layout/MainLayout";


import {
  FiCheckCircle,
  FiShoppingBag,
  FiHome,
} from "react-icons/fi";




// ======================================================
// Component
// ======================================================


export default function OrderSuccess(){


const navigate = useNavigate();




return (

<MainLayout>


<div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">


<div className="max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl">





{/* Success Icon */}

<div className="flex justify-center">

<FiCheckCircle

size={100}

className="text-green-600"

/>

</div>








<h1 className="mt-6 text-4xl font-bold text-gray-800">

Order Placed Successfully 🎉

</h1>






<p className="mt-4 text-gray-500 leading-7">

Thank you for shopping with Agri Marketplace.

Your order has been placed successfully.

Our seller will start processing your order soon.

</p>








{/* Order Info */}


<div className="mt-8 rounded-2xl bg-green-50 p-6">


<h2 className="text-xl font-bold text-green-700">

Order Confirmation

</h2>



<p className="mt-2 text-gray-600">

Your products will be delivered soon.

</p>


</div>









{/* Buttons */}


<div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">





<button

onClick={()=>navigate("/marketplace/orders")}

className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"

>


<FiShoppingBag/>


View Orders


</button>









<button

onClick={()=>navigate("/marketplace")}

className="flex items-center justify-center gap-2 rounded-xl border border-green-600 px-6 py-3 font-semibold text-green-700 hover:bg-green-50"

>


<FiHome/>


Continue Shopping


</button>







</div>







</div>


</div>


</MainLayout>


);


}