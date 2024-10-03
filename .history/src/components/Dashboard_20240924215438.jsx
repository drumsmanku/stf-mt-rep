import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaRegUserCircle, FaTimes } from 'react-icons/fa';
import Modal from './Modal.jsx';
import BuyPro from './BuyPro.jsx';
import CreateFormModal from './Form_Components/CreateFormModal.jsx';
import useFormStore from "../app/FormStore.js";
import { IoTrash } from "react-icons/io5";
import axios from 'axios';

const Dashboard = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [userInitials, setUserInitials] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [allForms, setAllForms] = useState(null);
    const navigate = useNavigate();

    const { forms, setForms, addForms, removeForm, updateForm } = useFormStore();

    const [isLoading, setIsLoading] = useState(true);
    const [isCreateFormModalOpen, setIsCreateFormModalOpen] = useState(false);
    const [isBuyProModalOpen, setIsBuyProModalOpen] = useState(false);

    useEffect(() => {
        checkTokenExpiration();
        fetchForms();
        const intervalId = setInterval(checkTokenExpiration, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const handleLogOut = () => {
        const token = localStorage.getItem("token");
        const tkExpiry = localStorage.getItem("tokenExpiration");

        if(token && tkExpiry) {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
            navigate("/")
        }
    }

    const fetchForms = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }

            const response = await axios.get('http://localhost:4000/api/forms', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data)
            const serverForms = Array.isArray(response.data) ? response.data : [];
            const localForms = forms.filter(form => form.isLocal);
            setForms([...serverForms, ...localForms]);
            setAllForms([...serverForms, ...localForms]);
        } catch (error) {
            console.error("Error fetching forms:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const checkTokenExpiration = () => {
        const token = localStorage.getItem("token");
        const tokenExpiration = localStorage.getItem("tokenExpiration");

        if (!token || !tokenExpiration) {
            setIsLoggedIn(false);
            navigate("/log-in");
            return;
        }

        const currentTime = new Date().getTime();
        if (currentTime > parseInt(tokenExpiration)) {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
            setIsLoggedIn(false);
            navigate("/log-in");
        } else {
            setIsLoggedIn(true);
        }
    };

    useEffect(() => {
        checkTokenExpiration();

        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.name) {
            const nameParts = user.name.split(' ');
            const initials = nameParts.map(part => part.charAt(0)).join('').toUpperCase();
            setUserInitials(initials);
        }
    }, []);

    const handleNavigation = () => {
        setIsCreateFormModalOpen(true);
    };

    const handleDelete = async (form, e) => {
        e.stopPropagation();
        try {
            if (form.isLocal) {
                removeForm(form.formId);
                console.log('Local form deleted successfully, ID:', form.formId);
            } else {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found");
                    return;
                }

                const response = await axios.delete(`http://localhost:4000/api/forms/${form._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);

                if (response.status === 200) {
                    removeForm(form.formId);
                    console.log('Form deleted successfully from database and store, ID:', form._id);
                } else {
                    console.error('Failed to delete form, unexpected status:', response.status);
                }
            }
            setAllForms(prevForms => prevForms.filter(f => f.formId !== form.formId));
        } catch (error) {
            console.error('Error deleting form:', error);
            if (error.response && error.response.status === 404) {
                removeForm(form.formId);
                setAllForms(prevForms => prevForms.filter(f => f.formId !== form.formId));
                console.log('Form not found on server, removed from local store, ID:', form.formId);
            }
        }
    };

    const handleFormClick = async (formId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found in localStorage");
                return;
            }

            // Find the form using formId
            const form = allForms.find(f => f.formId === formId);
            if (!form) {
                console.error("Form not found");
                return;
            }

            let formData;
            if (!form.isLocal) {
                const response = await axios.get(`http://localhost:4000/api/forms/${form._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    formData = response.data;
                } else {
                    console.error("Unexpected response status:", response.status);
                    return;
                }
            } else {
                formData = form;
            }
            updateForm(formData);
            navigate(`/form-builder/${formId}`);
        } catch (error) {
            console.error("Error fetching form data:", error);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-xl font-semibold mb-4">Please log in or register first</h1>
                <Link to="/log-in" className="text-blue-600 hover:underline">Log in</Link>
                <p className="my-2">or</p>
                <Link to="/sign-up" className="text-blue-600 hover:underline">Register</Link>
                <button
                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
                    onClick={() => navigate("/")}
                >
                    Go to Home
                </button>
            </div>
        );
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const userForms = forms.filter(form => form.userId === (user ? user.id : null));

    return (
        <div id={"main-wrapper"} className={"bg-gray-50 w-screen h-[97.8vh] overflow-y-scroll"}>
            <header className={`p-4 px-6 flex md:flex-row flex-col items-center justify-between bg-white`}>
                <div className="flex md:hidden justify-between w-full items-center">
                    <img src={"/logo.png"} className={"w-[30vw] md:w-[11vw]"} alt="Logo" />
                    <button
                        className="p-4"
                        onClick={() => setNavOpen(!navOpen)}
                    >
                        <div className={`h-0.5 w-6 bg-black mb-1 ${navOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
                        <div className={`h-0.5 w-6 bg-black mb-1 ${navOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`h-0.5 w-6 bg-black ${navOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
                    </button>
                </div>

                <div id={"left-header"} className={"hidden font-semibold text-gray-800 md:flex md:flex-row flex-col items-center justify-center gap-6"}>
                    <img src={"/logo.png"} className={"w-[40vw] md:w-[11vw]"} alt="Logo" />
                    <Link to={"/dashboard"} className={"cursor-pointer"}>Dashboard</Link>
                    <p className={"cursor-pointer text-gray-300"}>Team</p>
                </div>

                <div id={"right-header"} className={"hidden md:flex md:flex-row flex-col items-center justify-center gap-3"}>
                    <button 
                        onClick={() => setIsBuyProModalOpen(true)} 
                        className={`px-6 p-2 shadow-[3px_4px_0px_0px_#000000] hover:shadow-[3px_4px_0px_2px_#000000] rounded-md border-2 border-black bg-orange-400`}
                    >
                        Buy Pro
                    </button>
                    <button onClick={handleLogOut} className={"p-2 rounded-md px-4 bg-blue-400 text-white font-semibold hover:bg-blue-500 shadow-md"}>Log Out</button>
                </div>
            </header>

            <nav className={`md:hidden fixed top-0 left-0 w-full bg-white shadow-lg ${navOpen ? 'block' : 'hidden'}`}>
                <div className="flex justify-between p-4 items-center">
                    <img src={"/logo.png"} className={"w-[30vw]"} alt="Logo" />
                    <button
                        className="p-4"
                        onClick={() => setNavOpen(false)}
                    >
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="p-4">
                    <Link to={"/dashbaord"} className={"block py-2 text-gray-800"}>Dashboard</Link>
                    <p className={"block py-2 text-gray-800"}>Team</p>
                    <button className={"block py-2 text-gray-800"} onClick={handleNavigation}>New Form</button>
                    <div className="flex items-center mt-4">
                        {userInitials ? (
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-white rounded-full font-semibold text-sm mr-4">
                                {userInitials}
                            </div>
                        ) : (
                            <FaRegUserCircle size={30} className="mr-4" />
                        )}
                        <button 
                            onClick={() => setIsBuyProModalOpen(true)} 
                            className={`px-6 p-2 shadow-[3px_4px_0px_0px_#000000] hover:shadow-[3px_4px_0px_2px_#000000] rounded-md border-2 border-black bg-orange-400`}
                        >
                            Buy Pro
                        </button>
                    </div>
                </div>
            </nav>

            <hr />

            <div id={"main-content"} className={"p-6 w-screen h-full"}>
                <div className={"font-semibold flex p-4 items-center justify-between"}>
                    <h4 className={"text-xl"}>Your Forms</h4>
                    <button onClick={handleNavigation} className={"text-sm rounded-md bg-black/80 text-white p-3 px-6 flex items-center justify-between gap-2"}>
                        <span className={"text-sm"}>New Form</span>
                        <FaPlus />
                    </button>
                </div>

                <div>
                    {allForms && allForms.length > 0 ? (
                        <div className={"flex gap-4 items-center justify-start font-inter flex-wrap"}>
                            {allForms.map((form) => (
                                <div
                                    className={"relative border border-black rounded-sm border-dashed w-[30vw] h-[30vh] bg-white flex items-center justify-center flex-col"}
                                    key={form.formId}
                                >
                                    <div
                                        className={"absolute inset top-4 right-4 hover:text-red-500 cursor-pointer"}
                                        onClick={(e) => handleDelete(form, e)}
                                    >
                                        <IoTrash />
                                    </div>
                                    <Link to="#" onClick={() => handleFormClick(form.formId)} className={"flex items-center justify-center h-full w-full"}>
                                        <p className={"font-semibold text-3xl"}>{form.formName}</p>
                                    </Link>
                                    {form.isLocal && (
                                        <div className={"absolute bottom-2 right-2 bg-yellow-200 text-xs px-2 py-1 rounded"}>
                                            UnPublished
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={"bg-white w-full h-1/4 p-10 text-center rounded-lg text-sm font-semibold"}>
                            <p>No forms created yet. <button onClick={handleNavigation} className={"text-blue-600 cursor-pointer"}>Create one now</button></p>
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isCreateFormModalOpen}
                onClose={() => setIsCreateFormModalOpen(false)}
                content={<CreateFormModal onClose={() => setIsCreateFormModalOpen(false)} />}
            />

            <Modal
                isOpen={isBuyProModalOpen}
                onClose={() => setIsBuyProModalOpen(false)}
                content={<BuyPro />}
            />
        </div>
    );
}

export default Dashboard;
