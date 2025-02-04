import React, { useState, useEffect, useCallback } from 'react';
import { IoBuildSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { BsBrush } from "react-icons/bs";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { CiCirclePlus, CiShare2 } from "react-icons/ci";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { PiCursorClickBold } from "react-icons/pi";
import { FaTrash, FaSave } from "react-icons/fa";
import First from "./Form_Components/Form Pages/First.jsx";
import Integrate from "./Form_Components/Form Sections/Integrate.jsx";
import StickyTag from "./Form_Components/StickyTag.jsx";
import Modal from "./Modal.jsx";
import BlockSelector from "./section/BlockSelector.jsx";
import DesignSection from "./Form_Components/Form Sections/DesignSection.jsx";
import Contact from "./Form_Components/Form Pages/Contact.jsx";
import Settings from "./Form_Components/Form Sections/Settings.jsx";
import Share from "./Form_Components/Form Sections/Share.jsx";
import Results from "./Form_Components/Form Sections/Results.jsx";
import useFormPageStore from "../app/FormPageStore.js";
import ShortText from "./Form_Components/Form Pages/ShortText.jsx";
import LongText from "./Form_Components/Form Pages/LongText.jsx";
import PhoneNumber from "./Form_Components/Form Pages/PhoneNumber.jsx";
import Statement from "./Form_Components/Form Pages/Statement.jsx";
import SingleOpt from "./Form_Components/Form Pages/SingleOpt.jsx";
import DropdownLst from "./Form_Components/Form Pages/DropdownLst.jsx";
import Date from "./Form_Components/Form Pages/Date.jsx";
import Schedule from "./Form_Components/Form Pages/Schedule.jsx";
import StarRating from "./Form_Components/Form Pages/StarRating.jsx";
import OpinionScale from "./Form_Components/Form Pages/OpinionScale.jsx";
import Website from "./Form_Components/Form Pages/Website.jsx";
import Signature from "./Form_Components/Form Pages/Signature.jsx";
import FileUpload from "./Form_Components/Form Pages/FileUpload.jsx";
import ThankYou from "./Form_Components/Form Pages/ThankYou.jsx";
import MultiOpt from "./Form_Components/Form Pages/MultiOpt.jsx";
import useFormStore from "../app/FormStore.js";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const MemoizedDashLink = React.memo(({ lnk, setSection, icncl }) => (
    <button
        onClick={() => setSection(lnk.txt.toLowerCase())}
        className={"flex flex-col text-sm rounded-md p-2 items-center justify-center hover:bg-blue-100"}
        style={{ color: icncl }}
    >
        {lnk.icn}
        <p className={'text-black'}>{lnk.txt}</p>
    </button>
));

const FormBuilder = () => {
    const { formId } = useParams();
    const { forms, updateForm, removeForm } = useFormStore();
    const removeFormPage = useFormStore((state) => state.removeFormPage);
    const [currentSection, setSection] = useState("build");
    const pages = useFormPageStore((state) => state.formPages) || [];
    const [currentPage, setCurrentPage] = useState(null);
    const [currentPageData, setCurrentPageData] = useState(null);
    const [items, setItems] = useState(pages.map(page => ({ id: page.id, text: page.name, cl: page.cl })));
    const [isPublished, setIsPublished] = useState(false);
    const [currentForm, setCurrentForm] = useState(null);
    const [publishableLink, setPublishableLink] = useState(null);
    const [isBlockSelectorOpen, setIsBlockSelectorOpen] = useState(false);
    const navigate = useNavigate();

    // const location = useLocation();
    // const formData = location.state?.formData;
    // console.log("Received form data:", formData);
    useEffect(() => {
        setItems(pages.map(page => ({ id: page.id, text: page.name, cl: page.cl })));
    }, [pages]);

    useEffect(() => {
        checkFormStatus();
        const form = forms.find(f => f.formId === formId);
        setCurrentForm(form);
    }, [formId, forms]);

    const checkFormStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found in localStorage");
                return;
            }

            const response = await axios.get(`https://striform-backend-1.onrender.com/api/forms/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                const allForms = response.data;
                const currentForm = allForms.find(form => form._id === formId);

                if (currentForm) {
                    setIsPublished(true);
                    const updatedForm = { ...forms.find(f => f.formId === formId), isLocal: false };
                    updateForm(updatedForm);
                } else {
                    setIsPublished(false);
                }
            }
        } catch (error) {
            console.error("Error checking form status:", error);
            setIsPublished(false);
        }
    };

    const handleNavigateToPublishedForm = () => {
        window.open(publishableLink, '_blank');
    };

    const dashLinks = [
        { txt: "Build", icn: <IoBuildSharp />, icn_color: "blue" },
        { txt: "Design", icn: <BsBrush />, icn_color: "purple" },
        { txt: "Integrate", icn: <VscSettings />, icn_color: "purple" },
        { txt: "Settings", icn: <IoMdSettings />, icn_color: "orange" },
        { txt: "Share", icn: <CiShare2 />, icn_color: "red" },
        { txt: "Results", icn: <HiOutlinePresentationChartLine />, icn_color: "green" }
    ];

    const renderSection = () => {
        switch (currentSection) {
            case 'build':
                return (
                    <div className="flex h-full">
                        <div className="w-[18vw] bg-gray-100 p-4 overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-gray-400">Blocks</p>
                                <CiCirclePlus className="cursor-pointer" onClick={handleAddBlock} />
                            </div>
                            {currentForm && currentForm.pages.map((page) => (
                                <div key={page.pageId} className="flex items-center justify-between w-full p-2 mb-2 bg-white rounded-md shadow-sm hover:bg-blue-100 transition-colors">
                                    <button
                                        onClick={() => handlePageClick(page.pageId)}
                                        className={`text-left flex-grow ${currentPage === page.pageId ? 'font-bold' : ''}`}
                                    >
                                        {page.pageName}
                                    </button>
                                    <button
                                        onClick={() => handleDeletePage(page.pageId)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="w-[59vw] p-6 flex items-center justify-center">
                            <div className="select-none p-8 flex items-center justify-center w-full h-[80%] bg-white border-2 border-dotted border-black/50 rounded-lg"
                                 style={{
                                     backgroundColor: currentForm?.design?.backgroundColor || '#ffffff',
                                 }}>
                                {renderCurrentPage()}
                            </div>
                        </div>
                    </div>
                );
            case 'design':
                return <DesignSection />;
            case 'integrate':
                return <Integrate />;
            case 'settings':
                return <Settings />;
            case 'share':
                return <Share />;
            case 'results':
                return <Results />;
            default:
                return <p>Unknown section</p>;
        }
    };

    const renderCurrentPage = useCallback(() => {
        console.log("Rendering current page. currentPage:", currentPage, "currentPageData:", currentPageData);
        if (!currentPageData) return <p className={"font-semibold text-3xl"}>Please choose a block</p>;

        switch (currentPageData.pageName) {
            case 'Contact': return <Contact key={currentPageData.pageId} pageData={currentPageData} />;
            case 'Short Text': return <ShortText key={currentPageData.pageId} pageData={currentPageData} />;
            case 'Long Text': return <LongText key={currentPageData.pageId} pageData={currentPageData} />;
            case 'Phone Number': return <PhoneNumber key={currentPageData.pageId} pageData={currentPageData} />;
            case 'Statement': return <Statement key={currentPageData.pageId} pageData={currentPageData} />;
            case 'Single Select Option': return <SingleOpt key={currentPageData.pageId} pageData={currentPageData} />;
            case 'Dropdown List': return <DropdownLst key={currentPageData.pageId} pageData={currentPageData} />;
            case 'Date': return <Date key={currentPageData.pageId} pageData={currentPageData} />;
            case 'Scheduler': return <Schedule key={currentPageData.pageId} pageData={currentPageData} />;
            case 'Star Rating': return <StarRating key={currentPageData.pageId} pageData={currentPageData} />;
            case 'Opinion Scale': return <OpinionScale key={currentPageData.pageId} pageData={currentPageData} />;
            case 'Signature': return <Signature key={currentPageData.pageId} pageData={currentPageData} />;
            case 'File Upload': return <FileUpload key={currentPageData.pageId} pageData={currentPageData} />;
            case 'Hello': return <First key={currentPageData.pageId} pageData={currentPageData} />;
            case 'Website': return <Website key={currentPageData.pageId} pageData={currentPageData} />;
            case 'Thank You': return <ThankYou key={currentPageData.pageId} pageData={currentPageData} />;
            default: return <p className={"font-semibold text-3xl"}>Unknown block type</p>;
        }
    }, [currentPageData]);

    const handlePageClick = useCallback((pageId) => {
        console.log("Attempting to change page to:", pageId);
        if (currentPage !== pageId) {
            setCurrentPage(pageId);
            const pageData = currentForm.pages.find(p => p.pageId === pageId);
            setCurrentPageData(pageData);
            console.log("Page changed. New page data:", pageData);
        }
    }, [currentPage, currentForm]);

    const handlePublishOrSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found");
                return;
            }
            if (!currentForm) {
                console.error("No form data available");
                return;
            }
            const formData = {
                formName: currentForm.formName,
                pages: currentForm.pages,
                metadata: currentForm.metadata || { tags: [] },
                design: currentForm.design
            };
            console.log("Form data to be saved or updated:", formData);
            let response;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            if (currentForm._id) {
                console.log("Updating existing form");
                response = await axios.put(`https://striform-backend-1.onrender.com/api/forms/${currentForm._id}`, formData, config);
            } else {
                console.log("Creating new form");
                response = await axios.post('https://striform-backend-1.onrender.com/api/forms/submit', formData, config);
            }
            console.log("Before creating publishable link Response:", response);
            if (response && response.data) {
                console.log("Form saved or updated successfully");
                const savedForm = response.data;
                const publishableLink = `http://localhost:5173/striform/form/${savedForm._id}`;
                const updatedForm = { ...savedForm, publishableLink, isLocal: false };

                const updateLinkResponse = await axios.put(`https://striform-backend-1.onrender.com/api/forms/${savedForm._id}`, updatedForm, config);
                if (updateLinkResponse && updateLinkResponse.data) {
                    console.log("Publishable link updated successfully");
                    setCurrentForm(updatedForm);
                    updateForm(updatedForm);
                    setIsPublished(true);
                    setPublishableLink(publishableLink);

                    // Remove the unpublished version if it exists
                    if (currentForm.isLocal) {
                        removeForm(currentForm.formId);
                    }

                    alert(`Form saved and published successfully! Publishable link: ${publishableLink}`);
                } else {
                    console.error("Failed to update publishable link");
                    alert("Form saved successfully, but there was an issue generating the publishable link.");
                }
            } else {
                console.error("Unexpected response status:", response ? response.status : "No response");
            }
        } catch (error) {
            console.error("Error saving or updating form:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
        }
    };

    const handleDeletePage = (pageId) => {
        if (currentForm && currentForm.pages.length > 1) {
            removeFormPage(formId, pageId);
            console.log(`Page ${pageId} deleted from form ${formId}`);
        } else {
            alert("You cannot delete the last page of the form.");
        }
    };

    const handleAddBlock = () => {
        setIsBlockSelectorOpen(true);
    };

    const handleCloseBlockSelector = () => {
        setIsBlockSelectorOpen(false);
    };

    return (
        <div className="w-screen h-screen font-inter overflow-hidden">
            {/* Large Screen View */}
            <div className="hidden lg:flex flex-col h-full">
                <header className="flex p-1 items-center justify-evenly text-[10px]">
                    <h4 className="font-semibold text-[2vw]">{currentForm ? currentForm.formName : "My Form"}</h4>
                    <div className="bg-gray-100/50 flex w-max p-2 rounded-lg text-[2px]">
                        {dashLinks.map((lnk, index) => (
                            <div
                                className={`${lnk.txt.toLowerCase() === currentSection && "bg-white rounded-md text-[2px]"}`}
                                key={index}>
                                <MemoizedDashLink lnk={lnk} setSection={setSection} icncl={lnk.icn_color} />
                            </div>
                        ))}
                    </div>
                    <div className="space-x-4 flex">
                        <button 
                            className="rounded-md bg-black text-white text-sm border font-bold p-2 px-3"
                            onClick={handleNavigateToPublishedForm}
                            title={isPublished ? "View published form" : "Form not published yet"}
                        >
                            <HiOutlineArrowTopRightOnSquare />
                        </button>
                        <button
                            onClick={handlePublishOrSave}
                            className="rounded-md bg-black text-white text-sm border p-2 flex items-center justify-center gap-3 px-4"
                        >
                            {isPublished ? "Save" : "Publish"}
                        </button>
                    </div>
                </header>
                <hr />
                <div className="flex-grow overflow-hidden">
                    {renderSection()}
                </div>
            </div>

            {/* Small Screen View */}
            <div className="lg:hidden h-screen w-screen flex items-center justify-center text-center bg-gray-100">
                <h1 className="text-xl font-bold text-gray-600">Please open the site on a large screen</h1>
            </div>

            {/* Modal for BlockSelector */}
            <Modal
                isOpen={isBlockSelectorOpen}
                onClose={handleCloseBlockSelector}
                content={<BlockSelector onClose={handleCloseBlockSelector} />}
            />
        </div>
    );
};

export default FormBuilder;