import React from "react";

const PricingTable = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-orange-600 text-white">
          <tr>
            <th className="p-4 text-left">Feature</th>
            <th className="p-4 text-left">Free Plan</th>
            <th className="p-4 text-left">PRO Plan ($29/month)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-300">
            <td className="p-4">Unlimited Forms</td>
            <td className="p-4 text-green-600">✔️</td>
            <td className="p-4 text-green-600">✔️</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td className="p-4">Unlimited Responses</td>
            <td className="p-4 text-green-600">✔️</td>
            <td className="p-4 text-green-600">✔️</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td className="p-4">Custom Branding</td>
            <td className="p-4 text-red-600">❌</td>
            <td className="p-4 text-green-600">✔️</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td className="p-4">Partial Submissions</td>
            <td className="p-4 text-red-600">❌</td>
            <td className="p-4 text-green-600">✔️</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td className="p-4">Google Sheets Integration</td>
            <td className="p-4 text-green-600">✔️</td>
            <td className="p-4 text-green-600">✔️</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td className="p-4">Invite Team Members</td>
            <td className="p-4 text-red-600">❌</td>
            <td className="p-4 text-green-600">✔️</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td className="p-4">Custom Domain</td>
            <td className="p-4 text-red-600">❌</td>
            <td className="p-4 text-green-600">✔️</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td className="p-4">File Uploads</td>
            <td className="p-4 text-red-600">❌</td>
            <td className="p-4 text-green-600">✔️</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td className="p-4">Payments Integration (Stripe)</td>
            <td className="p-4 text-red-600">❌</td>
            <td className="p-4 text-green-600">✔️</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td className="p-4">Redirect After Submission</td>
            <td className="p-4 text-green-600">✔️</td>
            <td className="p-4 text-green-600">✔️</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PricingTable;
