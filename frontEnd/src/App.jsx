import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  HomePage,
  LoginPage,
  ProfilePage,
  SettingsPage,
  SignUpPage,
} from "./pages";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);


  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/signup" element={!authUser ? <SignUpPage />  : <Navigate to="/login" /> } />
        <Route path="/login" element={!authUser ? <LoginPage />  : <Navigate to="/login" /> } />
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />}  />
        <Route path="/profile" element={authUser ? <ProfilePage />  : <Navigate to="/login" /> } />
      </Routes>
    </>
  );
};

export default App;
