import {
  useEffect,
  useMemo,
  useState,
} from "react";


import axios from "axios";


import MainLayout from "../../../components/layout/MainLayout";


import {
  FiStar,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiLoader,
} from "react-icons/fi";




// ======================================================
// API
// ======================================================

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:5000/api";






// ======================================================
// Interface
// ======================================================

interface Review {

  _id:string;

  customer_name:string;

  product_name:string;

  rating:number;

  comment:string;

  reply?:string;

  created_at:string;

}







export default function ReviewsRatings(){



  const user = JSON.parse(

    localStorage.getItem("user") || "{}"

  );



  const sellerId =

    user._id || user.id;






  const [reviews,setReviews] =

    useState<Review[]>([]);



  const [loading,setLoading] =

    useState(true);



  const [selectedProduct,setSelectedProduct] =

    useState("All");



  const [replyText,setReplyText] =

    useState<Record<string,string>>({});



  const [sending,setSending] =

    useState<string | null>(null);







  // ======================================================
  // Fetch Reviews
  // ======================================================


  const fetchReviews = async()=>{


    try{


      setLoading(true);



      const response = await axios.get(


        `${API_URL}/reviews/seller/${sellerId}`


      );



      setReviews(

        response.data.reviews || []

      );


    }

    catch(error){


      console.error(

        "FETCH REVIEWS ERROR",

        error

      );


    }

    finally{


      setLoading(false);


    }


  };







  useEffect(()=>{


    if(sellerId){


      fetchReviews();


    }


  },[]);







  // ======================================================
  // Analytics
  // ======================================================


  const totalReviews =

    reviews.length;





  const averageRating = useMemo(()=>{


    if(totalReviews === 0)

      return "0.0";



    const total = reviews.reduce(

      (sum,item)=>

        sum + item.rating,

      0

    );



    return (

      total / totalReviews

    ).toFixed(1);



  },[reviews]);







  const positivePercentage = useMemo(()=>{


    if(totalReviews===0)

      return 0;



    const positive = reviews.filter(

      item=>item.rating >= 4

    ).length;



    return Math.round(

      (positive / totalReviews) * 100

    );



  },[reviews]);







  const products = useMemo(()=>{


    return [

      "All",

      ...new Set(

        reviews.map(

          item=>item.product_name

        )

      )

    ];


  },[reviews]);







  const filteredReviews = useMemo(()=>{


    if(selectedProduct==="All")

      return reviews;



    return reviews.filter(

      item=>

      item.product_name===selectedProduct

    );



  },[reviews,selectedProduct]);







  // ======================================================
  // Reply
  // ======================================================


  const sendReply = async(

    id:string

  )=>{


    const reply = replyText[id];



    if(!reply?.trim())

      return;




    try{


      setSending(id);



      await axios.put(

        `${API_URL}/reviews/reply/${id}`,

        {

          reply

        }

      );



      setReplyText({

        ...replyText,

        [id]:""

      });



      fetchReviews();



    }

    catch(error){


      console.error(

        "REPLY ERROR",

        error

      );


    }

    finally{


      setSending(null);


    }


  };

    // ======================================================
  // Loading
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

              Loading reviews...

            </p>


          </div>


        </div>


      </MainLayout>

    );


  }







  return (

    <MainLayout>


      <div className="min-h-screen bg-gray-50 py-10">


        <div className="mx-auto max-w-7xl px-6">





          {/* Header */}

          <div className="mb-10">


            <h1 className="text-4xl font-bold text-gray-800">

              Reviews & Ratings

            </h1>


            <p className="mt-2 text-gray-500">

              Manage customer feedback and reply to customers.

            </p>


          </div>








          {/* Analytics Cards */}


          <div className="mb-10 grid gap-6 md:grid-cols-3">



            <div className="rounded-3xl bg-white p-8 shadow-lg">


              <div className="flex items-center gap-5">


                <div className="rounded-full bg-yellow-100 p-5">


                  <FiStar

                    size={35}

                    className="text-yellow-500"

                  />


                </div>


                <div>


                  <h2 className="text-4xl font-bold">

                    {averageRating}

                  </h2>


                  <p className="text-gray-500">

                    Average Rating

                  </p>


                </div>


              </div>


            </div>







            <div className="rounded-3xl bg-white p-8 shadow-lg">


              <div className="flex items-center gap-5">


                <div className="rounded-full bg-green-100 p-5">


                  <FiMessageSquare

                    size={35}

                    className="text-green-600"

                  />


                </div>



                <div>


                  <h2 className="text-4xl font-bold">

                    {totalReviews}

                  </h2>


                  <p className="text-gray-500">

                    Total Reviews

                  </p>


                </div>


              </div>


            </div>







            <div className="rounded-3xl bg-white p-8 shadow-lg">


              <div className="flex items-center gap-5">


                <div className="rounded-full bg-blue-100 p-5">


                  <FiUser

                    size={35}

                    className="text-blue-600"

                  />


                </div>



                <div>


                  <h2 className="text-4xl font-bold">

                    {positivePercentage}%

                  </h2>


                  <p className="text-gray-500">

                    Positive Reviews

                  </p>


                </div>


              </div>


            </div>


          </div>









          {/* Product Filter */}


          <div className="mb-8 rounded-2xl bg-white p-6 shadow">


            <label className="mb-3 block font-semibold">


              Filter By Product


            </label>



            <select

              value={selectedProduct}

              onChange={(e)=>

                setSelectedProduct(e.target.value)

              }

              className="w-full rounded-xl border p-3"

            >


              {

                products.map((product)=>(


                  <option

                    key={product}

                    value={product}

                  >

                    {product}

                  </option>


                ))

              }


            </select>


          </div>









          {/* Reviews */}


          <div className="space-y-6">


            {

              filteredReviews.length===0 ? (


                <div className="rounded-3xl bg-white p-12 text-center shadow">


                  <h2 className="text-2xl font-bold">

                    No Reviews Found

                  </h2>


                </div>


              )

              :

              filteredReviews.map((review)=>(


                <div

                  key={review._id}

                  className="rounded-3xl bg-white p-8 shadow-lg"

                >



                  <div className="flex justify-between">


                    <div>


                      <h2 className="text-xl font-bold">

                        {review.customer_name}

                      </h2>


                      <p className="text-green-700 font-semibold">

                        Product: {review.product_name}

                      </p>


                    </div>





                    <div className="flex">


                      {

                        Array.from({length:5}).map((_,index)=>(


                          <FiStar

                            key={index}

                            className={

                              index < review.rating

                              ?

                              "fill-yellow-400 text-yellow-400"

                              :

                              "text-gray-300"

                            }

                          />


                        ))

                      }


                    </div>


                  </div>







                  <p className="mt-5 text-gray-600">

                    {review.comment}

                  </p>







                  <div className="mt-6 rounded-2xl bg-gray-50 p-5">


                    <h3 className="font-bold mb-3">

                      Seller Reply

                    </h3>




                    {

                      review.reply ? (


                        <p className="rounded-xl bg-white p-4">

                          {review.reply}

                        </p>


                      )

                      :

                      (


                        <div>


                          <textarea

                            rows={3}

                            value={

                              replyText[review._id] || ""

                            }

                            onChange={(e)=>

                              setReplyText({

                                ...replyText,

                                [review._id]:

                                  e.target.value

                              })

                            }

                            className="w-full rounded-xl border p-3"

                            placeholder="Write reply..."

                          />





                          <button

                            onClick={()=>sendReply(review._id)}

                            disabled={sending===review._id}

                            className="mt-3 flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white"

                          >


                            <FiSend/>


                            {

                              sending===review._id

                              ?

                              "Sending..."

                              :

                              "Send Reply"

                            }


                          </button>


                        </div>


                      )

                    }


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
