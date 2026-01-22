import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">Student Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">📚 Courses</div>
        <div className="p-6 bg-white rounded shadow">💡 Skills</div>
        <div className="p-6 bg-white rounded shadow">📝 Notes</div>
      </div>
    </div>
  );
};

export default Dashboard;
