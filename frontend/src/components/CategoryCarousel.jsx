import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import {
  Code2,
  Palette,
  BrainCircuit,
  Handshake,
  PenTool,
  Briefcase,
  Wallet,
  Scale,
  UsersRound,
  Ruler,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

// Category configuration – label, lucide icon
const categories = [
  { label: "Development & IT", icon: Code2 },
  { label: "Design & Creative", icon: Palette },
  { label: "AI Services", icon: BrainCircuit },
  { label: "Sales & Marketing", icon: Handshake },
  { label: "Writing & Translation", icon: PenTool },
  { label: "Admin & Support", icon: Briefcase },
  { label: "Finance & Accounting", icon: Wallet },
  { label: "Legal", icon: Scale },
  { label: "HR & Training", icon: UsersRound },
  { label: "Engineering & Architecture", icon: Ruler },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="max-w-7xl mx-auto mt-24 px-4">
      <h2 className="text-4xl md:text-5xl font-bold mb-12">Explore millions of pros</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categories.map(({ label, icon: Icon }) => (
          <Card
            key={label}
            onClick={() => searchJobHandler(label)}
            className="cursor-pointer rounded-2xl border hover:shadow-md transition p-8 flex flex-col justify-start gap-6"
          >
            <Icon className="h-10 w-10 text-green-600" strokeWidth={2.2} />
            <CardContent className="p-0 text-left text-lg font-medium leading-snug">
              {label}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CategoryCarousel;
