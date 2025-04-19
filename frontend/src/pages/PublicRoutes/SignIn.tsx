import icon from "@/assets/hs-icon-md.png";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInValues = z.infer<typeof signInSchema>;

const SignIn = () => {
  const { toast } = useToast();
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInValues) => {
    console.log(values);
    toast({
      title: "Sign in attempted",
      description: "This is a demo. Authentication is not implemented.",
      variant: "default",
    });
  };

  return (
    <Fragment>
      <Navbar />

      <div className="min-h-dvh flex items-stretch">
        {/* Left panel with form */}
        <div className="sm:px-5 lg:ml-20 w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-xl border border-purple/20 max-h-[550px] lg:mt-auto lg:mb-auto relative lg:-right-[215px] z-20">
          <div className="text-center mb-8">
            <img
              src={icon}
              alt="Logo"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-purple-dark mb-2">Welcome Back</h1>
            <p className="text-purple-dark/80">Sign in to your account</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-dark font-medium">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-dark/70" />
                        <Input
                          {...field}
                          className="pl-10 bg-white border-purple/30 text-purple-dark placeholder:text-purple/50 focus:ring-purple focus:border-purple"
                          placeholder="Enter your email"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-600 font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-dark font-medium">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-dark/70" />
                        <Input
                          {...field}
                          type="password"
                          className="pl-10 bg-white border-purple/30 text-purple-dark placeholder:text-purple/50 focus:ring-purple focus:border-purple"
                          placeholder="Enter your password"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-600 font-medium" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-purple-dark hover:bg-purple text-white font-medium"
              >
                Sign In
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-purple-dark">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-gold-dark hover:text-gold-dark/80 font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Right panel with image */}
        <div className="hidden lg:block flex-1 relative">
          {/* <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent opacity-60 z-10" /> */}
          <img
            src="https://images.unsplash.com/photo-1599847954335-d7c7ca35f6a7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
