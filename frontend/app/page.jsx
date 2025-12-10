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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 text-balance">
            {activeTab === "login" ? "Нэвтрэх" : "Шинээр бүртгүүлэх"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            {activeTab === "login" ? "Таны аккаунтад нэвтэрнэ үү" : "Шинэ аккаунт үүсгэнэ үү"}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 mb-8 transition-all duration-300 border border-slate-100 dark:border-slate-700">
          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>

        {/* <div className="flex gap-4 mb-8">
          <button
            onClick={() => handleTabChange("login")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === "login"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/40 transform scale-105"
                : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
            }`}
          >
            Нэвтрэх
          </button>
          <button
            onClick={() => handleTabChange("register")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === "register"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/40 transform scale-105"
                : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
            }`}
          >
            Бүртгүүлэх
          </button>
        </div> */}

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          {activeTab === "login" ? (
            <>
              Шинэ хэрэглэгч үү?{" "}
              <button
                onClick={() => handleTabChange("register")}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-semibold transition-colors"
              >
                Бүртгүүлэх
              </button>
            </>
          ) : (
            <>
              Аккаунт байна уу?{" "}
              <button
                onClick={() => handleTabChange("login")}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-semibold transition-colors"
              >
                Нэвтрэх
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
