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
import { COMPANY_API_END_POINT } from "@/utils/constant";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const { id: companyId } = useParams();
  useGetCompanyById(companyId);
  const { singleCompany } = useSelector((s) => s.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!singleCompany) return;
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    });
  }, [singleCompany]);

  const handleChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const handleFile = (e) =>
    setInput({ ...input, file: e.target.files?.[0] || null });

  const submitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries({ ...input, file: undefined }).forEach(([k, v]) =>
      fd.append(k, v)
    );
    if (input.file) fd.append("file", input.file);

    try {
      setLoading(true);
      const { data } = await axios.put(
        `${COMPANY_API_END_POINT}/update/${companyId}`,
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/companies");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl w-full mx-auto px-4 md:px-6 py-10">
        <form
          onSubmit={submitHandler}
          className="bg-white border-[3px] border-[#108a00] rounded-2xl shadow-md overflow-hidden"
        >
          <div className="flex items-center gap-4 p-6 border-b border-gray-200 bg-gray-50">
            <Button
              type="button"
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 border-[#108a00] text-[#108a00] hover:bg-[#108a00]/10"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <h1 className="text-xl font-semibold">Company Setup</h1>
          </div>

          <div className="p-6 grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                name="name"
                value={input.name}
                onChange={handleChange}
                placeholder="Microsoft, JobHunt …"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={handleChange}
                placeholder="Short description"
              />
            </div>

            <div className="space-y-2">
              <Label>Website</Label>
              <Input
                name="website"
                value={input.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Logo</Label>
              <Input type="file" accept="image/*" onChange={handleFile} />
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            {loading ? (
              <Button disabled className="w-full bg-[#108a00]">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-[#108a00] hover:bg-[#14a800]">
                Update
              </Button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default CompanySetup;
