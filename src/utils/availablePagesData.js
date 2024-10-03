export const availablePages = [
    {
        pageName: "Hello",
        componentsMetaData: {
            components: ["title", "button"],
            title: {
                val: "Hi there 😀!",
                description: "Mind filling this form",
            },
            button: {
                val: "Let's Start"
            },
            alignment: {
                val: "center",
            }
        },
    },
    {
        pageName: "Contact",
        componentsMetaData: {
            components: ["question", "input", "button"],
            question: {
                val : "Please fill the following",
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
            alignment: {
                val: "center",
            }
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
        pageName: "Website URL",
        componentsMetaData: {
            components: ["question", "input", "button"],
            question: {
                val: "Please enter a website URL",
                description: "",
            },
            input: [
                {
                    type: "url",
                    label: "Website URL",
                    placeholder: "https://www.example.com",
                    minVal: 0,
                    maxVal: 100
                }
            ],
            button: {
                val: "Next"
            }
        }
    },
    {
        pageName: "Single Select Option",
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
        pageName: "Multi Select Option",
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
                },
            ],
            button: {
                val : "Next",
            },
        },
    },
    {
        pageName: "Dropdown List",
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
            stars: {
                val: 5,
            },
            button: {
                val: "Next"
            },
        },
    },
    {
        pageName: "Opinion Scale",
        componentsMetaData: {
            components: ["question", "scale", "button"],
            question: {
                val: "How likely are you to recommend us ?",
                description: "",
            },
            scale: {
                val: 10,
            },
            button: {
                val: "Next",
            }
        },
    },
    {
        pageName: "Signature",
        componentsMetaData: {
            components: ["question", "signboard", "button"],
            question: {
                val: "Please sign here",
                description: "",
            },
            signboard: {
                width: 600,
                height: 250,
                strokeColor: "#000000",
                strokeWidth: 2,
            },
            button: {
                val: "Next",
            }
        },
    },
    {
        pageName: "File Upload",
        componentsMetaData: {
            components: ["question", "fileUpload", "button"],
            question: {
                val: "Please upload your file",
                description: "",
            },
            fileUpload: {
                val: "Upload",
            },
            button: {
                val: "Next",
            }
        },
    },
    {
        pageName: "Thank You",
        componentsMetaData: {
            components: ["title", "button"],
            title: {
                val: "Thank you for your time",
                description: "",
            },
            button: {
                val: "Submit",
            }
        },
    },
];
