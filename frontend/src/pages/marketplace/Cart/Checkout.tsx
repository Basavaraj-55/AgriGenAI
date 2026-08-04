import {
  useEffect,
  useMemo,
  useState,
} from "react";


import {
  useNavigate,
} from "react-router-dom";


import axios from "axios";


import MainLayout from "../../../components/layout/MainLayout";


import {
  FiArrowLeft,
  FiUser,
  FiMapPin,
  FiCreditCard,
} from "react-icons/fi";





// ======================================================
// Backend API
// ======================================================


const API_URL =

  "http://127.0.0.1:5000/api";







// ======================================================
// Interfaces
// ======================================================


interface Address {


  fullName: string;


  phone: string;


  email: string;


  house: string;


  street: string;


  city: string;


  district: string;


  state: string;


  pincode: string;


}







interface CartItem {


  _id: string;


  product_id: string;


  product_name: string;


  seller_id: string;


  seller_name: string;


  image: string;


  quantity: number;


  price: number;


}








interface OrderPayload {


  user_id: string;


  seller_id: string;


  product_id: string;


  product_name: string;


  quantity: number;


  price: number;


  total_amount: number;


  address: string;


  payment_method: string;


}








// ======================================================
// Component
// ======================================================


function Checkout() {



  const navigate = useNavigate();





  // ======================================================
  // User
  // ======================================================


  const user = JSON.parse(

    localStorage.getItem("user") || "{}"

  );








  // ======================================================
  // Address
  // ======================================================


  const [address, setAddress] =

    useState<Address>({


      fullName: "",


      phone: "",


      email: "",


      house: "",


      street: "",


      city: "",


      district: "",


      state: "",


      pincode: "",


    });








  // ======================================================
  // Cart
  // ======================================================


  const [cartItems, setCartItems] =

    useState<CartItem[]>([]);






  const [loading, setLoading] =

    useState(false);






  // ======================================================
  // Delivery
  // ======================================================


  const [deliveryType, setDeliveryType] =

    useState("Standard");







  // ======================================================
  // Payment
  // ======================================================


  const [paymentMethod, setPaymentMethod] =

    useState("Cash on Delivery");
  // ======================================================
  // Fetch Cart From Backend
  // ======================================================


  const fetchCart = async () => {


    try {


      const userId = user._id;



      if (!userId) {

        setCartItems([]);

        return;

      }





      const response = await axios.get(


        `${API_URL}/cart/${userId}`


      );




      setCartItems(

        response.data.cart || []

      );



    }


    catch (error) {



      console.error(

        "FETCH CHECKOUT CART ERROR:",

        error

      );



    }


  };








  // ======================================================
  // Load Cart
  // ======================================================


  useEffect(() => {


    fetchCart();


  }, []);








  // ======================================================
  // Price Calculation
  // ======================================================


  const subtotal = useMemo(() => {


    return cartItems.reduce(


      (sum, item) =>

        sum +

        item.price *

        item.quantity,


      0


    );


  }, [cartItems]);








  const deliveryCharge =


    deliveryType === "Express"

      ? 100

      : 40;








  const gst = Number(


    (subtotal * 0.05).toFixed(2)


  );








  const total =


    subtotal +

    deliveryCharge +

    gst;
  // ======================================================
  // Place Order
  // ======================================================


  const handlePlaceOrder = async () => {


    try {


      if (cartItems.length === 0) {


        alert(

          "Cart is empty."

        );


        return;


      }





      if (


        !address.fullName ||

        !address.phone ||

        !address.house ||

        !address.city ||

        !address.state ||

        !address.pincode


      ) {


        alert(

          "Please fill all required fields."

        );


        return;


      }





      setLoading(true);






      const fullAddress = `

${address.house},

${address.street},

${address.city},

${address.district},

${address.state} -

${address.pincode}

`;









      // Create order for each product


      for (const item of cartItems) {





        const payload: OrderPayload = {


          user_id:

            user._id || "guest",




          seller_id:

            item.seller_id,




          product_id:

            item.product_id,




          product_name:

            item.product_name,




          quantity:

            item.quantity,




          price:

            item.price,




          total_amount:

            item.price *

            item.quantity,




          address:

            fullAddress,




          payment_method:

            paymentMethod,



        };







        await axios.post(


          `${API_URL}/orders`,


          payload


        );



      }








      // Clear backend cart after order


      await axios.delete(


        `${API_URL}/cart/clear/${user._id}`


      );








      alert(

        "Order placed successfully."

      );








      navigate(

        "/marketplace/order-success"

      );





    }

    catch (error) {



      console.error(

        "PLACE ORDER ERROR:",

        error

      );



      alert(

        "Unable to place order."

      );



    }

    finally {


      setLoading(false);


    }


  };
  return (

    <MainLayout>


      <div className="min-h-screen bg-gray-50 py-10">


        <div className="mx-auto max-w-7xl px-6">



          {/* Header */}

          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">


            <div>


              <h1 className="text-4xl font-bold text-gray-800">

                Checkout

              </h1>


              <p className="mt-2 text-gray-500">

                Complete your delivery and payment details.

              </p>


            </div>




            <button

              onClick={() => navigate("/marketplace/cart")}

              className="flex items-center gap-2 rounded-xl border bg-white px-5 py-3 font-semibold"

            >


              <FiArrowLeft />

              Back To Cart


            </button>



          </div>







          <div className="grid gap-10 lg:grid-cols-3">





            {/* LEFT SECTION */}


            <div className="space-y-8 lg:col-span-2">






              {/* Customer Details */}


              <div className="rounded-3xl bg-white p-8 shadow">


                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">


                  <FiUser />

                  Customer Details


                </h2>





                <div className="grid gap-5 md:grid-cols-2">



                  <input

                    placeholder="Full Name"

                    value={address.fullName}

                    onChange={(e) =>

                      setAddress({

                        ...address,

                        fullName: e.target.value

                      })

                    }

                    className="rounded-xl border p-4"

                  />





                  <input

                    placeholder="Phone Number"

                    value={address.phone}

                    onChange={(e) =>

                      setAddress({

                        ...address,

                        phone: e.target.value

                      })

                    }

                    className="rounded-xl border p-4"

                  />





                  <input

                    placeholder="Email"

                    value={address.email}

                    onChange={(e) =>

                      setAddress({

                        ...address,

                        email: e.target.value

                      })

                    }

                    className="rounded-xl border p-4 md:col-span-2"

                  />



                </div>


              </div>









              {/* Address */}


              <div className="rounded-3xl bg-white p-8 shadow">


                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">


                  <FiMapPin />

                  Delivery Address


                </h2>





                <div className="grid gap-5 md:grid-cols-2">



                  {

                    [

                      ["house", "House / Flat"],

                      ["street", "Street"],

                      ["city", "City"],

                      ["district", "District"],

                      ["state", "State"],

                      ["pincode", "PIN Code"]

                    ].map(([key, label]) => (


                      <input

                        key={key}

                        placeholder={label}

                        value={(address as any)[key]}

                        onChange={(e) =>

                          setAddress({

                            ...address,

                            [key]: e.target.value

                          })

                        }

                        className="rounded-xl border p-4"

                      />


                    ))

                  }



                </div>


              </div>



            </div>









            {/* RIGHT SECTION */}


            <div>


              <div className="sticky top-24 space-y-6">






                {/* Delivery */}


                <div className="rounded-3xl bg-white p-6 shadow">


                  <h2 className="mb-5 text-xl font-bold">

                    🚚 Delivery

                  </h2>



                  <label className="flex gap-3 mb-3">


                    <input

                      type="radio"

                      checked={deliveryType === "Standard"}

                      onChange={() => setDeliveryType("Standard")}

                    />


                    Standard Delivery ₹40


                  </label>





                  <label className="flex gap-3">


                    <input

                      type="radio"

                      checked={deliveryType === "Express"}

                      onChange={() => setDeliveryType("Express")}

                    />


                    Express Delivery ₹100


                  </label>


                </div>








                {/* Payment */}


                <div className="rounded-3xl bg-white p-6 shadow">


                  <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">


                    <FiCreditCard />

                    Payment


                  </h2>




                  {

                    [

                      "Cash on Delivery",

                      "UPI",

                      "Card"

                    ].map((method) => (


                      <label

                        key={method}

                        className="mb-3 flex gap-3"

                      >


                        <input

                          type="radio"

                          checked={paymentMethod === method}

                          onChange={() => setPaymentMethod(method)}

                        />


                        {method}


                      </label>


                    ))

                  }



                </div>









                {/* Summary */}


                <div className="rounded-3xl bg-white p-6 shadow">


                  <h2 className="mb-5 text-xl font-bold">

                    Order Summary

                  </h2>





                  <div className="space-y-4">


                    {

                      cartItems.map((item) => (


                        <div

                          key={item._id}

                          className="flex justify-between border-b pb-3"

                        >


                          <span>

                            {item.product_name}

                            ×

                            {item.quantity}

                          </span>



                          <span>

                            ₹

                            {item.price *

                              item.quantity}

                          </span>


                        </div>


                      ))


                    }



                    <div className="flex justify-between">

                      <span>

                        Subtotal

                      </span>


                      <span>

                        ₹{subtotal}

                      </span>


                    </div>




                    <div className="flex justify-between">

                      <span>

                        Delivery

                      </span>


                      <span>

                        ₹{deliveryCharge}

                      </span>


                    </div>





                    <div className="flex justify-between">

                      <span>

                        GST

                      </span>


                      <span>

                        ₹{gst}

                      </span>


                    </div>






                    <hr />





                    <div className="flex justify-between text-2xl font-bold text-green-700">


                      <span>

                        Total

                      </span>


                      <span>

                        ₹{total}

                      </span>


                    </div>



                  </div>






                  <button

                    onClick={handlePlaceOrder}

                    disabled={loading}

                    className="mt-6 w-full rounded-xl bg-green-600 py-4 font-bold text-white hover:bg-green-700 disabled:bg-gray-400"

                  >


                    {

                      loading

                        ?

                        "Placing Order..."

                        :

                        "Place Order"

                    }



                  </button>



                </div>




              </div>


            </div>




                    </div>


        </div>


      </div>


    </MainLayout>


  );


}


export default Checkout;