'use client'
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { auth, db, provider } from "@/firebase/firebaseConfig"
import { zodResolver } from "@hookform/resolvers/zod"
import { GoogleAuthProvider, reload, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { TableRowsSplitIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


const LoginSchema = z.object({
  email : z.string().email().min(1, "Email is required"), 
  password : z.string().min(8, "Password must be at least 8 characters")
}); 

type LoginSchemaT = z.infer< typeof LoginSchema>

export default function Component() {
  const router = useRouter(); 
  const {
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<LoginSchemaT>({
    resolver : zodResolver(LoginSchema)
  }); 


  const checkUserExistenceInFirestore = async( uid: string) =>{
    const userDocRef = doc(db, "users", uid); 
     const userData = await getDoc(userDocRef);
     return userData.exists(); 
  }
  const onSubmit = async (data: any) => {
    try {
      // Attempt to sign in the user
      const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password);
      const uid = userCredentials.user.uid;
  
      // Check if the user exists in Firestore
      const userExists = await checkUserExistenceInFirestore(uid);
  
      if (userExists) {
        console.log("User found in Firestore database");
        toast.success("User Sign-In successful");
  
        // Redirect to chat page
        setTimeout(() => {
          router.push('/chat');
        }, 2000);
      } else {
        console.log("User not found in Firestore database");
        toast.error("User not found in database. Please sign up first.");
        
        // Sign out the user since they don't exist in Firestore
        await auth.signOut();
  
        // Redirect to signup page
        setTimeout(() => {
          router.push('/signup');
        }, 2000);
      }
  
    } catch (error: any) {
      // Catch Firebase Authentication errors
      if (error.code === 'auth/user-not-found') {
        toast.error("No user found with this email. Please sign up.");
      } else if (error.code === 'auth/wrong-password') {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error("Authentication failed. Please try again.");
      }
  
      // Optionally log the error for debugging
      console.error("Error during sign-in:", error);
    }
  }
  const handleGoogleLogin =  async() =>{
       const result  =    await signInWithPopup(auth, provider); 
       const user = result.user;
       const checkUser = await checkUserExistenceInFirestore(user.uid); 
       if(checkUser){
        console.log("user found in db"); 
        toast.success("google user sign in successfull"); 
        setTimeout(() => {
          router.push('/chat'); 
        }, 2000);
       }
       else{
        console.log("user signin failed"); 
        toast.error('user not found. Sign up first');
        auth.signOut(); 
        setTimeout(() => {
          router.push('/signup'); 
        },2000)
       }
  }

  const GoogleIcons = Icons['googleicon']; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-teal-800 p-4">
      <div className="w-full max-w-md space-y-6 bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white border-opacity-20">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Log In</h1>
          <p className="text-gray-300">Welcome back! Please log in to your account</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <Input 
              id="email" 
              placeholder="m@example.com" 
              {...register("email")}
              required 
              type="email"
              className="bg-white bg-opacity-10 border-white border-opacity-20 placeholder-gray-300 text-white focus:border-teal-300 focus:ring-teal-300"
            />
            {errors.email && <p className="text-red-500">{errors?.email?.message}</p>}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password" className="text-gray-200">Password</Label>
              <Link href="/forget-password" className="text-sm text-teal-300 hover:underline">Forgot password?</Link>
            </div>
            <Input 
              id="password" 
              required 
              {...register("password")}
              type="password"
              className="bg-white bg-opacity-10 border-white border-opacity-20 placeholder-gray-300 text-white focus:border-teal-300 focus:ring-teal-300"
            />
            {errors.password && <p className = "text-red-500">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-semibold transition-all duration-200">
            Log In
          </Button>
        </form>
        <Separator className="bg-white bg-opacity-20" />
        <div className="space-y-4">
        <Button
             variant="outline"
            className="w-full flex flex-row justify-evenly bg-white  bg-opacity-90 hover:bg-opacity-10 hover:text-destructive text-black border-white border-opacity-20 transition-all duration-200"
            onClick={handleGoogleLogin}
          >
            <GoogleIcons className="w-6 h-6 bg-clip"/>
            Sign up with Google
          </Button>
        </div>
        <div className="text-center text-gray-300">
          Don't have an account?{" "}
          <Link href="/signup" className="text-teal-300 hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  )
}