import React, { useEffect, useState } from "react";
import { Input, Button, Card, message, Spin } from "antd";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import authApiClient from "../utils/authApiClient";

const Profile = () => {
  const token = useSelector((state) => state.auth?.token);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch profile from backend /user/me
  const fetchUser = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await authApiClient.get("/user/me"); // ✅ /me route
      setUser(res.data.user);
      setName(res.data.user.name);
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!name.trim()) return message.warning("Name cannot be empty");

    try {
      setSaving(true);
      const res = await authApiClient.put("/user/me", { name }); // ✅ /me route
      setUser(res.data.user);
      message.success("Profile updated successfully!");
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to update name");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (token) fetchUser(); // no userId needed
  }, [token]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <Navbar />
        <h2 className="text-xl font-semibold mt-8">
          Please log in to view your profile.
        </h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-4">
        <Card className="shadow-md">
          {loading ? (
            <div className="flex justify-center py-20">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Email
                  </label>
                  <Input
                    value={user?.email}
                    disabled
                    className="rounded-md bg-gray-100"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="primary"
                    loading={saving}
                    onClick={handleUpdate}
                    className="bg-cyan-600 hover:bg-cyan-500"
                  >
                    Update Profile
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default Profile;
