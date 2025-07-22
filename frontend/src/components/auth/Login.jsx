import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { USER_API_END_POINT } from "@/utils/constant";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md space-y-6 rounded-2xl border-2 border-[#108a00]/20 bg-white p-8 shadow-sm"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="test@engmind.com"
              className="focus-visible:ring-2 focus-visible:ring-[#108a00]"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Your Password is safe with keshav"
              className="focus-visible:ring-2 focus-visible:ring-[#108a00]"
              required
            />
          </div>

          <RadioGroup className="flex items-center gap-6 pt-2">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer accent-[#108a00]"
              />
              <Label htmlFor="student">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                id="recruiter"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer accent-[#108a00]"
              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </RadioGroup>

          {loading ? (
            <Button className="w-full bg-[#108a00] hover:bg-[#14a800]" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-[#108a00] hover:bg-[#14a800]"
            >
              Login
            </Button>
          )}

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{
              " "
            }
            <Link to="/signup" className="font-medium text-[#108a00] hover:text-[#14a800]">
              Signup
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;