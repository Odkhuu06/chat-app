"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../utils/api";
import { getToken } from "../../utils/auth";

export default function ProfilePage() {
  const [me, setMe] = useState(null);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const res = await API.get("/api/auth/me");
        setMe(res.data);
        setUsername(res.data.username);
        setAvatar(res.data.avatar);
      } catch (err) {
        console.error("Fetch profile failed:", err);
        router.push("/");
      }
    };

    fetchProfile();
  }, [router]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await API.put("/api/users/me", {
        username,
        avatar
      });
      setMe(res.data);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!me) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/chat")}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Chat
          </button>
          
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Profile</h1>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={editing ? avatar : me.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-700 mb-4"
            />
            
            {!editing && (
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {me.username}
              </h2>
            )}
            
            <p className="text-gray-500 dark:text-gray-400">
              Joined {new Date(me.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Edit Mode */}
          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Avatar URL
                </label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setUsername(me.username);
                    setAvatar(me.avatar);
                  }}
                  className="flex-1 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Username</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{me.username}</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">User ID</p>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">{me._id}</p>
              </div>

              <button
                onClick={() => setEditing(true)}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}