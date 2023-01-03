import cn from "classnames";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageButton = ({
  page,
  currentPage,
  onPageChange,
}: {
  page: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <button
      className={cn(
        "font-bold text-[10px] md:text-sm rounded-full w-8 h-8 md:w-10 md:h-10 flex justify-center items-center bg-primary text-white bg-opacity-30",
        {
          "bg-opacity-100": page === currentPage,
        }
      )}
      onClick={() => onPageChange(page)}
    >
      {page}
    </button>
  );
};

const TablePagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const goToBeforePage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-end mt-8 gap-4">
      <button
        className="rounded-full px-4 py-2 border bg-transparent text-primary border-primary text-[10px] md:text-base"
        onClick={goToBeforePage}
      >
        Anterior
      </button>
      <div className="flex gap-2 items-center">
        <PageButton
          page={currentPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        {currentPage < totalPages && (
          <PageButton
            page={currentPage + 1}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}

        {currentPage + 1 < totalPages && (
          <PageButton
            page={currentPage + 2}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
      </div>

      <button
        className="rounded-full px-4 py-2 border bg-transparent text-primary border-primary text-[10px] md:text-base"
        onClick={goToNextPage}
      >
        Siguiente
      </button>
    </div>
  );
};

export default TablePagination;
