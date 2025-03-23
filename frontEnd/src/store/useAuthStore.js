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
      set({ authUser: res.formData });
    } catch (error) {
      set({ authUser: null });
      console.log("error in useAuthStore.checkAuth:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  
  signup: async (formformData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formformData);
      toast.success("Account created successfully");
      set({ authUser: res.formData });
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
  },


  login: async (formData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      console.log(res);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      return true;
      // get().connectSocket();
    } catch (error) {
      toast.error(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },


}));
