import React, { useState, useEffect } from 'react';
import {
    DocumentTextIcon,
    UserCircleIcon,
    ChartBarIcon,
    BellIcon,
    CogIcon,
    ExclamationCircleIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import {HiCash} from "react-icons/hi";
import {BiLogOut} from "react-icons/bi";
import {HiMenu} from "react-icons/hi";

const AcademyAdminDashboardV2 = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeStudent, setActiveStudent] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);

  // Sample data
  const students = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-123-4567',
      class: '10-A',
      rollNumber: '1001',
      address: '123 Main St, City',
      feesPaid: 250,
      totalFees: 300,
      status: 'Partially Paid',
      paymentHistory: [
        { id: 1, amount: 100, date: '2023-04-15', method: 'Cash' },
        { id: 2, amount: 150, date: '2023-05-10', method: 'Bank Transfer' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '555-987-6543',
      class: '9-B',
      rollNumber: '1002',
      address: '456 Oak Ave, Town',
      feesPaid: 300,
      totalFees: 300,
      status: 'Paid',
      paymentHistory: [
        { id: 1, amount: 300, date: '2023-05-01', method: 'Online Payment' }
      ]
    },
    // Add more students as needed
  ];

  const notifications = [
    { id: 1, type: 'payment', message: 'Payment received from John Doe', date: '2023-05-15', read: false },
    { id: 2, type: 'reminder', message: 'Fee due reminder for Jane Smith', date: '2023-05-10', read: true },
  ];

  useEffect(() => {
    // Set the first student as active by default
    if (students.length > 0 && !activeStudent) {
      setActiveStudent(students[0]);
    }
  }, []);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    alert(`Payment of $${paymentAmount} recorded via ${paymentMethod}`);
    setPaymentAmount('');
    setNotificationMessage(`Payment of $${paymentAmount} recorded for ${activeStudent.name}`);
  };

  const sendNotification = () => {
    if (notificationMessage.trim() === '') return;
    alert(`Notification sent to ${activeStudent.name}: ${notificationMessage}`);
    setNotificationMessage('');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex flex-col w-64 bg-white">
          <div className="flex items-center justify-between h-16 px-4 bg-green-500">
            <div className="text-xl font-bold text-white">EduPay</div>
            <button onClick={() => setSidebarOpen(false)} className="text-white">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <MobileSidebar
              currentView={currentView}
              setCurrentView={setCurrentView}
              notifications={notifications}
            />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center justify-center h-16 px-4 bg-green-500">
            <div className="text-xl font-bold text-white">EduPay</div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <DesktopSidebar
              currentView={currentView}
              setCurrentView={setCurrentView}
              notifications={notifications}
            />
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
            <div className="relative">
              <button className="p-1 text-gray-400 rounded-full hover:text-gray-500">
                <BellIcon className="w-6 h-6" />
              </button>
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </div>
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-auto p-4">
          {currentView === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Student Dashboard</h1>

              {/* Student selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={activeStudent?.id || ''}
                  onChange={(e) => {
                    const student = students.find(s => s.id === parseInt(e.target.value));
                    setActiveStudent(student);
                  }}
                >
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.class} ({student.rollNumber})
                    </option>
                  ))}
                </select>
              </div>

              {activeStudent && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Student Details Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg lg:col-span-1">
                    <div className="px-4 py-5 sm:px-6 bg-green-500">
                      <h3 className="text-lg font-medium text-white">Student Information</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center mb-4">
                        <UserCircleIcon className="h-12 w-12 text-gray-400" />
                        <div className="ml-4">
                          <h2 className="text-xl font-bold text-gray-800">{activeStudent.name}</h2>
                          <p className="text-sm text-gray-500">{activeStudent.class} | Roll No: {activeStudent.rollNumber}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="text-sm text-gray-800">{activeStudent.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone</p>
                          <p className="text-sm text-gray-800">{activeStudent.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Address</p>
                          <p className="text-sm text-gray-800">{activeStudent.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fee Status and Payment Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg lg:col-span-2">
                    <div className="px-4 py-5 sm:px-6 bg-green-500">
                      <h3 className="text-lg font-medium text-white">Fee Payment</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="mb-6">
                        <h4 className="text-md font-medium text-gray-800 mb-2">Fee Status</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-gray-500">Total Fees</p>
                            <p className="text-xl font-bold text-gray-800">${activeStudent.totalFees}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-gray-500">Paid Amount</p>
                            <p className="text-xl font-bold text-gray-800">${activeStudent.feesPaid}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-gray-500">Balance</p>
                            <p className="text-xl font-bold text-gray-800">${activeStudent.totalFees - activeStudent.feesPaid}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-gray-500">Status</p>
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              activeStudent.status === 'Paid' ? 'bg-green-100 text-green-800' :
                              activeStudent.status === 'Unpaid' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {activeStudent.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-md font-medium text-gray-800 mb-2">Record Payment</h4>
                        <form onSubmit={handlePaymentSubmit}>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Amount</label>
                              <input
                                type="number"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                              <select
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                              >
                                <option value="cash">Cash</option>
                                <option value="bank">Bank Transfer</option>
                                <option value="online">Online Payment</option>
                                <option value="card">Credit/Debit Card</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Date</label>
                              <input
                                type="date"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <button
                              type="submit"
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Record Payment
                            </button>
                          </div>
                        </form>
                      </div>

                      <div>
                        <h4 className="text-md font-medium text-gray-800 mb-2">Payment History</h4>
                        <div className="overflow-hidden border border-gray-200 rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {activeStudent.paymentHistory.map((payment) => (
                                <tr key={payment.id}>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">${payment.amount}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{payment.method}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    <button className="text-green-500 hover:text-green-700">
                                      <DocumentTextIcon className="h-5 w-5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notification Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg lg:col-span-3">
                    <div className="px-4 py-5 sm:px-6 bg-green-500">
                      <h3 className="text-lg font-medium text-white">Send Notification</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Message to {activeStudent.name}</label>
                        <textarea
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                          value={notificationMessage}
                          onChange={(e) => setNotificationMessage(e.target.value)}
                          placeholder="Enter notification message..."
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={sendNotification}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Send Notification
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentView === 'notifications' && (
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-green-500">
                <h3 className="text-lg font-medium text-white">Notifications</h3>
              </div>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {notifications.map((notification) => (
                    <li key={notification.id}>
                      <div className={`px-4 py-4 sm:px-6 ${!notification.read ? 'bg-green-50' : ''}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {notification.type === 'payment' ? (
                              <HiCash className="h-5 w-5 text-green-500" />
                            ) : (
                              <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />
                            )}
                            <p className="ml-3 text-sm font-medium text-gray-900 truncate">
                              {notification.message}
                            </p>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="text-xs text-gray-500">{notification.date}</p>
                            {!notification.read && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sidebar Components
const MobileSidebar = ({ currentView, setCurrentView, notifications }) => {
  return (
    <nav className="px-2 py-4">
      <NavItem
        icon={<ChartBarIcon className="w-5 h-5" />}
        title="Dashboard"
        active={currentView === 'dashboard'}
        onClick={() => setCurrentView('dashboard')}
      />
      <NavItem
        icon={<BellIcon className="w-5 h-5" />}
        title="Notifications"
        active={currentView === 'notifications'}
        onClick={() => setCurrentView('notifications')}
        badge={notifications.filter(n => !n.read).length}
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

const DesktopSidebar = ({ currentView, setCurrentView, notifications }) => {
  return (
    <nav className="px-2 py-4">
      <NavItem
        icon={<ChartBarIcon className="w-5 h-5" />}
        title="Dashboard"
        active={currentView === 'dashboard'}
        onClick={() => setCurrentView('dashboard')}
      />
      <NavItem
        icon={<BellIcon className="w-5 h-5" />}
        title="Notifications"
        active={currentView === 'notifications'}
        onClick={() => setCurrentView('notifications')}
        badge={notifications.filter(n => !n.read).length}
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

const NavItem = ({ icon, title, active, onClick, badge }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full px-2 py-3 text-sm font-medium rounded-md ${active ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
    >
      <div className="flex items-center">
        <span className={`mr-3 ${active ? 'text-green-500' : 'text-gray-400'}`}>
          {icon}
        </span>
        {title}
      </div>
      {badge > 0 && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {badge}
        </span>
      )}
    </button>
  );
};

export default AcademyAdminDashboardV2;