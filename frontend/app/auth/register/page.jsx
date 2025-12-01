"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../utils/api";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await API.post("/api/auth/register", { username, password });
      setSuccess("Амжилттай бүртгэгдлээ! Login хийж орно уу.");
      setUsername("");
      setPassword("");
      // хүсвэл автоматаар login хийж ч болно
      // router.push("/auth/login");
    } catch (err) {
      setError(err?.response?.data || "Бүртгэл амжилтгүй боллоо");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Шинээр бүртгүүлэх</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-3">{success}</div>
      )}

      <form onSubmit={submit} className="space-y-3">
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          {loading ? "Түр хүлээнэ үү..." : "Бүртгүүлэх"}
        </button>
      </form>
    </div>
  );
}
