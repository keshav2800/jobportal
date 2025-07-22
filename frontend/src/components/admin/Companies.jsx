import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-6xl w-full mx-auto px-4 md:px-6 mt-10 space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
          <Input
            placeholder="Filter by company name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="sm:max-w-xs focus:border-[#108a00] focus:ring-[#108a00]/40"
          />
          <div className="flex-1" />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-[#108a00] hover:bg-[#14a800] text-white"
          >
            + New Company
          </Button>
        </div>

        <CompaniesTable />
      </main>
    </div>
  );
};

export default Companies;