import { loginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/hooks/auth";
import LoadingButton from "../common/loading-button";

const LoginForm = () => {
  const { mutate: loginMutation, isPending } = login();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    loginMutation(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="********"
                    {...field}
                    type={showPassword ? "text" : "password"}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground *:size-4 absolute right-3 top-2.5"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton isLoading={isPending} className="w-full" size="lg">
          Login
        </LoadingButton>
      </form>
    </Form>
  );
};

export default LoginForm;
