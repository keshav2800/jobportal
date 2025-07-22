import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Eye, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { Badge } from "../ui/badge";
import { JOB_API_END_POINT } from "@/utils/constant";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((s) => s.job);
  const [filtered, setFiltered] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const f = allAdminJobs.filter((j) =>
      searchJobByText
        ?
            j.name.toLowerCase()
            .includes(searchJobByText.toLowerCase())
        : true
    );
    console.log(f);
    setFiltered(f);
  }, [allAdminJobs, searchJobByText]);

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      setFiltered((prev) => prev.filter((j) => j._id !== id));
      toast.success("Job deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="space-y-4">
      {filtered.map((job) => (
        <div
          key={job._id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200 hover:border-[#108a00] rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-800 truncate">{job.title}</h3>
            <p className="text-sm text-gray-500 truncate">
              {job.company?.name} • {job.location}
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <Badge className="border-[#108a00] text-[#108a00] capitalize" variant="outline">
              {job.jobType}
            </Badge>
            <Badge className="border-[#108a00] text-[#108a00]" variant="outline">
              {job.salary} LPA
            </Badge>

            <button
              onClick={() => navigate(`/admin/jobs/${job._id}`)}
              className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md border-[#108a00] text-[#108a00] hover:bg-[#108a00]/10 transition"
            >
              <Edit2 className="h-4 w-4" /> Edit
            </button>

            <button
              onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
              className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md border-blue-500 text-blue-500 hover:bg-blue-500/10 transition"
            >
              <Eye className="h-4 w-4" /> Applicants
            </button>

            <button
              onClick={() => deleteJob(job._id)}
              className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md border-red-500 text-red-500 hover:bg-red-500/10 transition"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        </div>
      ))}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-10">No jobs found.</p>
      )}
    </div>
  );
};

export default AdminJobsTable;
