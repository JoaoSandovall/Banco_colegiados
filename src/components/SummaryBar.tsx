interface SummaryBarProps {
  page: 'colegiados' | 'representantes';
  totalColegiados: number;
  totalRepresentantes: number;
}

export function SummaryBar({ page, totalColegiados, totalRepresentantes }: SummaryBarProps) {
  return (
    <div className="bg-white border-b border-border py-4 px-4 md:px-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8">
      {page === 'colegiados' ? (
        <>
          <div className="flex items-baseline gap-2">
            <span className="text-[#6b7280]">Colegiados:</span>
            <span className="font-semibold text-[#003366]">{totalColegiados}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[#6b7280]">Total de Representantes:</span>
            <span className="font-semibold text-[#003366]">{totalRepresentantes}</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-baseline gap-2">
            <span className="text-[#6b7280]">Colegiados:</span>
            <span className="font-semibold text-[#003366]">{totalColegiados}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[#6b7280]">Total de Representantes:</span>
            <span className="font-semibold text-[#003366]">{totalRepresentantes}</span>
          </div>
        </>
      )}
    </div>
  );
}
