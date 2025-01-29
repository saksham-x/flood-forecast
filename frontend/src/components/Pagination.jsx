import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6">
      <button
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-l"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-white border">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-r"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
