import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

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
           className={`px-4 py-2 rounded-lg font-medium transition-colors ${
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
           className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-200"
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
           className={`px-4 py-2 rounded-lg font-medium transition-colors ${
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
           className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-200"
         >
           {totalPages}
         </button>
       );
     }
     return renderedPages;
   };

   return (
     <div className="flex justify-center mt-8">
       <div className="flex items-center space-x-2 bg-white rounded-lg shadow-md p-2">
         <button
           onClick={() => onPageChange(currentPage - 1)}
           disabled={currentPage === 1}
           className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
         >
           <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
         </button>
         {renderPageNumbers()}
         <button
           onClick={() => onPageChange(currentPage + 1)}
           disabled={currentPage === totalPages}
           className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
         >
           <ChevronRightIcon className="w-5 h-5 text-gray-600" />
         </button>
       </div>
     </div>
   );
 };