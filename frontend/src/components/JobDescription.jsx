import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";

const JobDescription = () => {
  const { singleJob, allJobs } = useSelector((s) => s.job);
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const [isApplied, setIsApplied] = useState(false);

  const company =
    allJobs.find((j) => j._id === jobId)?.company ||
    (typeof singleJob?.company === "object" ? singleJob.company : null);

  const applyJobHandler = async () => {
    try {
      const { data } = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (data.success) {
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [...singleJob.applications, { applicant: user?._id }],
          })
        );
        toast.success(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (data.success) {
          dispatch(setSingleJob(data.job));
          setIsApplied(
            data.job.applications.some((a) => a.applicant === user?._id)
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchJob();
  }, [jobId, dispatch, user?._id]);

  const formattedDate = singleJob?.createdAt
    ? new Date(singleJob.createdAt).toLocaleDateString()
    : "";

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 my-10">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3">
          {singleJob?.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          {singleJob?.position && (
            <Badge
              variant="outline"
              className="border-[#108a00] text-[#108a00]"
            >
              {singleJob.position} Positions
            </Badge>
          )}
          {singleJob?.jobType && (
            <Badge
              variant="outline"
              className="border-[#108a00] text-[#108a00] capitalize"
            >
              {singleJob.jobType}
            </Badge>
          )}
          {singleJob?.salary && (
            <Badge
              variant="outline"
              className="border-[#108a00] text-[#108a00]"
            >
              {singleJob.salary} LPA
            </Badge>
          )}
          {formattedDate && (
            <span className="text-sm text-gray-500 ml-2">
              Posted on {formattedDate}
            </span>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1.2fr] gap-8">
        <div className="space-y-6">
          <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Job Details</h2>
            <ul className="space-y-3 text-gray-700 text-sm">
              {singleJob?.description && (
                <li>
                  <span className="font-medium text-gray-900">Description:</span>{" "}
                  {singleJob.description}
                </li>
              )}
              {singleJob?.experience && (
                <li>
                  <span className="font-medium text-gray-900">Experience:</span>{" "}
                  {singleJob.experience} yrs
                </li>
              )}
              {singleJob?.location && (
                <li>
                  <span className="font-medium text-gray-900">Location:</span>{" "}
                  {singleJob.location}
                </li>
              )}
              {singleJob?.applications?.length >= 0 && (
                <li>
                  <span className="font-medium text-gray-900">Total Applicants:</span>{" "}
                  {singleJob.applications.length}
                </li>
              )}
            </ul>
          </article>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <Button
              disabled={isApplied}
              onClick={!isApplied ? applyJobHandler : undefined}
              className={`w-full rounded-lg font-medium text-white ${
                isApplied ? "bg-gray-500" : "bg-[#108a00] hover:bg-[#14a800]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
            {isApplied && (
              <p className="text-xs text-center text-gray-500">
                You have already applied to this job.
              </p>
            )}
          </div>

          {company && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="font-semibold text-lg mb-3">About the Company</h3>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={company.logo} alt={company.name} />
                </Avatar>
                <div>
                  <p className="font-medium">{company.name}</p>
                  {company.location && (
                    <p className="text-sm text-gray-500">{company.location}</p>
                  )}
                </div>
              </div>
              {company.website && (
                <p className="text-sm text-gray-700 break-all">
                  <span className="font-medium text-gray-900">Website:</span>{" "}
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#108a00] hover:underline"
                  >
                    {company.website.replace(/^https?:\/\//, "")}
                  </a>
                </p>
              )}
            </div>
          )}
        </aside>
      </div>
    </section>
  );
};

export default JobDescription;
