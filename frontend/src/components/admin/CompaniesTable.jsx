import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { COMPANY_API_END_POINT } from "@/utils/constant";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((s) => s.company);
  const [filtered, setFiltered] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const f = companies.filter((c) =>
      searchCompanyByText
        ? c.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
        : true
    );
    setFiltered(f);
  }, [companies, searchCompanyByText]);

  const deleteCompany = async (id) => {
    try {
      await axios.delete(`${COMPANY_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      setFiltered((prev) => prev.filter((c) => c._id !== id));
      toast.success("Company deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="space-y-4">
      {filtered.map((company) => (
        <div
          key={company._id}
          className="flex items-center justify-between gap-4 bg-white border border-gray-200 hover:border-[#108a00] rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center gap-4 min-w-0">
            <Avatar className="h-14 w-14 border">
              <AvatarImage src={company.logo} alt={company.name} />
            </Avatar>
            <div className="truncate">
              <h3 className="font-medium text-lg text-gray-800 truncate">
                {company.name}
              </h3>
              <p className="text-sm text-gray-500">
                Registered {company.createdAt.split("T")[0]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <Badge
              className="border-[#108a00] text-[#108a00]"
              variant="outline"
            >
              ID: {company._id.slice(-4)}
            </Badge>

            <button
              onClick={() => navigate(`/admin/companies/${company._id}`)}
              className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md border-[#108a00] text-[#108a00] hover:bg-[#108a00]/10 transition"
            >
              <Edit2 className="h-4 w-4" /> Edit
            </button>
            <button
              onClick={() => deleteCompany(company._id)}
              className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md border-red-500 text-red-500 hover:bg-red-500/10 transition"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        </div>
      ))}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-10">No companies found.</p>
      )}
    </div>
  );
};

export default CompaniesTable;
