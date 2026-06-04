import PageHeader from '../../components/PageHeader';
import { FaFilePdf, FaFileExcel, FaDownload } from 'react-icons/fa';

const reports = [
  { id: 1, title: 'Daily Patient Report', description: 'Summary of all patients served today including department breakdown', date: '2026-06-04' },
  { id: 2, title: 'Monthly Patient Report', description: 'Comprehensive monthly patient statistics and trends', date: 'May 2026' },
  { id: 3, title: 'Queue Performance Report', description: 'Average wait times, queue lengths, and department efficiency metrics', date: '2026-06-04' },
  { id: 4, title: 'Doctor Activity Report', description: 'Doctor consultation counts, availability, and utilization rates', date: '2026-06-04' },
];

export default function AdminReports() {
  return (
    <div>
      <PageHeader title="Reports" subtitle="Generate and export hospital reports" />

      <div className="grid sm:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                <FaDownload className="text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                <p className="text-xs text-gray-400 mt-2">Last generated: {report.date}</p>
                <div className="flex gap-2 mt-4">
                  <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    <FaFilePdf /> Export PDF
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <FaFileExcel /> Export Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
