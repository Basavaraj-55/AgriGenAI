import {
  useState,
} from "react";


import {
  useNavigate,
} from "react-router-dom";


import {
  FiLock,
  FiMail,
  FiLogIn,
} from "react-icons/fi";


import MainLayout from "../../components/layout/MainLayout";



// ======================================================
// API
// ======================================================


const API_URL = "http://127.0.0.1:5000/api/auth";




// ======================================================
// Component
// ======================================================


export default function SellerLogin(){



const navigate = useNavigate();




// ======================================================
// States
// ======================================================


const [email,setEmail] =
useState("");



const [password,setPassword] =
useState("");



const [loading,setLoading] =
useState(false);





// ======================================================
// Login Handler
// ======================================================


const handleLogin = async(

e:React.FormEvent

)=>{


e.preventDefault();



try{


setLoading(true);




const response = await fetch(

`${API_URL}/seller/login`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

email,

password

})


}

);






const data = await response.json();





if(!response.ok || !data.success){


alert(

data.message ||

"Login failed"

);


return;


}







const seller = data.seller;

localStorage.setItem(
  "token",
  data.token
);




// Save seller session


localStorage.setItem(

"seller",

JSON.stringify(seller)

);





localStorage.setItem(

"user",

JSON.stringify(seller)

);






navigate(

"/marketplace/seller/dashboard"

);




}

catch(error){



console.log(

"SELLER LOGIN ERROR",

error

);



alert(

"Unable to login"

);



}

finally{


setLoading(false);


}



};









return (

<MainLayout>


<div className="
flex
min-h-screen
items-center
justify-center
bg-gray-50
px-6
">





<div className="
w-full
max-w-md
rounded-3xl
bg-white
p-8
shadow-xl
">







<div className="
mb-8
text-center
">


<div className="
mx-auto
flex
h-20
w-20
items-center
justify-center
rounded-full
bg-green-100
">


<FiLogIn

size={35}

className="text-green-700"

/>


</div>





<h1 className="
mt-5
text-3xl
font-bold
text-gray-800
">

Seller Login

</h1>




<p className="
mt-2
text-gray-500
">

Access your farmer store dashboard

</p>



</div>








<form

onSubmit={handleLogin}

className="space-y-5"

>





{/* Email */}


<div>


<label className="
mb-2
block
font-semibold
text-gray-700
">

Email

</label>



<div className="
flex
items-center
rounded-xl
border
px-4
">


<FiMail className="text-gray-400"/>




<input

type="email"

required

value={email}

onChange={(e)=>

setEmail(e.target.value)

}

placeholder="seller@gmail.com"

className="
w-full
px-3
py-3
outline-none
"

/>



</div>


</div>








{/* Password */}



<div>


<label className="
mb-2
block
font-semibold
text-gray-700
">

Password

</label>




<div className="
flex
items-center
rounded-xl
border
px-4
">


<FiLock className="text-gray-400"/>



<input

type="password"

required

value={password}

onChange={(e)=>

setPassword(e.target.value)

}

placeholder="********"

className="
w-full
px-3
py-3
outline-none
"

/>



</div>


</div>








<button

type="submit"

disabled={loading}

className="
flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-green-600
py-4
font-semibold
text-white
hover:bg-green-700
disabled:bg-gray-400
"

>


<FiLogIn/>


{

loading

?

"Logging..."

:

"Login as Seller"

}



</button>






</form>







<button

onClick={()=>navigate("/seller/register")}

className="
mt-6
w-full
text-center
text-green-700
hover:underline
"

>


Create Seller Account


</button>






</div>


</div>


</MainLayout>

);


}