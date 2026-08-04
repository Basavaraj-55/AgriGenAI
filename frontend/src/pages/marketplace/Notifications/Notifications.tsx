import { useMemo, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import {
  FiBell,
  FiShoppingBag,
  FiTruck,
  FiCheckCircle,
  FiDollarSign,
  FiStar,
  FiCloud,
  FiInfo,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";


// ======================================================
// Interface
// ======================================================

interface Notification {

  id: string;

  title: string;

  message: string;

  type:
    | "order"
    | "shipping"
    | "delivery"
    | "payment"
    | "review"
    | "weather"
    | "announcement";

  time: string;

  read: boolean;
}


// ======================================================
// Component
// ======================================================

function Notifications() {


  // ======================================================
  // Initial Data
  // ======================================================

  const initialNotifications =
    useMemo<Notification[]>(() => [

      {
        id: "NOT101",
        title: "New Order Received",
        message:
          "You received a new order for Organic Tomatoes.",
        type: "order",
        time: "5 minutes ago",
        read: false,
      },


      {
        id: "NOT102",
        title: "Order Shipped",
        message:
          "Order #AGR104590 has been shipped.",
        type: "shipping",
        time: "30 minutes ago",
        read: false,
      },


      {
        id: "NOT103",
        title: "Payment Received",
        message:
          "₹350 payment has been received.",
        type: "payment",
        time: "1 hour ago",
        read: true,
      },


      {
        id: "NOT104",
        title: "New Review",
        message:
          "Customer gave 5 star rating for Tomatoes.",
        type: "review",
        time: "2 hours ago",
        read: false,
      },


      {
        id: "NOT105",
        title: "Order Delivered",
        message:
          "Order delivered successfully.",
        type: "delivery",
        time: "Yesterday",
        read: true,
      },


      {
        id: "NOT106",
        title: "Weather Alert",
        message:
          "Heavy rainfall expected tomorrow.",
        type: "weather",
        time: "Yesterday",
        read: false,
      },


      {
        id: "NOT107",
        title: "Marketplace Update",
        message:
          "New farming products available.",
        type: "announcement",
        time: "2 days ago",
        read: true,
      },

    ], []);



  const [notifications, setNotifications] =
    useState<Notification[]>(
      initialNotifications
    );

  // ======================================================
  // Statistics
  // ======================================================

  const totalNotifications =
    notifications.length;


  const unreadNotifications =
    notifications.filter(
      (item) => !item.read
    ).length;


  const readNotifications =
    notifications.filter(
      (item) => item.read
    ).length;



  // ======================================================
  // Mark Single Notification Read
  // ======================================================

  const markAsRead = (
    id: string
  ) => {

    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              read: true,
            }
          : item
      )
    );

  };



  // ======================================================
  // Mark All Notifications Read
  // ======================================================

  const markAllRead = () => {

    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );

  };



  // ======================================================
  // Delete Notification
  // ======================================================

  const deleteNotification = (
    id: string
  ) => {

    setNotifications((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );

  };



  // ======================================================
  // Clear All Notifications
  // ======================================================

  const clearAll = () => {

    setNotifications([]);

  };



  // ======================================================
  // Notification Icon
  // ======================================================

  const getNotificationIcon = (
    type: Notification["type"]
  ) => {

    switch(type) {

      case "order":

        return (
          <FiShoppingBag size={24} />
        );


      case "shipping":

        return (
          <FiTruck size={24} />
        );


      case "delivery":

        return (
          <FiCheckCircle size={24} />
        );


      case "payment":

        return (
          <FiDollarSign size={24} />
        );


      case "review":

        return (
          <FiStar size={24} />
        );


      case "weather":

        return (
          <FiCloud size={24} />
        );


      default:

        return (
          <FiInfo size={24} />
        );

    }

  };



  // ======================================================
  // JSX
  // ======================================================

  return (

    <MainLayout>

      <div className="min-h-screen bg-gray-50 py-10">

        <div className="mx-auto max-w-7xl px-6">
                    {/* ======================================================
              Header
          ====================================================== */}

          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-800">

                <FiBell className="text-green-600" />

                Notifications

              </h1>

              <p className="mt-2 text-gray-500">
                Stay updated with your marketplace activities.
              </p>

            </div>


            <div className="flex flex-wrap gap-3">

              <button
                onClick={markAllRead}
                className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
              >

                <FiCheck />

                Mark All Read

              </button>


              <button
                onClick={clearAll}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
              >

                <FiTrash2 />

                Clear All

              </button>

            </div>

          </div>



          {/* ======================================================
              Statistics Cards
          ====================================================== */}

          <div className="mb-10 grid gap-6 md:grid-cols-3">


            {/* Total Notifications */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Total Notifications
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-gray-800">
                    {totalNotifications}
                  </h2>

                </div>


                <FiBell
                  size={38}
                  className="text-blue-600"
                />

              </div>

            </div>



            {/* Unread */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Unread
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-yellow-600">
                    {unreadNotifications}
                  </h2>

                </div>


                <FiInfo
                  size={38}
                  className="text-yellow-600"
                />

              </div>

            </div>



            {/* Read */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Read
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-green-600">
                    {readNotifications}
                  </h2>

                </div>


                <FiCheckCircle
                  size={38}
                  className="text-green-600"
                />

              </div>

            </div>


          </div>



          {/* ======================================================
              Notification List
          ====================================================== */}

          <div className="space-y-6">


            {notifications.length === 0 ? (

              <div className="rounded-3xl bg-white py-20 text-center shadow-lg">

                <FiBell
                  size={70}
                  className="mx-auto text-gray-400"
                />

                <h2 className="mt-5 text-3xl font-bold text-gray-700">
                  No Notifications
                </h2>

                <p className="mt-2 text-gray-500">
                  You are all caught up!
                </p>

              </div>

            ) : (

              notifications.map((item) => (

                <div
                  key={item.id}
                  className={`rounded-3xl p-6 shadow-lg transition ${
                    item.read
                      ? "bg-white"
                      : "border-l-4 border-green-500 bg-green-50"
                  }`}
                >


                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">


                    {/* Left Content */}

                    <div className="flex gap-5">

                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">

                        {getNotificationIcon(item.type)}

                      </div>


                      <div>

                        <h2 className="text-xl font-bold text-gray-800">
                          {item.title}
                        </h2>


                        <p className="mt-2 text-gray-600">
                          {item.message}
                        </p>


                        <p className="mt-3 text-sm text-gray-400">
                          {item.time}
                        </p>


                      </div>

                    </div>
                                        {/* Right Actions */}

                    <div className="flex flex-wrap gap-3">


                      {!item.read && (

                        <button
                          onClick={() =>
                            markAsRead(item.id)
                          }
                          className="rounded-xl bg-green-600 px-5 py-2 font-semibold text-white transition hover:bg-green-700"
                        >

                          Mark as Read

                        </button>

                      )}


                      <button
                        onClick={() =>
                          deleteNotification(item.id)
                        }
                        className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
                      >

                        <FiTrash2 />

                        Delete

                      </button>


                    </div>


                  </div>


                </div>


              ))

            )}


          </div>


        </div>


      </div>


    </MainLayout>

  );

}


export default Notifications;