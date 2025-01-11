import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createProductSchema } from "@/lib/schemas";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { addProduct } from "@/hooks/products";
import LoadingButton from "../common/loading-button";
import { useState } from "react";
import CancelButton from "../common/cancel-button";

const TrackProduct = () => {
  const { mutate: addProductMutation, isPending } = addProduct();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof createProductSchema>) {
    addProductMutation(values, {
      onSuccess: () => {
        setIsModalOpen(false);
        form.reset();
      },
    });
  }

  function handleModalChange(open: boolean) {
    setIsModalOpen(open);

    // Reset the form when the modal is closed
    if (!open) {
      form.reset();
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalChange}>
      <DialogTrigger>
        <Button className="font-bold">Track Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Track product</DialogTitle>
          <DialogDescription className="flex flex-col gap-1">
            <span>
              Enter the product name and url to begin tracking a product
            </span>
            <span className="text-xs font-bold">
              Target and BestBuy products have the best compatability with
              salescout
            </span>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Pokemon Cards" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product URL</FormLabel>
                  <FormControl>
                    <Input placeholder="www.target.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <CancelButton
                type="button"
                disabled={isPending}
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="w-1/2"
              />
              <LoadingButton
                type="submit"
                isLoading={isPending}
                className="w-1/2"
              >
                Track product
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TrackProduct;
