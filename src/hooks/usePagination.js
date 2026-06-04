import { useState, useMemo } from 'react';
import { ITEMS_PER_PAGE } from '../utils/constants';

export function usePagination(data, itemsPerPage = ITEMS_PER_PAGE) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const resetPage = () => setCurrentPage(1);

  return { currentPage, totalPages, paginatedData, goToPage, resetPage, setCurrentPage };
}
