"use client"

import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/jwt";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const user = await login(credentials).unwrap();
      const token = user?.data?.accessToken;
      const userData = verifyToken(token);
      dispatch(setUser({user: userData, token}));
      toast.success("Login successful!")
      router.push('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-screen gap-3">
      <input className="border px-3 py-1 rounded focus:outline-none focus:border-secondary" name="email" type="email" placeholder="Email" required />
      <input className="border px-3 py-1 rounded focus:outline-none focus:border-secondary" name="password" type="password" placeholder="Password" required />
      <button className="border bg-secondary text-white rounded px-3 py-1" type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
