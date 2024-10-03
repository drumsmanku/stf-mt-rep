import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import useFormStore from "../../../app/FormStore.js";
import First from "../Form Pages/First.jsx";
import Contact from "../Form Pages/Contact.jsx";

const Build = () => {
    const { formId } = useParams();
    const addPageToForm = useFormStore((state) => state.addPageToForm);
    const forms = useFormStore((state) => state.forms);

    const currentForm = forms.find((form) => form.formID === formId);
    const [pages, setPages] = useState(currentForm ? currentForm.pages : []);
    const [selectedPage, setSelectedPage] = useState(null);  // Track the selected page
    const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state

    useEffect(() => {
        console.log('Form ID:', formId);
        console.log('Current Form Pages:', pages);
    }, [formId, pages]);

    const availablePages = [
        {
            pageName: "Hello",
            componentsMetaData: {
                components: ["title", "button"],
                title: {
                    val: "Hi there !",
                    description: "Mind filling this form",
                },
                button: {
                    val: "Let's Start"
                },
            },
        },
        {
            pageName: "contact",
            componentsMetaData: {
                components: ["question", "input", "input", "input", "input", "input", "button"],
                question: {
                    val : "Please fill the followind",
                    description: "",
                },
                input : [
                    {
                        type: "text",
                        label: "First Name",
                        placeholder: "Jhon",
                        minVal: 0,
                        maxVal: 30
                    },
                    {
                        type: "text",
                        label: "Last Name",
                        placeholder: "Doe",
                        minVal: 0,
                        maxVal: 30
                    },
                    {
                        type: "email",
                        label: "Email",
                        placeholder: "john@example.com",
                        minVal: 0,
                        maxVal: 30
                    },
                    {
                        type: "text",
                        label: "Phone Number",
                        placeholder: "081234567",
                        minVal: 0,
                        maxVal: 30
                    },
                    {
                        type: "text",
                        label: "Company",
                        placeholder: "Acme Inc",
                        minVal: 0,
                        maxVal: 30
                    },
                ],
                button : {
                    val: "Next"
                },
            },
        },
        {
            pageName: "Short Text",
            componentsMetaData: {
                components: ["question", "input", "button"],
                question: {
                    val: "Your question here",
                    description: "",
                },
                input: [
                    {
                        type: "text",
                        label: "",
                        placeholder: "Your answer here...",
                        minVal: 0,
                        maxVal: 30,
                    },
                ],
                button: {
                    val: "Next"
                },
            },
        },
        {
            pageName: "Long Text",
            componentsMetaData: {
                components: ["question", "textBox", "button"],
                question: {
                    val: "Your question here",
                    description: "",
                },
                textBox: {
                    maxVal: 30,
                    size: "small",
                },
                button: {
                    val: "Next"
                },
            },
        },
        {
            pageName: "Phone Number",
            componentsMetaData: {
                components: ["question", "input", "button"],
                question: {
                    val: "Please enter your phone number",
                    description: "",
                },
                input: [
                    {
                        type: "text",
                        label: "",
                        placeholder: "0812345679",
                        minVal: 10,
                        maxVal: 10
                    }
                ],
                button: {
                    val: "Next",
                },
            }
        },
        {
            pageName: "Statement",
            componentsMetaData: {
                components: ["title", "button"],
                title: {
                    val: "Your title here...",
                    description: ""
                },
                button: {
                    val: "Continue"
                },
            },
        },
        {
            pageName: "Number",
            componentsMetaData: {
                components: ["question", "input", "button"],
                question: {
                    val : "Please enter a number",
                    description: "",
                },
                input: [
                    {
                        type: "text",
                        label: "",
                        placeholder: "",
                        minVal: 0,
                        maxVal: 30,
                    },
                ],
                button: {
                    val: "Next"
                }
            }
        },
        {
            pageName: "Website",
            componentsMetaData: {
                components: ["question", "input", "button"],
                question: {
                    val : "Please enter a URL",
                    description: "",
                },
                input: [
                    {
                        type: "text",
                        label: "",
                        placeholder: "https://",
                        minVal: 0,
                        maxVal: 30,
                    },
                ],
                button: {
                    val: "Next"
                }
            }
        },
        {
            pageName: "Single Option",
            componentsMetaData: {
                components: ["question", "option", "button"],
                question: {
                    val: "Which do you prefer",
                    description: ""
                },
                option: [
                    {
                        type: "checkbox",
                        val: "optoin 1",
                    },
                    {
                        type: "checkbox",
                        val: "optoin 2",
                    }
                ],
                button: {
                    val : "Next",
                },
            },
        },
        {
            pageName: "Multi Option",
            componentsMetaData: {
                components: ["question", "option", "button"],
                question: {
                    val: "Please choose at least one option",
                    description: ""
                },
                option: [
                    {
                        type: "checkbox",
                        val: "optoin 1",
                    },
                    {
                        type: "checkbox",
                        val: "optoin 2",
                    }
                ],
                button: {
                    val : "Next",
                },
            },
        },
        {
            pageName: "Dropdown",
            componentsMetaData: {
                components: ["question", "dropdown", "button"],
                question: {
                    val: "Please choose",
                    description: ""
                },
                dropdown: {
                    placeholder: "Please select a option",
                    options: ["option 1", "option 2"],
                },
                button: {
                    val: "Next"
                }
            },
        },
        {
            pageName: "Star Rating",
            componentsMetaData: {
                components: ["question", "stars", "button"],
                question: {
                    val: "How would you rate your experience ?",
                    description: "",
                },
                starts: {
                    val: 5
                },
                button: {
                    val: "Next"
                },
            },
        },
    ];

    const handleAddPage = (page) => {
        const pageWithId = { ...page, uniquePageId: uuidv4() };
        addPageToForm(formId, pageWithId);
        setPages([...pages, pageWithId]);
        setIsModalOpen(false);
    };

    const renderPageContent = (page) => {
        if (page.pageName === "Hello") {
            return <First />;
        } else if (page.pageName === "contact") {
            return <Contact />;
        } else if (page.pageName === "Third Page") {
            return <p>{page.componentsMetaData.question}</p>;
        }
    };

    return (
        <div>
            {/* Choose Page Button */}
            <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => setIsModalOpen(true)}
            >
                Choose Page
            </button>

            {/* Modal for Choosing Pages */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center font-inter text-sm">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg mb-4">Choose a Page</h2>
                        <div className="flex flex-col gap-2">
                            {availablePages.map((pg, index) => (
                                <button
                                    key={index}
                                    className="bg-blue-200 p-2 rounded"
                                    onClick={() => handleAddPage(pg)}
                                >
                                    {pg.pageName}
                                </button>
                            ))}
                        </div>
                        <button
                            className="mt-4 text-red-500"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Display added pages */}
            <div className="mt-6">
                <h4>ADDED PAGES:</h4>
                {pages.length > 0 ? (
                    <ul className="flex gap-3">
                        {pages.map((pg) => (
                            <li
                                key={pg.uniquePageId}
                                className="bg-green-200 p-2 cursor-pointer"
                                onClick={() => setSelectedPage(pg)}  // Set the selected page on click
                            >
                                <p>{pg.pageName}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No pages added yet.</p>
                )}
            </div>

            {/* Display the content of the selected page */}
            <div className="mt-6">
                <h4>PAGE CONTENT:</h4>
                {selectedPage ? (
                    <div className="p-4 bg-gray-100">
                        {renderPageContent(selectedPage)}
                    </div>
                ) : (
                    <p>Select a page to view its content.</p>
                )}
            </div>
        </div>
    );
};

export default Build;
