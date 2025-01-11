import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import LoadingButton from "../common/loading-button";
import CancelButton from "../common/cancel-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { editProductSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProduct } from "@/hooks/products";
import { Label } from "../ui/label";

interface EditProductProps {
  id: string;
  url: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

const EditProduct = ({ id, url, name, isOpen, onClose }: EditProductProps) => {
  const { mutate: editProductMutation, isPending } = editProduct();

  const form = useForm<z.infer<typeof editProductSchema>>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: name,
    },
  });

  function onSubmit(values: z.infer<typeof editProductSchema>) {
    editProductMutation(
      { ...values, id },
      {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      }
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
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
            <div>
              <Label>Product URL</Label>
              <Input
                value={url}
                readOnly
                className="bg-gray-200 cursor-not-allowed"
              />
            </div>
            <div className="flex gap-3">
              <CancelButton
                type="button"
                disabled={isPending}
                onClick={onClose}
                className="w-1/2"
              />
              <LoadingButton
                type="submit"
                isLoading={isPending}
                className="w-1/2"
              >
                Save Changes
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
