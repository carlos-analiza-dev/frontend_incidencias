import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

interface Props {
  offset: number;
  handlePrev: () => void;
  limit: number;
  total: number;
  handleNext: () => void;
}

const PaginacionAccionesIdicencias = ({
  handleNext,
  handlePrev,
  limit,
  offset,
  total,
}: Props) => {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex gap-4 items-center">
        <ArrowLeftToLine
          className={`cursor-pointer ${
            offset === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrev}
        />
        <span className="text-sm text-gray-600">
          Página {Math.floor(offset / limit) + 1}
        </span>
        <ArrowRightToLine
          className={`cursor-pointer ${
            offset + limit >= total ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default PaginacionAccionesIdicencias;
