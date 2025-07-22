import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { setSearchedQuery } from "@/redux/jobSlice";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="relative mt-6 px-4 sm:px-8">
      <div
        className="relative overflow-hidden rounded-3xl bg-cover bg-center bg-[url(/hero.jpg)]"
      >
        <div className="flex flex-col gap-12 py-24 sm:py-32 lg:py-40 text-white text-center lg:text-left px-6 lg:px-16">
          <h1 className="font-bold leading-tight text-4xl sm:text-5xl md:text-6xl max-w-3xl mx-auto lg:mx-0">
            Connecting companies in need to job seekers who deliver
          </h1>

          <div className="mx-auto lg:mx-0 w-full max-w-2xl rounded-2xl bg-black/70 backdrop-blur-sm p-8 shadow-2xl">
            <Tabs defaultValue="find-talent" className="w-full">
              <TabsList className="mx-auto mb-6 grid w-full grid-cols-2 bg-white/20 rounded-full p-1">
                <TabsTrigger
                  value="find-talent"
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  Find talent
                </TabsTrigger>
                <TabsTrigger
                  value="browse-jobs"
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  Browse jobs
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex rounded-full overflow-hidden shadow-lg bg-white/90">
              <Input
                type="text"
                placeholder="Search by role, skills, or keywords"
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-black placeholder:text-gray-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                onClick={handleSearch}
                className="rounded-none rounded-r-full px-6 bg-[#108a00] hover:bg-[#14a800]"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Brand strip */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 opacity-90 filter grayscale">
              <img src="/microsoft.svg" alt="Microsoft" className="h-6 w-auto opacity-80" loading="lazy" />
              <img src="/airbnb.svg" alt="Airbnb" className="h-6 w-auto opacity-80" loading="lazy" />
              <img src="/bissell.svg" alt="Bissell" className="h-6 w-auto opacity-80" loading="lazy" />
              <img src="/glassdoor.svg" alt="Glassdoor" className="h-6 w-auto opacity-80" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;