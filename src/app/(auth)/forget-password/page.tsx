'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-teal-800 p-4">
      <div className="w-full max-w-md space-y-6 bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white border-opacity-20">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Forgot Password</h1>
          <p className="text-gray-300">Enter your email to reset your password</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <Input 
              id="email" 
              placeholder="m@example.com" 
              required 
              type="email"
              className="bg-white bg-opacity-10 border-white border-opacity-20 placeholder-gray-400 text-white focus:border-teal-300 focus:ring-teal-300"
            />
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