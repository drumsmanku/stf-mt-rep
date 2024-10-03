import React, { useState } from "react";
import useFormStore from "../../app/FormStore.js";
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { availablePages } from '../../utils/availablePagesData';

const BlockSelector = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };

  const blockDetails = {
    "Hello": {
      title: "Hello",
      description: "This is a hello block",
      imageSrc: "/hello.png",
      altText: "HelloBlock",
    },
    "Contact": {
      title: "Contact",
      description:
        "Use this block to ask for all the contact details like name, email, phone, etc., in one page.",
      imageSrc: "/ContactInfoDashboard.png",
      altText: "ContactInfoDashboard",
    },
    "Short Text": {
      title: "Short Text",
      description:
        "Use this for short answers, such as Name, Email Address, or any other short text answer.",
      imageSrc: "/ShortTextDashboard.png",
      altText: "ShortTextDashboard",
    },
    "Long Text": {
      title: "Long Text",
      description:
        "Use this if you want people to write longer answers. For example, User Feedback, Full address, etc.",
      imageSrc: "/LongTextDashboard.png",
      altText: "LongTextDashboard",
    },
    "Phone Number": {
      title: "Phone Number",
      description: "Use this block to ask for phone numbers.",
      imageSrc: "/PhoneNumberDashboard.png",
      altText: "PhoneNumberDashboard",
    },
    "Statement": {
      title: "Statement",
      description: "Use this block to provide a statement to users.",
      imageSrc: "/StatementDashboard.png",
      altText: "StatementDashboard",
    },
   "Website": {
      title: "Website URL",
      description: "Use this block to ask for a website URL.",
      imageSrc: "/WebsiteUrlDashboard.png",
      altText: "WebsiteURLDashboard",
    },
    "Single Select Option": {
      title: "Single Select Option",
      description: "Use this block to allow users to select a single option.",
      imageSrc: "/SingleSelectOptionDashboard.png",
      altText: "SingleSelectDashboard",
    },
    "Multi Select Option": {
      title: "Multi Select Option",
      description: "Use this block to allow users to select multiple options.",
      imageSrc: "/MultiSelectOptionDashboard.png",
      altText: "MultiSelectDashboard",
    },
    "Dropdown List": {
      title: "Dropdown List",
      description: "Use this block to display options in a dropdown list.",
      imageSrc: "/DropdownListDashboard.png",
      altText: "DropdownDashboard",
    },
    // "Date": {
    //   title: "Date",
    //   description: "Use this block to allow users to select a date.",
    //   imageSrc: "/DateDashboard.png",
    //   altText: "DateDashboard",
    // },
    // "Scheduler": {
    //   title: "Scheduler",
    //   description: "Use this block to schedule events or tasks.",
    //   imageSrc: "/SchedulerDashboard.png",
    //   altText: "SchedulerDashboard",
    // },
    "Star Rating": {
      title: "Star Rating",
      description: "Use this block to get user ratings with stars.",
      imageSrc: "/StarRatingDashboard.png",
      altText: "StarRatingDashboard",
    },
    "Opinion Scale": {
      title: "Opinion Scale",
      description: "Use this block to collect opinions on a scale.",
      imageSrc: "/OpinionScaleDashboard.png",
      altText: "OpinionScaleDashboard",
    },
    "Signature": {
      title: "Signature",
      description: "Use this block to collect user signatures.",
      imageSrc: "/SignatureDashboard.png",
      altText: "SignatureDashboard",
    },
    "File Upload": {
      title: "File Upload",
      description: "Use this block to allow users to upload files.",
      imageSrc: "/FileUploadDashboard.png",
      altText: "FileUploadDashboard",
    },
    "Payment": {
      title: "Payment",
      description: "Use this block to collect payments.",
      imageSrc: "/PaymentDashboard.png",
      altText: "PaymentDashboard",
    },
    "Thank You": {
      title: "Thank You",
      description: "Use this block to show a thank you message to users.",
      imageSrc: "/ThankYouDashboard.png",
      altText: "ThankYouDashboard",
    },
  };

  const blocks = Object.keys(blockDetails);

  const renderContent = () => {
    const blockInfo = blockDetails[selectedBlock];
    if (!blockInfo) {
      return (
        <div className="flex flex-col justify-center h-full w-full">
          <h2 className="text-xl text-center font-semibold mb-4">
            No block selected
          </h2>
          <p className="mb-4 text-center">
            Select a block from the left to know about it and to <br />
            use it in the form.
          </p>
        </div>
      );
    }
    return <BlockContent blockInfo={blockInfo} />;
  };

  return (
    <div className="flex">
      <div className="w-1/4 h-[75vh] overflow-y-scroll bg-gray-100 border-r-2 p-4">
        <input
          type="text"
          placeholder="Search blocks..."
          value={searchVal}
          onChange={handleSearch}
          className="border-2 p-2 w-full"
        />
        <ul>
          {blocks
            .filter((block) =>
              block.toLowerCase().includes(searchVal.toLowerCase())
            )
            .map((block) => (
              <li
                key={block}
                onClick={() => setSelectedBlock(block)}
                className={`cursor-pointer p-2 mb-2 ${
                  selectedBlock === block ? "bg-gray-200" : ""
                }`}
              >
                {block}
              </li>
            ))}
        </ul>
      </div>
      <div className="w-3/4 p-4">{renderContent()}</div>
    </div>
  );
};

const BlockContent = ({ blockInfo }) => {
  const { formId } = useParams();
  const addPageToForm = useFormStore((state) => state.addPageToForm);

  const handleAddPage = () => {
    const newPageId = uuidv4();
    const defaultPage = availablePages.find(page => page.pageName === blockInfo.title);
    
    if (defaultPage) {
      const pageData = {
        pageId: newPageId,
        pageName: blockInfo.title,
        componentsMetaData: defaultPage.componentsMetaData
      };

      addPageToForm(formId, pageData);
    } else {
      console.error(`No default data found for ${blockInfo.title}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full border-black border-x-2 border-y-2 p-2">
      <h2 className="text-xl text-center font-semibold mb-4">{blockInfo.title}</h2>
      <p className="mb-4 text-center">{blockInfo.description}</p>
      <div className="flex justify-center items-center p-4">
        <img
          className="w-[30vw] h-[30vh] border-black border-4"
          src={blockInfo.imageSrc}
          alt={blockInfo.altText}
        />
      </div>
      <button
        onClick={handleAddPage}
        className={"p-2 px-3 text-white bg-black rounded-md"}
      >
        Use this block
      </button>
    </div>
  );
};

export default BlockSelector;
