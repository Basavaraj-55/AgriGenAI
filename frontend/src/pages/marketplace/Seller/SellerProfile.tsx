import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import MainLayout from "../../../components/layout/MainLayout";

import {
  FiUser,
  FiMail,
  FiPhone,

  FiEdit,
  FiSave,
  FiCamera,
  FiPackage,
  FiStar,
} from "react-icons/fi";



// ================= API =================

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:5000/api";




// ================= Interface =================

interface SellerProfile {

  _id:string;

  name:string;

  email:string;

  phone:string;

  address:string;

  city:string;

  state:string;

  pincode:string;

  profileImage:string;

  rating:number;

  totalProducts:number;

}



// ================= Component =================


export default function SellerProfile(){



// ================= Seller Session =================


const sellerData =
JSON.parse(

localStorage.getItem("seller") || "{}"

);



const sellerId =
sellerData._id || "";





// ================= States =================


const [loading,setLoading] =
useState(true);


const [saving,setSaving] =
useState(false);


const [editing,setEditing] =
useState(false);





const [seller,setSeller] =
useState<SellerProfile>({

_id:sellerId,

name:"",

email:"",

phone:"",

address:"",

city:"",

state:"",

pincode:"",

profileImage:"",

rating:0,

totalProducts:0

});





// ================= Get Profile =================


const getProfile = async()=>{


try{


const response =
await axios.get(

`${API_URL}/seller/${sellerId}`

);



const data =
response.data.seller;



setSeller({

_id:data._id,

name:data.name || "",

email:data.email || "",

phone:data.phone || "",

address:data.address || "",

city:data.city || "",

state:data.state || "",

pincode:data.pincode || "",

profileImage:data.profileImage || "",

rating:data.rating || 0,

totalProducts:data.totalProducts || 0

});



}
catch(error){


console.log(
"PROFILE ERROR",
error
);


}
finally{


setLoading(false);


}



};




useEffect(()=>{

if(sellerId){

getProfile();

}
else{

setLoading(false);

}

},[]);
// ================= Handle Input =================


const handleChange = (

e:
React.ChangeEvent<
HTMLInputElement |
HTMLTextAreaElement
>

)=>{


const {
name,
value

}=e.target;



setSeller((prev)=>({

...prev,

[name]:value

}));



};






// ================= Update Profile =================


const handleSave = async()=>{


try{


setSaving(true);



const response =
await axios.put(

`${API_URL}/seller/${sellerId}`,

{

name:seller.name,

email:seller.email,

phone:seller.phone,

address:seller.address,

city:seller.city,

state:seller.state,

pincode:seller.pincode

}

);





if(response.data.success){


alert(
"Profile Updated Successfully"
);



setEditing(false);



}

else{


alert(

response.data.message ||

"Update failed"

);


}



}

catch(error:any){


console.log(

"UPDATE PROFILE ERROR",

error.response?.data

);



alert(

"Unable to update profile"

);



}

finally{


setSaving(false);


}



};








// ================= Image Preview =================


const handleImageChange = (

e:
React.ChangeEvent<HTMLInputElement>

)=>{


const file =
e.target.files?.[0];



if(!file)

return;




const imageUrl =
URL.createObjectURL(file);



setSeller((prev)=>({

...prev,

profileImage:imageUrl

}));



};







// ================= Loading =================


if(loading){


return (

<MainLayout>


<div className="
flex
min-h-screen
items-center
justify-center
">


<div className="text-center">


<div className="
mx-auto
h-12
w-12
animate-spin
rounded-full
border-4
border-green-600
border-t-transparent
">
</div>



<p className="
mt-4
text-gray-600
">

Loading Seller Profile...

</p>


</div>


</div>


</MainLayout>

);


}
// ================= JSX =================


return (

<MainLayout>


<div className="
min-h-screen
bg-gray-50
p-6
">


<div className="
mx-auto
max-w-5xl
">





{/* Header */}


<div className="
mb-8
flex
flex-col
justify-between
gap-5
md:flex-row
md:items-center
">


<div>


<h1 className="
text-4xl
font-bold
text-gray-800
">

Seller Profile

</h1>



<p className="
mt-2
text-gray-500
">

Manage your store information

</p>



</div>







{

editing ? (


<button

onClick={handleSave}

disabled={saving}

className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-green-600
px-6
py-3
font-semibold
text-white
hover:bg-green-700
"

>


<FiSave/>


{

saving

?

"Saving..."

:

"Save Profile"

}


</button>


)

:

(


<button

onClick={()=>setEditing(true)}

className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-blue-600
px-6
py-3
font-semibold
text-white
hover:bg-blue-700
"

>


<FiEdit/>


Edit Profile


</button>


)


}



</div>









{/* Profile Card */}


<div className="
rounded-3xl
bg-white
p-8
shadow-xl
">



<div className="
flex
flex-col
items-center
gap-6
md:flex-row
">







{/* Profile Image */}


<div className="
relative
">


<div className="
flex
h-32
w-32
items-center
justify-center
overflow-hidden
rounded-full
bg-green-100
">


{

seller.profileImage

?

<img

src={seller.profileImage}

alt="Seller"

className="
h-full
w-full
object-cover
"

/>


:

<FiUser

size={55}

className="text-green-700"

/>


}



</div>








{

editing && (


<label className="
absolute
bottom-0
right-0
flex
h-10
w-10
cursor-pointer
items-center
justify-center
rounded-full
bg-green-600
text-white
">


<FiCamera/>


<input

type="file"

accept="image/*"

onChange={handleImageChange}

className="hidden"

/>


</label>


)

}



</div>









{/* Seller Info */}


<div>


<h2 className="
text-3xl
font-bold
text-gray-800
">


{

seller.name ||

"Seller Name"

}


</h2>





<p className="
mt-2
flex
items-center
gap-2
text-gray-500
">


<FiMail/>


{

seller.email ||

"Email"

}


</p>







<div className="
mt-5
flex
gap-4
">



<div className="
flex
items-center
gap-2
rounded-xl
bg-yellow-50
px-4
py-2
">


<FiStar

className="text-yellow-500"

/>


<span className="font-semibold">

{seller.rating}

</span>


</div>







<div className="
flex
items-center
gap-2
rounded-xl
bg-green-50
px-4
py-2
">


<FiPackage

className="text-green-600"

/>


<span className="font-semibold">

{seller.totalProducts}

Products

</span>


</div>



</div>



</div>







</div>


</div>
// ================= Profile Form =================


<div className="
mt-8
rounded-3xl
bg-white
p-8
shadow-xl
">


<h2 className="
mb-6
text-2xl
font-bold
text-gray-800
">

Profile Information

</h2>





<div className="
grid
gap-6
md:grid-cols-2
">





{/* Name */}

<div>


<label className="
mb-2
block
font-semibold
text-gray-700
">

Full Name

</label>



<input

name="name"

value={seller.name}

onChange={handleChange}

disabled={!editing}

className="
w-full
rounded-xl
border
p-3
disabled:bg-gray-100
"

/>


</div>








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



<input

name="email"

type="email"

value={seller.email}

onChange={handleChange}

disabled={!editing}

className="
w-full
rounded-xl
border
p-3
disabled:bg-gray-100
"

/>


</div>








{/* Phone */}

<div>


<label className="
mb-2
block
font-semibold
text-gray-700
">

Phone Number

</label>



<input

name="phone"

value={seller.phone}

onChange={handleChange}

disabled={!editing}

placeholder="Enter phone number"

className="
w-full
rounded-xl
border
p-3
disabled:bg-gray-100
"

/>


</div>








{/* City */}

<div>


<label className="
mb-2
block
font-semibold
text-gray-700
">

City

</label>



<input

name="city"

value={seller.city}

onChange={handleChange}

disabled={!editing}

placeholder="Enter city"

className="
w-full
rounded-xl
border
p-3
disabled:bg-gray-100
"

/>


</div>








{/* State */}

<div>


<label className="
mb-2
block
font-semibold
text-gray-700
">

State

</label>



<input

name="state"

value={seller.state}

onChange={handleChange}

disabled={!editing}

placeholder="Enter state"

className="
w-full
rounded-xl
border
p-3
disabled:bg-gray-100
"

/>


</div>








{/* Pincode */}

<div>


<label className="
mb-2
block
font-semibold
text-gray-700
">

Pincode

</label>



<input

name="pincode"

value={seller.pincode}

onChange={handleChange}

disabled={!editing}

placeholder="Enter pincode"

className="
w-full
rounded-xl
border
p-3
disabled:bg-gray-100
"

/>


</div>



</div>









{/* Address */}


<div className="mt-6">


<label className="
mb-2
block
font-semibold
text-gray-700
">

Address

</label>



<textarea


name="address"


value={seller.address}


onChange={handleChange}


disabled={!editing}


rows={4}


placeholder="Enter full address"


className="
w-full
rounded-xl
border
p-3
disabled:bg-gray-100
"


/>



</div>



</div>








</div>


</div>


</MainLayout>


);


}