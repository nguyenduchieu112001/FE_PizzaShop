import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

function Paginations({ totalPages, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
    onPageChange(newPage);
  }
  return (
    <Pagination style={{ float: "right" }}>
      <Pagination.First
        onClick={() => {
          if (currentPage !== 1) {
            handlePageChange(1);
          }
        }}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => {
          if (currentPage !== 1) {
            handlePageChange(currentPage - 1);
          }
        }}
        disabled={currentPage === 1}
      />
      {Array.from({ length: totalPages }).map((_, index) => (
        <Pagination.Item
          key={index}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => {
          if (currentPage !== totalPages) {
            handlePageChange(currentPage + 1);
          }
        }}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => {
          if (currentPage !== totalPages) {
            handlePageChange(totalPages);
          }
        }}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}

export default Paginations;
