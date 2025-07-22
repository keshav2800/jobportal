import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(query));
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-6xl w-full mx-auto px-4 md:px-6 my-10 space-y-8">
        <div className="bg-white border border-[#108a00] rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by job title, type…"
            className="flex-1 focus:border-[#108a00] focus:ring-[#108a00]/40"
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-[#108a00] hover:bg-[#14a800] w-full sm:w-auto"
          >
            New Job
          </Button>
        </div>

        <AdminJobsTable />
      </main>
    </div>
  );
};

export default AdminJobs;
