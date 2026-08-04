import {
  useEffect,
  useState,
} from "react";


import axios from "axios";


import MainLayout from "../../../components/layout/MainLayout";


import {
  FiSave,
  FiBell,
  FiShoppingBag,
  FiLock,
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

interface SellerSettings {


  storeName: string;


  storeDescription: string;


  category: string;


  orderNotifications: boolean;


  reviewNotifications: boolean;


  stockAlerts: boolean;


}






// ======================================================
// Categories
// ======================================================

const categories = [

  "Vegetables",

  "Fruits",

  "Grains",

  "Seeds",

  "Fertilizers",

  "Pesticides",

  "Dairy",

  "Machinery",

  "Other",

];






// ======================================================
// Component
// ======================================================

function Settings() {



  // ======================================================
  // Logged User
  // ======================================================

  const user = JSON.parse(

    localStorage.getItem("user") || "{}"

  );



  const sellerId =

    user.id || user._id || "";






  // ======================================================
  // States
  // ======================================================


  const [loading,setLoading] =

    useState(true);




  const [saving,setSaving] =

    useState(false);




  const [settings,setSettings] =

    useState<SellerSettings>({


      storeName:"",


      storeDescription:"",


      category:"Vegetables",


      orderNotifications:true,


      reviewNotifications:true,


      stockAlerts:true,


    });







// ======================================================
// Fetch Settings
// ======================================================


const fetchSettings = async()=>{


  if(!sellerId){

    setLoading(false);

    return;

  }



  try{


    const response =

      await axios.get(

        `${API_URL}/seller/settings/${sellerId}`

      );



    const data =

      response.data.settings;



    if(data){


      setSettings({


        storeName:

          data.storeName || "",



        storeDescription:

          data.storeDescription || "",



        category:

          data.category || "Vegetables",



        orderNotifications:

          data.orderNotifications ?? true,



        reviewNotifications:

          data.reviewNotifications ?? true,



        stockAlerts:

          data.stockAlerts ?? true,



      });


    }



  }catch(error){


    console.error(

      "FETCH SETTINGS ERROR:",

      error

    );


  }finally{


    setLoading(false);


  }


};






// ======================================================
// Load Settings
// ======================================================


useEffect(()=>{


  fetchSettings();


},[]);
// ======================================================
// Handle Input Change
// ======================================================

const handleChange = (

  e:
  React.ChangeEvent<
    HTMLInputElement |
    HTMLTextAreaElement |
    HTMLSelectElement
  >

) => {


  const {
    name,
    value,
  } = e.target;



  setSettings((previous)=>({


    ...previous,


    [name]: value,


  }));

};








// ======================================================
// Toggle Notification
// ======================================================

const toggleSetting = (

  key:
  "orderNotifications"
  |
  "reviewNotifications"
  |
  "stockAlerts"

) => {


  setSettings((previous)=>({


    ...previous,


    [key]:

      !previous[key],


  }));

};







// ======================================================
// Save Settings
// ======================================================

const handleSave = async()=>{


  try{


    setSaving(true);



    await axios.put(


      `${API_URL}/seller/settings/${sellerId}`,


      settings


    );



    alert(

      "✅ Settings saved successfully"

    );



  }catch(error){



    console.error(

      "SAVE SETTINGS ERROR:",

      error

    );



    alert(

      "Unable to save settings"

    );



  }finally{


    setSaving(false);


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



          <p className="mt-5 text-lg font-semibold text-gray-600">

            Loading Settings...

          </p>


        </div>


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


<div className="mx-auto max-w-6xl px-6">





{/* Header */}

<div className="mb-10">


<h1 className="text-4xl font-bold text-gray-800">

Seller Settings

</h1>



<p className="mt-2 text-gray-500">

Manage your store preferences and notifications.

</p>


</div>








<div className="space-y-8">





{/* Store Information */}

<div className="rounded-3xl bg-white p-8 shadow-lg">



<div className="mb-6 flex items-center gap-3">


<div className="rounded-full bg-green-100 p-3">


<FiShoppingBag

size={28}

className="text-green-700"

/>


</div>



<h2 className="text-2xl font-bold text-gray-800">

Store Information

</h2>



</div>
{/* Store Information Content */}


<div className="space-y-5">



{/* Store Name */}

<div>


<label className="mb-2 block font-semibold text-gray-700">

Store Name

</label>


<input

type="text"

name="storeName"

value={settings.storeName}

onChange={handleChange}

placeholder="Enter store name"

className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"

/>


</div>







{/* Description */}

<div>


<label className="mb-2 block font-semibold text-gray-700">

Store Description

</label>


<textarea

name="storeDescription"

rows={4}

value={settings.storeDescription}

onChange={handleChange}

placeholder="Describe your store"

className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"

/>


</div>







{/* Category */}

<div>


<label className="mb-2 block font-semibold text-gray-700">

Product Category

</label>


<select

name="category"

value={settings.category}

onChange={handleChange}

className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"

>


{

categories.map((item)=>(


<option

key={item}

value={item}

>

{item}

</option>


))

}


</select>


</div>



</div>


</div>









{/* Notification Settings */}


<div className="rounded-3xl bg-white p-8 shadow-lg">



<div className="mb-6 flex items-center gap-3">


<div className="rounded-full bg-blue-100 p-3">


<FiBell

size={28}

className="text-blue-600"

/>


</div>



<h2 className="text-2xl font-bold text-gray-800">

Notifications

</h2>



</div>






<div className="space-y-4">





{/* Notification Component */}

{


[

{

key:"orderNotifications",

title:"New Order Alerts",

desc:"Receive notification when customer places an order."

},


{

key:"reviewNotifications",

title:"Customer Reviews",

desc:"Get alerts when customers review products."

},


{

key:"stockAlerts",

title:"Low Stock Alerts",

desc:"Receive alerts when product quantity is low."

}


].map((item:any)=>(



<div

key={item.key}

className="flex items-center justify-between rounded-xl bg-gray-50 p-5"

>



<div>


<h3 className="font-semibold text-gray-800">

{item.title}

</h3>


<p className="text-sm text-gray-500">

{item.desc}

</p>


</div>





<button

onClick={()=>toggleSetting(item.key)}

className={`h-7 w-14 rounded-full transition ${
settings[item.key as keyof SellerSettings]
?
"bg-green-600"
:
"bg-gray-300"
}`}

>


<div

className={`h-5 w-5 rounded-full bg-white transition ${
settings[item.key as keyof SellerSettings]
?
"translate-x-8"
:
"translate-x-1"
}`}

/>


</button>



</div>


))

}



</div>


</div>









{/* Security */}


<div className="rounded-3xl bg-white p-8 shadow-lg">



<div className="mb-5 flex items-center gap-3">


<div className="rounded-full bg-red-100 p-3">


<FiLock

size={28}

className="text-red-600"

/>


</div>



<h2 className="text-2xl font-bold text-gray-800">

Security

</h2>



</div>





<button

className="rounded-xl border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-100"

>


Change Password


</button>



</div>








{/* Save Button */}


<div className="flex justify-end">


<button

onClick={handleSave}

disabled={saving}

className="flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 disabled:opacity-50"

>


<FiSave />


{

saving

?

"Saving..."

:

"Save Settings"

}



</button>


</div>








</div>


</div>


</div>


</MainLayout>


);


}


export default Settings;