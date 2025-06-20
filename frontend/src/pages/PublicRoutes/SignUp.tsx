import Navbar from "@/components/Navbar";
import icon from "@/assets/hs-icon-md.png";
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
import { useToast } from "@/hooks/use-toast";
import { userApi } from "@/services/apiServices";
import useGeneralStore from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const signUpSchema = z
  .object({
    name: z.string().min(2, "First name must be at least 2 characters"),
    lastname: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    confirmEmail: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails do not match",
    path: ["confirmEmail"],
  });

type SignUpValues = z.infer<typeof signUpSchema>;
type SignUpForm = Pick<z.infer<typeof signUpSchema>, "name" | "lastname" | "email" | "password">;

const SignUp = () => {
  const navigate = useNavigate();
  const { setUserLogged, setIsLogged } = useGeneralStore();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      confirmEmail: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpForm) => {
    await userApi
      .register({
        name: values.name,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
      })
      .then((data) => {
        setIsLogged(true);
        setUserLogged(data);
        navigate("/account", { replace: true });
      })
      .catch((err: any) => {
        const detail = err?.response && err?.response?.data?.detail;

        if (detail?.includes("User with this email already exists")) {
          toast({
            title: "Email already exists",
            description: "An account with this email already exists. Please sign in.",
            variant: "destructive",
          });
        }
      });
  };

  return (
    <Fragment>
      <Navbar />
      <div className="min-h-[93dvh] flex items-stretch">
        {/* Left panel with image */}
        <div className="hidden lg:block flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-bl from-background/40 to-background/10 opacity-60 z-10" />
          <img
            src="https://images.unsplash.com/photo-1603923203371-ad5f6a7403b4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="The Ordinary Products"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right panel with form */}
        <div className="w-full lg:w-[500px] xl:w-[600px] bg-background p-8 flex flex-col justify-center relative z-10">
          <div className="max-w-[400px] mx-auto w-full">
            <div className="mb-8">
              <img
                src={icon}
                alt="Logo"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h1 className="text-3xl font-bold text-foreground mb-2">Create account</h1>
              <p className="text-muted-foreground">Join our community today</p>
            </div>

            {/* TODO: Social logins */}
            {/* <Button
            variant="outline"
            className="w-full mb-6"
          >
            Continue with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div> */}

            <Form {...form}>
              <form
                id="signup-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              className="pl-10"
                              placeholder="First name"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              className="pl-10"
                              placeholder="Last name"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            className="pl-10"
                            placeholder="Enter your email"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            className="pl-10"
                            placeholder="Confirm your email"
                          />
                        </div>
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
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type="password"
                            className="pl-10"
                            placeholder="Create a password"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  form="signup-form"
                  type="submit"
                  className="w-full"
                >
                  Create Account
                </Button>
              </form>

              {error && <div className="text-red-600 font-medium text-center mt-4">{error}</div>}
            </Form>

            <div className="mt-6 text-center text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-primary hover:underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
