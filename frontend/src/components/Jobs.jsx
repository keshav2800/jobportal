import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const q = searchedQuery.toLowerCase();
      setFilterJobs(
        allJobs.filter((j) =>
          [j.title, j.description, j.location].join(" ").toLowerCase().includes(q)
        )
      );
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 mt-8 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24 space-y-4">
          <FilterCard />
        </aside>

        <section className="flex-1 space-y-6">
          {filterJobs.length === 0 ? (
            <p className="text-center text-gray-500">Job not found</p>
          ) : (
            filterJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Job job={job} />
              </motion.div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Jobs;