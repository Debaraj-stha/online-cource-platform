import React, { useState } from "react";

import { Link } from "react-router-dom";
import { adminSetting, appearenceSettings, courseSetting, paymentSetting, privacySetting } from "../constants/settings";
import AppearanceSetting from "../components/AppearanceSetting";
import NotificationSettings from "../components/NotificationSettings";
import AccountSettings from "../components/AccountSettings";

const tabs = [
  "Account",
  "Appearance",
  "Notifications",
  "Payments",
  "Courses",
  "Privacy",
  "Admin",
];

const Setting = () => {
  const [activeTab, setActiveTab] = useState("Account");

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-gray-700 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "Account" && (
         <AccountSettings/>
        )}

        {activeTab === "Appearance" && (
          <AppearanceSetting />
        )}

        {activeTab === "Notifications" && (
          <NotificationSettings/>
        )}

        {activeTab === "Payments" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Payments & Subscription</h2>
            <ul className="space-y-3 text-gray-300">
             {
                paymentSetting.map((links) =>
                  <li key={links.link}><Link to={links.link}>{links.text}</Link></li>
                )
              }
            </ul>
          </div>
        )}

        {activeTab === "Courses" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Course Preferences</h2>
            <ul className="space-y-3 text-gray-300">
               {
                courseSetting.map((links) =>
                  <li key={links.link}><Link to={links.link}>{links.text}</Link></li>
                )
              }
            </ul>
          </div>
        )}

        {activeTab === "Privacy" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Privacy & Security</h2>
            <ul className="space-y-3 text-gray-300">
              {
                privacySetting.map((links) =>
                  <li key={links.link}><Link to={links.link}>{links.text}</Link></li>
                )
              }
            </ul>
          </div>
        )}

        {activeTab === "Admin" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>
            <ul className="space-y-3 text-gray-300">
               {
                adminSetting.map((links) =>
                  <li key={links.link}><Link to={links.link}>{links.text}</Link></li>
                )
              }
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;
