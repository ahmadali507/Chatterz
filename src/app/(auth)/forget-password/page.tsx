'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/firebase/firebaseConfig"
import { zodResolver } from "@hookform/resolvers/zod"
import { sendPasswordResetEmail } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const Schema = z.object({
  email : z.string().email().min(1, "Email is required")
})
type SchemaT = z.infer<typeof Schema>; 
export default function Component() {
  const {
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<SchemaT>({
    resolver : zodResolver(Schema)
  });
  const router = useRouter(); 
  
  const onSubmit = async(data: SchemaT) => {
    await sendPasswordResetEmail(auth, data.email).then(()=>{
      alert("password reset email send successfully");
      router.push('/login') 
    }).catch((err)=>{
       alert("password reset email was not send")  
    })
    console.log(data); 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-teal-800 p-4">
      <div className="w-full max-w-md space-y-6 bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white border-opacity-20">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Forgot Password</h1>
          <p className="text-gray-300">Enter your email to reset your password</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <Input 
              id="email" 
              placeholder="m@example.com" 
              required 
              {...register("email")}
              type="email"
              className="bg-white bg-opacity-10 border-white border-opacity-20 placeholder-gray-400 text-white focus:border-teal-300 focus:ring-teal-300"
            />
            {errors.email && <p className = "text-red-500">{errors.email.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-semibold transition-all duration-200">
            Reset Password
          </Button>
        </form>
        <div className="space-y-4 text-center">
          <p className="text-sm text-gray-300">
            We'll send you an email with instructions to reset your password.
          </p>
          <div className="text-gray-300">
            Remember your password?{" "}
            <Link href="/login" className="text-teal-300 hover:underline">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}