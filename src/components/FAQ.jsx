import React, { useState } from "react";

const FAQ = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Is striform free?",
      answer:
        "striform is the best FREE alternative to Typeform in the market. While Typeform provides ONLY 10 responses on their free plan, striform provides unlimited responses and forms for FREE.",
    },
    {
      question: "What is striform PRO?",
      answer:
        "striform PRO provides advanced features like removing striform branding, capturing partial submissions, inviting team members, and adding your own custom domain.",
    },
    {
      question:
        "How long will striform be around, and how many people use striform?",
      answer:
        "striform has thousands of users and will be around for years. It was created in 2023 and reached $10,000 in revenue within the first week of launch.",
    },
    {
      question: "Can you embed a striform on a website?",
      answer:
        "Yes! You can embed striform on any website, whether it’s custom coded or uses a builder like WordPress, Squarespace, Shopify, Wix, etc.",
    },
    {
      question: "Does striform integrate with Google Sheets?",
      answer:
        "Yes, striform has a direct Google Sheets integration where responses will automatically add a new row in your Google Sheet.",
    },
    {
      question: "Does striform have a Zapier integration?",
      answer:
        "Yes, striform works with Zapier via webhooks, and a direct Zapier integration is coming soon.",
    },
    {
      question: "Does striform allow you to ask for digital signatures?",
      answer:
        "Yes, you can collect digital signatures in your forms using striform.",
    },
    {
      question:
        "Does striform support redirecting users to a URL after they complete a form?",
      answer:
        "Yes, striform allows you to redirect users to any URL after form submission.",
    },
    {
      question:
        "Can I use a single striform account for multiple brands and domains?",
      answer:
        "Yes, you can embed forms on different websites and have different custom domains for each form.",
    },
    {
      question: "Does striform support generating a QR code to share my form?",
      answer: "Yes, you can generate a QR code to share your form in striform.",
    },
    {
      question: "Does striform support file uploads?",
      answer:
        "Yes, striform PRO allows file uploads and payments integration with Stripe.",
    },
    {
      question: "Can I request some features?",
      answer:
        "Yes, you can submit feature requests on the striform website under your account dashboard.",
    },
  ];

  return (
    <div className="faq-container space-y-6 text-center">
      {faqData.map((faq, index) => (
        <div key={index} className="faq-item border-b pb-4">
          <h3
            onClick={() => toggleQuestion(index)}
            className="cursor-pointer text-lg font-semibold text-orange-600"
          >
            {faq.question}
          </h3>
          {openQuestionIndex === index && (
            <p className="mt-2 text-gray-700">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
