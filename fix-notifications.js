const fs = require('fs');
let code = fs.readFileSync('app/notifications/page.tsx', 'utf8');

code = code.replace(
  'import { Search, Filter, Check, Bell, AlertTriangle, Info, Shield, CheckCircle2, MoreHorizontal, ChevronLeft, ChevronRight } from \\'lucide-react\\'',
  'import { Search, Filter, Check, Bell, AlertTriangle, Info, Shield, CheckCircle2, MoreHorizontal, ChevronLeft, ChevronRight } from \\'lucide-react\\'\nimport { DataService } from \\'../lib/data-service\\''
);

code = code.replace(
  'export default function NotificationsPage() {',
  'export default async function NotificationsPage() {\n  const notifications = await DataService.getNotifications()'
);

// Remove mockNotifications
code = code.replace(/const mockNotifications = \[[\s\S]*?\]\n/, '');

code = code.replace(
  '        <div className="overflow-x-auto">',
  `        <div className="overflow-x-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Bell className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Notifications</h3>
              <p className="text-slate-500 dark:text-slate-400">You're all caught up! There are no new notifications.</p>
            </div>
          ) : (`
);

code = code.replace(
  '            </table>',
  `            </table>
          )}`
);

code = code.replace('mockNotifications.map(notif', 'notifications.map((notif: any)');
code = code.replace('1 to 7 of 12', '1 to {notifications.length} of {notifications.length}');

fs.writeFileSync('app/notifications/page.tsx', code);
