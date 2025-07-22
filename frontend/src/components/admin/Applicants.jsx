import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((s) => s.application);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data } = await axios.get(
          `${APPLICATION_API_END_POINT}/${id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(data.job));
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, [id, dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto px-4 md:px-6 my-10 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Applicants</h1>
          <span className="bg-[#108a00]/10 text-[#108a00] font-medium px-3 py-1 rounded-full text-sm">
            {applicants?.applications?.length || 0}
          </span>
        </div>

        <section className="bg-white border-2 border-[#108a00] rounded-2xl shadow-sm p-6">
          <ApplicantsTable />
        </section>
      </main>
    </div>
  );
};

export default Applicants;
