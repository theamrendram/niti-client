import { z } from "zod";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import axios from "axios";
const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email format",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 3 characters." }),
});

const Auth = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
    console.log("All env vars:", import.meta.env);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        {
          body: JSON.stringify(data),
          credentials: "include", // Include cookies for authentication
        }
      );

      if (response.status !== 200) {
        const errorData = await response.data;
        alert(`Error: ${errorData.error || "Something went wrong"}`);
        return;
      }

      // const result = await response.json();
      alert("Form submitted successfully!");

      // Handle successful login (e.g., redirect)
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error occurred. Please try again.");
    }
  }

  return (
    <section className="bg-blue-100 flex items-center justify-center min-h-screen">
      <div className="bg-white w-[350px] md:max-w-[500px] m-auto p-4 shadow rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="py-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="py-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Auth;
