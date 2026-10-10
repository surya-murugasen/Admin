const fs = require('fs');
let code = fs.readFileSync('app/activity/page.tsx', 'utf8');

code = code.replace(
  '        <div className="overflow-x-auto">',
  `        <div className="overflow-x-auto">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FileText className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Activity Logs Yet</h3>
              <p className="text-slate-500 dark:text-slate-400">There are no activity logs recorded in the database.</p>
            </div>
          ) : (`
);

code = code.replace(
  '            </table>',
  `            </table>
          )}`
);

code = code.replace('mockLogs.map(log', 'logs.map((log: any)');
code = code.replace(
  '{log.timestamp}</td>',
  `{new Date(log.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>`
);
code = code.replace(/10 of [\d,]+ entries/, '{logs.length} of {logs.length} entries');

fs.writeFileSync('app/activity/page.tsx', code);
