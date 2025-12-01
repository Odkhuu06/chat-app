

import LoginPage from "./auth/login/page";
import RegisterPage from "./auth/register/page";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <LoginPage />
        </div>
        <div>
          <RegisterPage />
        </div>
      </div>
    </div>
  );
}
