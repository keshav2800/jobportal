import React from "react";
import { useSelector } from "react-redux";
import { CloudUpload } from "lucide-react";
import LatestJobCards from "./LatestJobCards";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="max-w-7xl mx-auto my-24 px-4">
      <div className="text-center">
        <h2 className="text-[#108a00] font-semibold text-xl md:text-2xl">
          Upload your resume
        </h2>
        <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-16">
          Get recommended jobs based on your skills
        </h1>
      </div>

      <div className="border-2 border-dashed border-[#108a00] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6 max-w-xl text-left">
          <CloudUpload className="h-16 w-16 text-gray-400 shrink-0" />
          <p className="text-lg text-gray-600">
            Upload or drag and drop your resume here to get recommended jobs based
            on your skills and experience.
          </p>
        </div>

        <button className="whitespace-nowrap bg-[#108a00] hover:bg-[#14a800] text-white font-semibold rounded-lg px-10 py-4 transition-colors">
          Upload Resume
        </button>
      </div>

      <div className="mt-24">
        <h2 className="text-4xl font-bold mb-8">
          <span className="text-[#108a00]">Latest &amp; Top </span> Job Openings
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allJobs.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            allJobs
              ?.slice(0, 6)
              .map((job) => <LatestJobCards key={job._id} job={job} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;