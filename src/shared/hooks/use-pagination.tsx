'use client';
import { useState } from 'react';

export const usePagination = (totalItems: number, itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const changePage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(totalPages, currentPage + 2);

            if (currentPage <= 3) {
                end = 5;
            } else if (currentPage >= totalPages - 2) {
                start = totalPages - 4;
            }

            for (let i = start; i <= end; i++) pages.push(i);
            if (start > 1) pages.unshift('...');
            if (end < totalPages) pages.push('...');
        }

        return pages;
    };

    return { currentPage, totalPages, changePage, getPageNumbers, setCurrentPage };
};
