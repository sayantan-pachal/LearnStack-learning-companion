import React from "react";
import { Search } from "lucide-react";
import CustomDropdown from "../../components/Other/CustomDropdown";

const ResourceFilters = ({
  searchQuery,
  setSearchQuery,
  selectedDept,
  setSelectedDept,
  selectedSemester,
  setSelectedSemester,
  resourceDeptOptions,
  resourceSemOptions
}) => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-12 relative z-10">
      <div className="relative w-full md:flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for tutorials, notes, guides..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent outline-none transition-all shadow-sm"
        />
      </div>

      <div className="flex flex-row gap-4 w-full md:w-2/5">
        <div className="relative w-1/2 z-20">
          <CustomDropdown value={selectedDept} options={resourceDeptOptions} onChange={(e) => setSelectedDept(e.target.value)} />
        </div>
        <div className="relative w-1/2 z-10">
          <CustomDropdown value={selectedSemester} options={resourceSemOptions} onChange={(e) => setSelectedSemester(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default ResourceFilters;