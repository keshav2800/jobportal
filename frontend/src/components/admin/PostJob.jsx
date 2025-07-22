import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { JOB_API_END_POINT } from "@/utils/constant";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((s) => s.company);

  /* ---------------- change handlers ---------------- */
  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const selectChangeHandler = (value) => {
    const selected = companies.find(
      (c) => c.name.toLowerCase() === value.toLowerCase()
    );
    if (selected) setInput({ ...input, companyId: selected._id });
  };

  /* ---------------- submit ---------------- */
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/jobs");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex justify-center w-full px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-4xl bg-white border-2 border-[#108a00] rounded-2xl shadow-md p-8 space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold text-gray-800">
              Post a New Job
            </h1>
            <p className="text-sm text-gray-600">
              Fill in the details below to list a new opening.
            </p>
          </div>

          {/* Grid fields */}
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              ["Title", "title", "text"],
              ["Description", "description", "text"],
              ["Requirements", "requirements", "text"],
              ["Salary (LPA)", "salary", "number"],
              ["Location", "location", "text"],
              ["Job Type", "jobType", "text"],
              ["Experience (yrs)", "experience", "number"],
              ["No. of Positions", "position", "number"],
            ].map(([label, name, type]) => (
              <div key={name} className="flex flex-col">
                <Label className="mb-1 font-medium text-gray-700">
                  {label}
                </Label>
                <Input
                  type={type}
                  name={name}
                  value={input[name]}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#108a00]"
                />
              </div>
            ))}

            {/* Company select spans two cols on sm */}
            {companies.length > 0 && (
              <div className="sm:col-span-2 flex flex-col">
                <Label className="mb-1 font-medium text-gray-700">
                  Company
                </Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full focus:border-[#108a00]">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((c) => (
                        <SelectItem key={c._id} value={c.name.toLowerCase()}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {companies.length === 0 && (
                  <p className="text-xs text-red-600 mt-2">
                    *Please register a company first
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Submit */}
          {loading ? (
            <Button className="w-full" disabled>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-[#108a00] hover:bg-[#14a800]">
              Post Job
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
