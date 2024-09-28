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
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { UserCheck2Icon } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";

const SignUpSchema = z.object({
  username: z.string().min(1, "The username is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupSchemaT = z.infer<typeof SignUpSchema>;

export default function Component() {
  const router = useRouter();
  const [verificationEmailSent, setVerificationEmailSent] =
    useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaT>({
    resolver: zodResolver(SignUpSchema),
  });

  const user = auth?.currentUser;
  // // Function to check email verification
  // const checkEmailVerification = async () => {
  //   if (auth?.currentUser) {
  //     await reload(auth?.currentUser); // Reload the user state
  //     if (auth?.currentUser?.emailVerified) {
  //       setEmailVerified(true);
  //       toast.success("Your email has been verified. You are now logged in.");
  //       router.push("/"); // Redirect to the home page
  //     } else {
  //       setEmailVerified(false);
  //       toast.error("Verify your email to continue.");
  //     }
  //   }
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User detected:", user);
        // checkEmailVerification(); // Explicitly check email verification on auth state change
      }
    });

    return () => unsubscribe();
  }, [user]);

  const onSubmit = async (data: SignupSchemaT) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("User created:", userCredentials.user);

      // adding hte user to the firestore 

      await setDoc(doc(db, "users", userCredentials.user.uid), {
        email : data.email, 
        username : data.username, 
        password : data.password,
        profilePic : null, 
        uid : userCredentials.user.uid, 
        createdAt : new Date().toISOString(), 
        // emailVerified : null,
      }).then(()=>{
        console.log("user added to db successfully")
        toast.success("User signed up successfully"); 
      }).catch((error)=>{
        console.log("Error addding user to the db", error); 
      })
      
      

      // await sendEmailVerification(userCredentials.user)
      //   .then(() => {
      //     setVerificationEmailSent(true);
      //     toast.success("Email Verification link sent. Verify to continue.");
      //     setEmailVerified(false);
      //   })
      //   .catch((err) => {
      //     console.error("Email verification failed:", err);
      //     toast.error("Failed to send verification email. Please try again.");
      //   });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("The email is already in use.");
      } else {
        console.error("Signup failed:", error);
        toast.error("Failed to register. Please try again.");
      }
    }
  };

  // Signing in with Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        email : user.email, 
        username : user.displayName || "google user", 
        profilePic : user.photoURL, 
        uid : user.uid, 
        createdAt : new Date().toISOString(), 
        provider : "google", 
        // emailVerified : null,
      }, {merge : true}).then(()=>{
        console.log("user added to db successfully")
        toast.success("User signed up successfully"); 
      }).catch((error)=>{
        console.log("Error addding user to the db", error); 
      })
      
      console.log("Google Sign-In successful:", user);
      toast.success("Signed in with Google successfully!");
      router.push("/");
    } catch (error: any) {
      console.error("Google Sign-In error:", error);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  const GoogleIcons = Icons["googleicon"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-teal-800 p-4">
      <div className="w-full max-w-md space-y-6 bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white border-opacity-20">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Sign Up</h1>
          <p className="text-gray-300">Create an account to get started</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!emailVerified ? (
            <div className="text-center text-lg">
              Verify Your Email to continue
            </div>
          ) : (
            <>
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
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
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
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
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
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-semibold transition-all duration-200"
              >
                Sign Up
              </Button>
            </>
          )}
        </form>
        <Separator className="bg-white bg-opacity-20" />
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full flex flex-row justify-evenly bg-white bg-opacity-90 hover:bg-opacity-10 hover:text-destructive text-black border-white border-opacity-20 transition-all duration-200"
            onClick={handleGoogleSignIn}
          >
            <GoogleIcons className="w-6 h-6 bg-clip" />
            Sign up with Google
          </Button>
        </div>

          <div className = "text-center">
            <p className="text-gray-300">Already have an account? <Link href='/login' className = "text-teal-300  font-bold underline"> SignIn </Link></p>
          </div>
      </div>
    </div>
  );
}
