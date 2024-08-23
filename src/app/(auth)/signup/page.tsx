'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

const SignUpSchema = z.object({
  username: z.string().min(1, "The username is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

type SignupSchemaT = z.infer<typeof SignUpSchema>;

export default function Component() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupSchemaT>({
    resolver: zodResolver(SignUpSchema)
  });

  const onSubmit = (data: SignupSchemaT) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-teal-800 p-4">
      <div className="w-full max-w-md space-y-6 bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white border-opacity-20">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Sign Up</h1>
          <p className="text-gray-300">Create an account to get started</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-200">Username</Label>
            <Input
              id="username"
              placeholder="johndoe"
              {...register("username")}
              className="bg-white bg-opacity-10 border-white border-opacity-20 placeholder-gray-300 text-white focus:border-teal-300 focus:ring-teal-300"
            />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              type="email"
              {...register("email")}
              className="bg-white bg-opacity-10 border-white border-opacity-20 placeholder-gray-300 text-white focus:border-teal-300 focus:ring-teal-300"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="bg-white bg-opacity-10 border-white border-opacity-20 placeholder-gray-300 text-white focus:border-teal-300 focus:ring-teal-300"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-semibold transition-all duration-200">
            Sign Up
          </Button>
        </form>
        <Separator className="bg-white bg-opacity-20" />
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full bg-white bg-opacity-10 hover:bg-opacity-20 text-white border-white border-opacity-20 transition-all duration-200"
            onClick={() => console.log("Google sign-in")}
          >
            {/* <GoogleIcon className="mr-2 h-4 w-4" /> */}
            Sign up with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
