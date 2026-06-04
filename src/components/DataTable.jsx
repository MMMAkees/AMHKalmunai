import Badge from './Badge';

export default function DataTable({ columns, data, onEdit, onDelete, actions = true }) {
  if (!data.length) {
    return (
      <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-100">
        No data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {columns.map((col) => (
              <th key={col.key} className="text-left py-3 px-4 font-semibold text-gray-600 whitespace-nowrap">
                {col.label}
              </th>
            ))}
            {actions && <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id || idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4 whitespace-nowrap">
                  {col.render ? col.render(row[col.key], row) : (
                    col.badge ? <Badge variant={String(row[col.key]).toLowerCase()}>{row[col.key]}</Badge> : row[col.key]
                  )}
                </td>
              ))}
              {actions && (
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    {onEdit && (
                      <button onClick={() => onEdit(row)} className="px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(row)} className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
