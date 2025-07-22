import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Pen, Mail, Contact } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((s) => s.auth);
  const appliedJobs = useSelector((s) => s.job.appliedJobs) || [];
  const appliedCount = appliedJobs.length;
  const isResume = Boolean(user?.profile?.resume);

  return (
    <>
      <Navbar />

      <header className="max-w-5xl mx-auto mt-8 px-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <Avatar className="h-24 w-24 border">
              <AvatarImage
                src={user?.profile?.profilePhoto ||
                  "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                alt={user?.fullname}
              />
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">{user?.fullname}</h1>
              {user?.profile?.location && (
                <p className="text-sm text-gray-500">{user.profile.location}</p>
              )}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setOpen(true)}
            className="rounded-full hover:border-[#108a00]"
          >
            <Pen className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto mt-8 px-4 grid grid-cols-1 lg:grid-cols-[1.1fr_2fr] gap-8">
        <aside className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
            <p className="text-sm text-gray-500">Jobs Applied</p>
            <p className="text-3xl font-bold text-[#108a00] mt-2">{appliedCount}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
            <h3 className="font-semibold mb-2">Contact</h3>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Mail className="h-4 w-4" /> <span>{user?.email}</span>
            </div>
            {user?.phoneNumber && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Contact className="h-4 w-4" /> <span>{user.phoneNumber}</span>
              </div>
            )}
          </div>
        </aside>

        <section className="space-y-6">
          {user?.profile?.bio && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {user.profile.bio}
              </p>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((skill, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="border-[#108a00] text-[#108a00]"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-gray-500">NA</span>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <Label className="font-semibold mb-2 block">Resume</Label>
            {isResume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noreferrer"
                className="text-[#108a00] hover:underline break-all"
              >
                {user.profile.resumeOriginalName}
              </a>
            ) : (
              <span className="text-sm text-gray-500">NA</span>
            )}
          </div>
        </section>
      </main>

      <section className="max-w-5xl mx-auto mt-12 px-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </section>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Profile;