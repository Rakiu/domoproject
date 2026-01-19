import React from "react";
import Landing from "./Landing";
import Collections from "./Collections";

const PublicHome = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* YouTube Search */}
      <Landing isPublic />

      {/* View-only Collections */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          Public Collections
        </h2>
        <Collections readOnly />
      </div>
    </div>
  );
};

export default PublicHome;
