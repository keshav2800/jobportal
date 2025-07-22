import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    if (!companyName.trim()) return toast.error("Please enter a company name");

    try {
      const { data } = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (data.success) {
        dispatch(setSingleCompany(data.company));
        toast.success(data.message);
        navigate(`/admin/companies/${data.company._id}`);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <section className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-8">
          <header className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              Create Your Company
            </h1>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              Choose a name for your company. You can change this later if you
              need to.
            </p>
          </header>

          <div className="space-y-2">
            <Label htmlFor="companyName" className="font-medium text-gray-800">
              Company Name
            </Label>
            <Input
              id="companyName"
              placeholder="Engineersmind"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="focus:border-[#108a00] focus:ring-[#108a00]/30"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="border-[#108a00] text-[#108a00] hover:bg-[#108a00]/10"
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="bg-[#108a00] hover:bg-[#14a800] text-white"
            >
              Continue
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompanyCreate;
