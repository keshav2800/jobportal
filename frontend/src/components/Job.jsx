import React from "react";
import {
  Bookmark,
  MapPin,
  Users,
  IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgo = (mongodbTime) => {
    const created = new Date(mongodbTime);
    return Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24));
  };
  console.log(job);

  return (
    <div
      className="w-full bg-white border border-gray-200 hover:border-[#108a00] rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border border-gray-200">
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-gray-800">
              {job?.company?.name}
            </h3>
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job?.location || "India"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <span className="text-xs text-gray-500">
            {daysAgo(job?.createdAt) === 0
              ? "Today"
              : `${daysAgo(job?.createdAt)} days ago`}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:border-[#108a00]"
          >
            <Bookmark className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900">{job?.title}</h2>

      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant="outline"
          className="border-[#108a00] text-[#108a00] font-medium"
        >
          <Users className="h-4 w-4 mr-1" /> {job?.position} positions
        </Badge>
        <Badge
          variant="outline"
          className="border-[#108a00] text-[#108a00] font-medium capitalize"
        >
          {job?.jobType}
        </Badge>
        <Badge
          variant="outline"
          className="border-[#108a00] text-[#108a00] font-medium"
        >
          <IndianRupee className="h-4 w-4 mr-1" /> {job?.salary} LPA
        </Badge>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
        {job?.description}
      </p>

      <div className="flex flex-wrap gap-4 mt-2">
        <Button
          variant="outline"
          className="border-[#108a00] text-[#108a00] hover:bg-[#108a00]/10"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#108a00] hover:bg-[#14a800] text-white">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;