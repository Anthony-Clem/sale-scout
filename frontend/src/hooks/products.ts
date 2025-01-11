import { axiosInstance } from "@/lib/axios";
import { createProductSchema } from "@/lib/schemas";
import { ProductTypes } from "@/lib/types";
import { queryClient } from "@/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export const getProducts = () => {
  return useQuery<ProductTypes[]>({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/products");
        console.log(res.data);
        return res.data;
      } catch (error: any) {
        toast.error("Error loading products");
      }
    },
  });
};

export const addProduct = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof createProductSchema>) => {
      const res = await axiosInstance.post("/products/add", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
};

export const deleteProduct = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/products/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
};

export const editProduct = () => {
  return useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const res = await axiosInstance.put(`/products/update/${id}`, { name });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product edited successfully");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
};
