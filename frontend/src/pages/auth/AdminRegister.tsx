import { useState } from "react";
import axios from "axios";

const AdminRegister = () => {

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        password: "",

        admin_secret: ""

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await axios.post(

                "http://localhost:5000/api/auth/admin/register",

                formData

            );

            alert(response.data.message);

            setFormData({

                name: "",

                email: "",

                password: "",

                admin_secret: ""

            });

        } catch (error: any) {

            alert(

                error.response?.data?.message ||

                "Registration failed"

            );

        }

        setLoading(false);

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-green-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">

                    Admin Registration

                </h1>

                <form onSubmit={handleSubmit}>

                    <input

                        type="text"

                        name="name"

                        placeholder="Full Name"

                        value={formData.name}

                        onChange={handleChange}

                        className="w-full border p-3 rounded mb-4"

                    />

                    <input

                        type="email"

                        name="email"

                        placeholder="Email"

                        value={formData.email}

                        onChange={handleChange}

                        className="w-full border p-3 rounded mb-4"

                    />

                    <input

                        type="password"

                        name="password"

                        placeholder="Password"

                        value={formData.password}

                        onChange={handleChange}

                        className="w-full border p-3 rounded mb-4"

                    />

                    <input

                        type="password"

                        name="admin_secret"

                        placeholder="Admin Secret"

                        value={formData.admin_secret}

                        onChange={handleChange}

                        className="w-full border p-3 rounded mb-6"

                    />

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"

                    >

                        {loading

                            ? "Creating..."

                            : "Create Admin"}

                    </button>

                </form>

            </div>

        </div>

    );

};

export default AdminRegister;