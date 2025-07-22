import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { JOB_API_END_POINT } from "@/utils/constant";

const AdminJobSetup = () => {
  const { id } = useParams(); // job id
  const navigate = useNavigate();

  const { companies } = useSelector((s) => s.company);

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

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (data.success) {
          const j = data.job;
          setInput({
            title: j.title || "",
            description: j.description || "",
            requirements: j.requirements || "",
            salary: j.salary || "",
            location: j.location || "",
            jobType: j.jobType || "",
            experience: j.experience || "",
            position: j.position || 0,
            companyId: j.company?._id || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const onChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const onSelect = (value) =>
    setInput({ ...input, companyId: companies.find((c) => c.name.toLowerCase() === value)._id });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(`${JOB_API_END_POINT}/update/${id}`, input, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/jobs");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center w-full my-8 px-4">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-3xl border-[3px] border-[#108a00] bg-white rounded-2xl shadow-lg p-8 space-y-8"
        >
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="border-[#108a00] text-[#108a00] hover:bg-[#108a00]/10"
              onClick={() => navigate("/admin/jobs")}
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            <h1 className="text-xl font-semibold">Job Setup</h1>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              ["Title", "title", "text"],
              ["Description", "description", "text"],
              ["Requirements", "requirements", "text"],
              ["Salary", "salary", "text"],
              ["Location", "location", "text"],
              ["Job Type", "jobType", "text"],
              ["Experience", "experience", "text"],
              ["No. of Positions", "position", "number"],
            ].map(([label, name, type]) => (
              <div key={name} className="flex flex-col space-y-1">
                <Label>{label}</Label>
                <Input
                  type={type}
                  name={name}
                  value={input[name]}
                  onChange={onChange}
                />
              </div>
            ))}

            {companies.length > 0 && (
              <div className="sm:col-span-2 flex flex-col space-y-1">
                <Label>Company</Label>
                <Select onValueChange={onSelect} value={input.companyId && companies.find(c=>c._id===input.companyId)?.name.toLowerCase()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((c) => (
                        <SelectItem key={c._id} value={c.name.toLowerCase()}>{c.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {loading ? (
            <Button className="w-full" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-[#108a00] hover:bg-[#14a800]">
              Update Job
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminJobSetup;
