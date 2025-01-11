import { axiosInstance } from "@/lib/axios";
import { loginSchema, signupSchema } from "@/lib/schemas";
import { AuthUserProps } from "@/lib/types";
import { queryClient } from "@/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export const signup = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof signupSchema>) => {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
};

export const login = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const res = await axiosInstance.post("/auth/login", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
};

export const logout = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/auth/logout");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
};

export const checkAuth = () => {
  return useQuery<AuthUserProps>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/check-auth");
        return res.data;
      } catch (error: any) {
        if (error.response) {
          return null;
        }
        toast.error(error.response.data.message || "Something went wrong");
      }
    },
  });
};
