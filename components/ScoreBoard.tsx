import React from 'react';
import { Score, ScoreBoardProps } from '../types/interface';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';


const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {

  const columns: ColumnDef<Score>[] = [
    {
      header: 'Kullanıcı',
      accessorKey: 'username',
      meta: { className: "max-w-32"}
    },
    {
      header: 'Toplam Tahmin',
      accessorKey: 'total_guess',
      meta: { className: "w-20"}
    },
    {
      header: 'Doğru Tahmin',
      accessorKey: 'guess_right',
      meta: { className: "w-20"}
    },
    {
      header: 'Başarı (%)',
      accessorKey: 'accuracy',
      meta: { className: "w-20"}
    },
    {
      header: 'Süre',
      accessorKey: 'timer',
      meta: { className: "w-20"}
    },
    {
      header: 'Zorluk',
      accessorKey: 'difficulty',
      meta: { className: "w-20"}
    },
  ];

  const table = useReactTable({
    data: scores,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="overflow-x-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Geçmiş Skorlar</h2>
      <table className="border border-gray-300 table-auto">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className={`p-2 text-center border-b border-gray-300 overflow-hidden text-ellipsis whitespace-nowrap ${header.column.columnDef.meta?.className || ''}`}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="even:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className={`p-2 text-center border-b border-gray-200 overflow-hidden text-ellipsis whitespace-nowrap ${cell.column.columnDef.meta?.className || ''}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
