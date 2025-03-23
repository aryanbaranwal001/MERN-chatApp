import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.log("error in useAuthStore.checkAuth:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  
  signup: async (formdata) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formdata);
      toast.success("Account created successfully");
      set({ authUser: res.data });
    } catch (error) {
      console.log("error in useAuthStore.signup:", error);
      toast.error("An error occurred in signing up");
    } finally {
      set({ isSigningUp: false });
    }
  },
  
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("error in useAuthStore.logout:", error);
      toast.error("An error occurred in logging out");
    }
  }
}));
