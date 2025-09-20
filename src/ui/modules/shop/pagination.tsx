"use client";

import React from "react";
interface PaginationProps {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
 }

 // Composant de pagination
export const Pagination = ({
   currentPage,
   totalPages,
   onPageChange,
 }: PaginationProps) => {
   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

   const renderPageNumbers = () => {
     if (totalPages <= 7) {
       return pages.map((page) => (
         <button
           key={page}
           onClick={() => onPageChange(page)}
           className={`px-4 py-2 border-1 rounded-lg font-medium transition-colors ${
             currentPage === page
               ? "bg-primary text-white"
               : "text-gray-600 hover:bg-gray-200"
           }`}
         >
           {page}
         </button>
       ));
     }

     const start = Math.max(1, currentPage - 2);
     const end = Math.min(totalPages, currentPage + 2);
     const renderedPages = [];

     if (start > 1) {
       renderedPages.push(
         <button
           key={1}
           onClick={() => onPageChange(1)}
           className="px-4 py-2 border rounded-md font-medium text-gray-600 hover:bg-gray-200"
         >
           1
         </button>
       );
       if (start > 2) {
         renderedPages.push(
           <span key="ellipsis-start" className="px-2">
             ...
           </span>
         );
       }
     }

     for (let i = start; i <= end; i++) {
       renderedPages.push(
         <button
           key={i}
           onClick={() => onPageChange(i)}
           className={`px-4 py-2 border rounded-md font-medium transition-colors ${
             currentPage === i
               ? "bg-primary text-white"
               : "text-gray-600 hover:bg-gray-200"
           }`}
         >
           {i}
         </button>
       );
     }

     if (end < totalPages) {
       if (end < totalPages - 1) {
         renderedPages.push(
           <span key="ellipsis-end" className="px-2">
             ...
           </span>
         );
       }
       renderedPages.push(
         <button
           key={totalPages}
           onClick={() => onPageChange(totalPages)}
           className="px-4 py-2 rounded-lg border font-medium text-gray-600 hover:bg-gray-200"
         >
           {totalPages}
         </button>
       );
     }
     return renderedPages;
   }; 

   return (
     <div className="flex justify-center items-center space-x-2 mt-8">
       <button
         onClick={() => onPageChange(currentPage - 1)}
         disabled={currentPage === 1}
         className="px-4 py-2 border rounded-md text-gray-700 disabled:opacity-50"
       >
         Précédent
       </button>
       {renderPageNumbers()}
       <button
         onClick={() => onPageChange(currentPage + 1)}
         disabled={currentPage === totalPages}
         className="px-4 py-2 border rounded-md text-gray-700 disabled:opacity-50"
       >
         Suivant
       </button>
     </div>
   );
 };