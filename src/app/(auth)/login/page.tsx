'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/firebase/firebaseConfig"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithEmailAndPassword } from "firebase/auth"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"


const LoginSchema = z.object({
  email : z.string().email().min(1, "Email is required"), 
  password : z.string().min(8, "Password must be at least 8 characters")
}); 

type LoginSchemaT = z.infer< typeof LoginSchema>

export default function Component() {

  const {
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<LoginSchemaT>({
    resolver : zodResolver(LoginSchema)
  }); 


  const onSubmit = async(data: any) =>{
    const signedInUser = await signInWithEmailAndPassword(auth, data.email, data.password); 
    
    console.log(signedInUser); 
    console.log(data); 
  }

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
            className="w-full bg-white bg-opacity-10 hover:bg-opacity-20 text-white border-white border-opacity-20 transition-all duration-200"
            onClick={() => console.log("Google login")}
          >
            {/* <Icons.google className="mr-2 h-4 w-4" /> */}
            Log in with Google
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