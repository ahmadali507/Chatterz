"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth, db, provider } from "../../../firebase/firebaseConfig";
import { z } from "zod";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUpSchema = z.object({
  username: z.string().min(1, "The username is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupSchemaT = z.infer<typeof SignUpSchema>;

export default function Component() {
  const router = useRouter();
  const [verificationEmailSent, setVerificationEmailSent] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaT>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignupSchemaT) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password);

      // Directly use the result of sendEmailVerification
      await sendEmailVerification(userCredentials.user)
        .then(() => {
          setVerificationEmailSent(true);
          toast.success("Email Verification link sent. Verify in order to login, ");
          console.log("Email verification email has been sent");
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        })
        .catch((err) => {
          console.error("Email verification failed:", err);
          setVerificationEmailSent(false);
          toast.error("Failed to send verification email. Please try again.");
        });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("The email is already in use.");
      }
      console.error("Signup failed:", error);
      setVerificationEmailSent(false);
      toast.error("Failed to register. Please try again.");
    }

    console.log(data);
  };

  // Signing in with Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log("Google Sign-In successful:", user);

      // Optionally add user to Firestore or perform other actions
    
      toast.success("Signed in with Google successfully!");
      router.push("/"); // Redirecting to a dashboard page after successful sign-in
    } catch (error: any) {
      console.error("Google Sign-In error:", error);
      toast.error("Google sign-in failed. Please try again.");
    }
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
            <Label htmlFor="username" className="text-gray-200">
              Username
            </Label>
            <Input
              id="username"
              placeholder="johndoe"
              {...register("username")}
              className="bg-white bg-opacity-10 border-white border-opacity-20 placeholder-gray-300 text-white focus:border-teal-300 focus:ring-teal-300"
            />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">
              Email
            </Label>
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
            <Label htmlFor="password" className="text-gray-200">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="bg-white bg-opacity-10 border-white border-opacity-20 placeholder-gray-300 text-white focus:border-teal-300 focus:ring-teal-300"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-semibold transition-all duration-200"
          >
            Sign Up
          </Button>
        </form>
        <Separator className="bg-white bg-opacity-20" />
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full bg-white bg-opacity-10 hover:bg-opacity-20 text-white border-white border-opacity-20 transition-all duration-200"
            onClick={handleGoogleSignIn}
          >
            Sign up with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
