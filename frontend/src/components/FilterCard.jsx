import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Noida", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "JAVA Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh", "5lakh+"],
  },
];

const FilterCard = () => {
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  const toggleValue = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selected.join(" ")));
  }, [selected, dispatch]);

  const resetHandler = () => {
    setSelected([]);
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Filter Jobs</h2>
        {selected.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-[#108a00] hover:bg-[#108a00]/10"
            onClick={resetHandler}
          >
            Reset
          </Button>
        )}
      </div>

      {filterData.map((group, gIdx) => (
        <div key={group.filterType} className="space-y-2">
          <h3 className="font-medium text-gray-800">{group.filterType}</h3>
          {group.array.map((item, idx) => {
            const id = `chk-${gIdx}-${idx}`;
            return (
              <label
                key={id}
                htmlFor={id}
                className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-700"
              >
                <Checkbox
                  id={id}
                  checked={selected.includes(item)}
                  onCheckedChange={() => toggleValue(item)}
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;