import React, { useState } from 'react';
import {
  AcademicCapIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  BellIcon,
  CogIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import {BiLogOut} from "react-icons/bi";
import {HiMenu} from "react-icons/hi";

const AcademyAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('students');

  // Sample data
  const students = [
    { id: 1, name: 'John Doe', class: '10-A', feesPaid: 250, totalFees: 300, status: 'Partially Paid' },
    { id: 2, name: 'Jane Smith', class: '9-B', feesPaid: 300, totalFees: 300, status: 'Paid' },
    { id: 3, name: 'Mike Johnson', class: '11-C', feesPaid: 0, totalFees: 300, status: 'Unpaid' },
    { id: 4, name: 'Sarah Williams', class: '8-A', feesPaid: 300, totalFees: 300, status: 'Paid' },
    { id: 5, name: 'David Brown', class: '12-B', feesPaid: 150, totalFees: 300, status: 'Partially Paid' },
  ];

  const payments = [
    { id: 1, student: 'John Doe', amount: 250, date: '2023-05-15', method: 'Cash' },
    { id: 2, student: 'Jane Smith', amount: 300, date: '2023-05-10', method: 'Bank Transfer' },
    { id: 3, student: 'Sarah Williams', amount: 300, date: '2023-05-05', method: 'Online Payment' },
    { id: 4, student: 'David Brown', amount: 150, date: '2023-05-20', method: 'Cash' },
  ];

  const stats = {
    totalStudents: 125,
    paidStudents: 89,
    unpaidStudents: 36,
    totalRevenue: 26700,
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex flex-col w-64 bg-white">
          <div className="flex items-center justify-between h-16 px-4 bg-green-500">
            <div className="text-xl font-bold text-white">EduManage</div>
            <button onClick={() => setSidebarOpen(false)} className="text-white">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <MobileSidebar currentView={currentView} setCurrentView={setCurrentView} />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center justify-center h-16 px-4 bg-green-500">
            <div className="text-xl font-bold text-white">EduManage</div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <DesktopSidebar currentView={currentView} setCurrentView={setCurrentView} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
          <button
            className="text-gray-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-4">
            <button className="p-1 text-gray-400 rounded-full hover:text-gray-500">
              <BellIcon className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-auto p-4">
          {/* Stats cards */}
          <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              icon={<UserGroupIcon className="w-8 h-8 text-white" />}
              title="Total Students"
              value={stats.totalStudents}
              color="bg-green-500"
            />
            <StatsCard
              icon={<AcademicCapIcon className="w-8 h-8 text-white" />}
              title="Paid Students"
              value={stats.paidStudents}
              color="bg-blue-500"
            />
            <StatsCard
              icon={<AcademicCapIcon className="w-8 h-8 text-white" />}
              title="Unpaid Students"
              value={stats.unpaidStudents}
              color="bg-red-500"
            />
            <StatsCard
              icon={<CurrencyDollarIcon className="w-8 h-8 text-white" />}
              title="Total Revenue"
              value={`$${stats.totalRevenue}`}
              color="bg-purple-500"
            />
          </div>

          {/* Main content */}
          <div className="mt-8">
            {currentView === 'students' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">Student Records</h2>
                  <button className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
                    Add New Student
                  </button>
                </div>
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                  <StudentTable students={students} />
                </div>
              </div>
            )}

            {currentView === 'payments' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">Payment Records</h2>
                  <button className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
                    Record Payment
                  </button>
                </div>
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                  <PaymentTable payments={payments} />
                </div>
              </div>
            )}

            {currentView === 'reports' && (
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reports</h2>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Charts and reports will be displayed here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Components
const MobileSidebar = ({ currentView, setCurrentView }) => {
  return (
    <nav className="px-2 py-4">
      <NavItem
        icon={<UserGroupIcon className="w-5 h-5" />}
        title="Students"
        active={currentView === 'students'}
        onClick={() => setCurrentView('students')}
      />
      <NavItem
        icon={<CurrencyDollarIcon className="w-5 h-5" />}
        title="Payments"
        active={currentView === 'payments'}
        onClick={() => setCurrentView('payments')}
      />
      <NavItem
        icon={<ChartBarIcon className="w-5 h-5" />}
        title="Reports"
        active={currentView === 'reports'}
        onClick={() => setCurrentView('reports')}
      />
      <NavItem
        icon={<CalendarIcon className="w-5 h-5" />}
        title="Calendar"
        active={currentView === 'calendar'}
        onClick={() => setCurrentView('calendar')}
      />
      <div className="pt-4 mt-4 border-t border-gray-200">
        <NavItem
          icon={<CogIcon className="w-5 h-5" />}
          title="Settings"
          active={currentView === 'settings'}
          onClick={() => setCurrentView('settings')}
        />
        <NavItem
          icon={<BiLogOut className="w-5 h-5" />}
          title="Logout"
          active={currentView === 'logout'}
          onClick={() => setCurrentView('logout')}
        />
      </div>
    </nav>
  );
};

const DesktopSidebar = ({ currentView, setCurrentView }) => {
  return (
    <nav className="px-2 py-4">
      <NavItem
        icon={<UserGroupIcon className="w-5 h-5" />}
        title="Students"
        active={currentView === 'students'}
        onClick={() => setCurrentView('students')}
      />
      <NavItem
        icon={<CurrencyDollarIcon className="w-5 h-5" />}
        title="Payments"
        active={currentView === 'payments'}
        onClick={() => setCurrentView('payments')}
      />
      <NavItem
        icon={<ChartBarIcon className="w-5 h-5" />}
        title="Reports"
        active={currentView === 'reports'}
        onClick={() => setCurrentView('reports')}
      />
      <NavItem
        icon={<CalendarIcon className="w-5 h-5" />}
        title="Calendar"
        active={currentView === 'calendar'}
        onClick={() => setCurrentView('calendar')}
      />
      <div className="pt-4 mt-4 border-t border-gray-200">
        <NavItem
          icon={<CogIcon className="w-5 h-5" />}
          title="Settings"
          active={currentView === 'settings'}
          onClick={() => setCurrentView('settings')}
        />
        <NavItem
          icon={<BiLogOut className="w-5 h-5" />}
          title="Logout"
          active={currentView === 'logout'}
          onClick={() => setCurrentView('logout')}
        />
      </div>
    </nav>
  );
};

const NavItem = ({ icon, title, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-2 py-3 text-sm font-medium rounded-md ${active ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
    >
      <span className={`mr-3 ${active ? 'text-green-500' : 'text-gray-400'}`}>
        {icon}
      </span>
      {title}
    </button>
  );
};

const StatsCard = ({ icon, title, value, color }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 p-3 rounded-md ${color}`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-semibold text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentTable = ({ students }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            ID
          </th>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Name
          </th>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Class
          </th>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Fees Paid
          </th>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Total Fees
          </th>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Status
          </th>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {students.map((student) => (
          <tr key={student.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{student.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${student.feesPaid}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${student.totalFees}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                student.status === 'Paid' ? 'bg-green-100 text-green-800' :
                student.status === 'Unpaid' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {student.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
              <button className="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const PaymentTable = ({ payments }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            ID
          </th>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Student
          </th>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Amount
          </th>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Date
          </th>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Method
          </th>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {payments.map((payment) => (
          <tr key={payment.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{payment.student}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${payment.amount}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.method}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button className="text-green-600 hover:text-green-900 mr-3">View</button>
              <button className="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AcademyAdminDashboard;