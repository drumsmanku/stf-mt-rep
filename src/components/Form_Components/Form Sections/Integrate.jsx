import React from 'react';

const Integrate = () => {
    const integrations = [
        {
            img_source: "/email.png",
            ttl: "Email",
            txt: "Send and receive emails for each submission."
        },
        {
            img_source: "/webhook.png",
            ttl: "Webhook",
            txt: "Receive a webhook for all submissions."
        },
        {
            img_source: "/google-sheets.png",
            ttl: "Google Sheets",
            txt: "Sync all your submissions to a Google Sheet stored on your Google Drive."
        },
        {
            img_source: "/slack.png",
            ttl: "Slack",
            txt: "Get real time notifications in your Slack workspace for every new submission."
        },
        {
            img_source: "/zapier.png",
            ttl: "Zapier",
            txt: "Connect your form to Zapier for automation and send data to 6000+ apps."
        },
    ];
    return (
            <div className={"flex flex-col items-center justify-center w-screen absolute top-20 "}>
                <div className={"text-sm p-6 flex flex-col gap-3 w-[80vw]"}>
                    <p className={"font-semibold"}>Integrate form to your favorite tools</p>
                    <div className={"border shadow-md p-4"}>
                        {
                            integrations.map((integration, index) => (
                                <div className={"flex items-center justify-between space-y-10"}>
                                    <div className={"flex space-x-4"}>
                                        <img className={"w-10 h-10 rounded-full"} alt={integration.ttl}
                                             src={integration.img_source}/>
                                        <div>
                                            <h5 className={"font-semibold"}>{integration.ttl}</h5>
                                            <p className={"text-sm"}>{integration.txt}</p>
                                        </div>
                                    </div>
                                    <button className={"text-sm text-white p-2 px-3 bg-black rounded-md"}>Connect
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <p className={"text-[4px] fixed bottom-2 text-center w-screen"}>Not seeing an integration you need? <span className={"text-blue-500 cursor-pointer hover:underline"}>Submit it here.</span></p>
            </div>
    );
};

export default Integrate;