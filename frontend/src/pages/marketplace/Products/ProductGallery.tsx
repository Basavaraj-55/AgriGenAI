import {
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";


import MainLayout from "../../../components/layout/MainLayout";


import {
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";




// ======================================================
// Product Interface
// ======================================================


interface Product {


  _id:string;


  product_name:string;


  category:string;


  price:number;


  stock:number;


  unit:string;


  image_url:string;


  status:string;


}








// ======================================================
// Temporary Seller Products
// Later Replace With API
// ======================================================


const PRODUCTS:Product[] = [


  {

    _id:"101",

    product_name:"Fresh Tomato",

    category:"Vegetables",

    price:35,

    stock:120,

    unit:"Kg",

    image_url:
    "https://placehold.co/400x300",

    status:"Active"


  },



  {

    _id:"102",

    product_name:"Organic Onion",

    category:"Vegetables",

    price:40,

    stock:80,

    unit:"Kg",

    image_url:
    "https://placehold.co/400x300",

    status:"Active"


  },



  {

    _id:"103",

    product_name:"Mango",

    category:"Fruits",

    price:180,

    stock:50,

    unit:"Kg",

    image_url:
    "https://placehold.co/400x300",

    status:"Active"


  }


];









// ======================================================
// Component
// ======================================================


function ProductGallery(){



const navigate = useNavigate();






const [search,setSearch] =

useState("");









// ======================================================
// Search Products
// ======================================================


const filteredProducts = useMemo(()=>{


return PRODUCTS.filter((product)=>


product.product_name

.toLowerCase()

.includes(

search.toLowerCase()

)



);


},[search]);
// ======================================================
// Add Product Navigation
// ======================================================


const addProduct = () => {


  navigate(
    "/seller/add-product"
  );


};









// ======================================================
// Edit Product
// Later Connect API
// ======================================================


const editProduct = (id:string) => {


  navigate(

    `/seller/edit-product/${id}`

  );


};









// ======================================================
// Delete Product
// Temporary Frontend
// Later Replace API
// ======================================================


const deleteProduct = (id:string) => {


  const confirmDelete = window.confirm(

    "Are you sure you want to delete this product?"

  );



  if(confirmDelete){


    alert(

      "Product deleted successfully"

    );


  }


};
// ======================================================
// JSX
// ======================================================


return (

<MainLayout>


<div className="min-h-screen bg-gray-50 p-6">


<div className="mx-auto max-w-7xl">





{/* Header */}


<div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">


<div>


<h1 className="text-4xl font-bold text-gray-800">

My Product Gallery

</h1>



<p className="mt-2 text-gray-500">

Manage your agricultural products.

</p>


</div>








<button

onClick={addProduct}

className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"

>


<FiPlus/>


Add Product


</button>



</div>









{/* Stats */}


<div className="mb-8 grid gap-6 md:grid-cols-3">



<div className="rounded-2xl bg-white p-6 shadow">


<p className="text-gray-500">

Total Products

</p>



<h2 className="mt-2 text-4xl font-bold text-green-700">

{PRODUCTS.length}

</h2>


</div>






<div className="rounded-2xl bg-white p-6 shadow">


<p className="text-gray-500">

Active Products

</p>



<h2 className="mt-2 text-4xl font-bold text-blue-700">

{

PRODUCTS.filter(

(product)=>

product.status==="Active"

).length

}

</h2>


</div>








<div className="rounded-2xl bg-white p-6 shadow">


<p className="text-gray-500">

Out Of Stock

</p>



<h2 className="mt-2 text-4xl font-bold text-red-600">

{

PRODUCTS.filter(

(product)=>

product.stock===0

).length

}

</h2>


</div>



</div>









{/* Search */}



<div className="relative mb-8">


<FiSearch

className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"

/>





<input


type="text"


value={search}


onChange={(e)=>setSearch(e.target.value)}


placeholder="Search your products..."


className="w-full rounded-xl border bg-white py-3 pl-12 pr-4 outline-none focus:border-green-500"


/>



</div>









{/* Product Grid Start */}



<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {/* ======================================================
    Product Cards
====================================================== */}


{

filteredProducts.map((product)=>(


<div

key={product._id}

className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-xl"

>





{/* Image */}


<img

src={

product.image_url ||

"https://placehold.co/400x300"

}

alt={product.product_name}

className="h-56 w-full object-cover"

/>








{/* Details */}


<div className="space-y-4 p-6">





<div className="flex items-center justify-between">


<span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

{product.category}

</span>





<span

className={`rounded-full px-3 py-1 text-sm font-semibold ${
  
product.status === "Active"

?

"bg-green-100 text-green-700"

:

"bg-red-100 text-red-700"

}`}

>

{product.status}

</span>



</div>








<h2 className="text-2xl font-bold text-gray-800">

{product.product_name}

</h2>








<div className="flex justify-between">


<p className="text-gray-500">

Price

</p>


<p className="text-2xl font-bold text-green-600">

₹{product.price}

</p>


</div>








<div className="flex justify-between">


<p className="text-gray-500">

Stock

</p>


<p className="font-semibold">

{product.stock} {product.unit}

</p>


</div>








{/* Actions */}


<div className="flex gap-3 pt-4">





<button

onClick={()=>editProduct(product._id)}

className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-100 py-3 font-semibold text-blue-700 hover:bg-blue-200"

>


<FiEdit/>


Edit


</button>








<button

onClick={()=>deleteProduct(product._id)}

className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-100 py-3 font-semibold text-red-600 hover:bg-red-200"

>


<FiTrash2/>


Delete


</button>






</div>






</div>






</div>



))


}



</div>







</div>


</div>


</MainLayout>


);


}


export default ProductGallery;