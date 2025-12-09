"use client";
import { useState } from "react";
import LoginForm from "./../components/LoginForm";
import RegisterForm from "./../components/RegisterForm";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-[360px] bg-white dark:bg-gray-900 p-6 rounded shadow flex items-center justify-center flex-col">
      <h1 className="text-xl font-semibold mb-4 text-center dark:text-white">
        {activeTab === "login" ? "Нэвтрэх" : "Шинээр бүртгүүлэх"}
      </h1>

      <div className="flex mb-6 gap-2">
        <button
          onClick={() => handleTabChange("login")}
          className={`flex-1 py-2 rounded ${
            activeTab === "login"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
          }`}
        >
          Нэвтрэх
        </button>
        <button
          onClick={() => handleTabChange("register")}
          className={`flex-1 py-2 rounded ${
            activeTab === "register"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
          }`}
        >
          Бүртгүүлэх
        </button>
      </div>

      <div className="dark:text-white">
        {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
