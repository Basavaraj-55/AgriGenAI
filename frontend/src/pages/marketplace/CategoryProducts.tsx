import {
  useEffect,
  useState,
} from "react";


import {
  useNavigate,
  useParams,
} from "react-router-dom";


import axios from "axios";


import MainLayout from "../../components/layout/MainLayout";


import {
  FiHeart,
  FiShoppingCart,
  FiEye,
  FiStar,
  FiLoader,
} from "react-icons/fi";




// ======================================================
// API
// ======================================================

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:5000/api";





// ======================================================
// Product Interface
// ======================================================

interface Product {


  _id:string;


  product_name:string;


  category:string;


  seller_name:string;


  description:string;


  image_url?:string;


  price:number;


  quantity:number;


  rating?:number;


}






// ======================================================
// Component
// ======================================================

function CategoryProducts(){



  const navigate = useNavigate();



  const { category } = useParams();




  // Decode URL category

  const categoryName =
    decodeURIComponent(
      category || ""
    );





  // ======================================================
  // States
  // ======================================================


  const [products,setProducts] =

    useState<Product[]>([]);




  const [loading,setLoading] =

    useState(true);





  const [error,setError] =

    useState("");







  // ======================================================
  // Fetch Products
  // ======================================================


  const fetchProducts = async()=>{


    try{


      setLoading(true);



      const response =

        await axios.get(

          `${API_URL}/products/category/${categoryName}`

        );




      setProducts(

        response.data.products || []

      );



    }

    catch(error){



      console.error(

        "FETCH CATEGORY PRODUCTS ERROR:",

        error

      );



      setError(

        "Failed to load products."

      );


    }

    finally{


      setLoading(false);


    }


  };








  // ======================================================
  // Load Products
  // ======================================================


  useEffect(()=>{


    if(categoryName){


      fetchProducts();


    }


  },[categoryName]);
// ======================================================
// Add To Cart
// ======================================================

const addToCart = async (

  product: Product

) => {


  try {


    await axios.post(

      `${API_URL}/cart`,

      {

        product_id:

          product._id,


        quantity: 1,

      }

    );



    alert(

      "Product added to cart"

    );



  } catch(error){


    console.error(

      "ADD CART ERROR:",

      error

    );



    alert(

      "Unable to add product to cart"

    );


  }


};








// ======================================================
// Add To Wishlist
// ======================================================

const addToWishlist = async (

  product: Product

) => {


  try {



    await axios.post(

      `${API_URL}/wishlist`,

      {

        product_id:

          product._id,

      }

    );



    alert(

      "Added to wishlist"

    );



  } catch(error){


    console.error(

      "ADD WISHLIST ERROR:",

      error

    );



    alert(

      "Unable to add wishlist"

    );


  }


};









// ======================================================
// View Product
// ======================================================

const viewProduct = (

  id:string

) => {


  navigate(

    `/marketplace/product/${id}`

  );


};








// ======================================================
// Loading UI
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



          <p className="mt-5 text-lg font-semibold text-gray-600">

            Loading products...

          </p>


        </div>


      </div>


    </MainLayout>

  );


}







// ======================================================
// Error UI
// ======================================================

if(error){


  return (

    <MainLayout>


      <div className="flex min-h-screen items-center justify-center">


        <div className="rounded-3xl bg-red-50 p-10 text-center">


          <h2 className="text-2xl font-bold text-red-600">

            {error}

          </h2>



          <button

            onClick={fetchProducts}

            className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white"

          >

            Try Again

          </button>


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

        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">



          <div>


            <h1 className="text-4xl font-bold text-gray-800">

              {categoryName} Products

            </h1>



            <p className="mt-2 text-gray-500">

              Explore fresh agricultural products from sellers.

            </p>


          </div>






          <div className="rounded-2xl bg-green-600 px-8 py-5 text-white shadow-lg">


            <p className="text-sm">

              Available Products

            </p>



            <h2 className="text-4xl font-bold">

              {products.length}

            </h2>


          </div>




        </div>









        {/* Empty State */}


        {
          products.length === 0 ? (


            <div className="rounded-3xl bg-white py-24 text-center shadow-lg">


              <h2 className="text-3xl font-bold text-gray-700">

                No Products Found

              </h2>



              <p className="mt-3 text-gray-500">

                No products available in this category.

              </p>




              <button

                onClick={() =>
                  navigate("/marketplace")
                }

                className="mt-8 rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700"

              >

                Back To Marketplace


              </button>



            </div>



          ) : (




            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">






              {
                products.map((product)=>(



                  <div

                    key={product._id}

                    className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"

                  >






                    {/* Product Image */}


                    <div className="relative">



                      <img

                        src={

                          product.image_url ||

                          "https://placehold.co/400x300"

                        }

                        alt={product.product_name}

                        className="h-64 w-full object-cover"

                      />







                      {/* Wishlist Button */}


                      <button

                        onClick={() =>
                          addToWishlist(product)
                        }

                        className="absolute right-4 top-4 rounded-full bg-white p-3 text-red-500 shadow hover:bg-red-50"

                      >


                        <FiHeart />


                      </button>



                    </div>







                    {/* Product Content */}


                    <div className="space-y-4 p-6">






                      {/* Category + Rating */}


                      <div className="flex items-center justify-between">



                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                          {product.category}

                        </span>






                        <div className="flex items-center gap-1">


                          <FiStar

                            className="fill-yellow-400 text-yellow-400"

                          />



                          <span className="font-semibold">


                            {

                              product.rating

                              ?

                              product.rating.toFixed(1)

                              :

                              "0.0"

                            }


                          </span>



                        </div>




                      </div>







                      {/* Product Name */}


                      <h2

                        onClick={() =>
                          viewProduct(product._id)
                        }

                        className="cursor-pointer text-2xl font-bold text-gray-800 hover:text-green-600"

                      >

                        {product.product_name}


                      </h2>






                      {/* Description */}


                      <p className="line-clamp-2 text-gray-500">

                        {product.description}

                      </p>






                      {/* Seller */}


                      <p className="text-gray-500">


                        Seller:

                        <span className="ml-1 font-semibold text-gray-700">

                          {product.seller_name}

                        </span>


                      </p>
                      // ======================================================
// Price Section
// ======================================================


<div className="flex items-center justify-between">


  <div>


    <p className="text-sm text-gray-500">

      Price

    </p>



    <h3 className="text-3xl font-bold text-green-700">

      ₹{product.price.toLocaleString()}

    </h3>


  </div>





  <div className="text-right">


    <p className="text-sm text-gray-500">

      Stock

    </p>



    {

      product.quantity > 0 ? (


        <h3 className="font-bold text-green-700">

          {product.quantity} Available

        </h3>



      ) : (


        <h3 className="font-bold text-red-600">

          Out Of Stock

        </h3>


      )

    }


  </div>



</div>








{/* Action Buttons */}


<div className="flex flex-col gap-3 pt-4">





{/* View Details */}


<button

onClick={()=>viewProduct(product._id)}

className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-semibold transition hover:bg-gray-100"

>


<FiEye />


View Details


</button>








{/* Add Cart */}


<button

onClick={()=>addToCart(product)}

disabled={product.quantity <= 0}

className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"

>


<FiShoppingCart />


{

product.quantity > 0

?

"Add To Cart"

:

"Out Of Stock"

}



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


export default CategoryProducts;