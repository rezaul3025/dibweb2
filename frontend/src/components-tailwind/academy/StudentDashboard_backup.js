import { useState, useEffect } from 'react';
import {
  AcademicCapIcon,
  CashIcon,
  CreditCardIcon,
  DocumentTextIcon,
  MailIcon,
  UserCircleIcon,
  UserAddIcon,
  UsersIcon,
  CalendarIcon,
  ChartBarIcon,
  BellIcon,
  CogIcon,
  LogoutIcon,
  MenuIcon,
  XIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  SearchIcon
} from '@heroicons/react/outline';

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('students');
  const [activeStudent, setActiveStudent] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  // Form state for new student
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    class: '',
    rollNumber: '',
    address: '',
    totalFees: 300
  });

  // Sample data
  const [students, setStudents] = useState([
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
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '555-456-7890',
      class: '11-C',
      rollNumber: '1003',
      address: '789 Pine Rd, Village',
      feesPaid: 0,
      totalFees: 300,
      status: 'Unpaid',
      paymentHistory: []
    }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'payment', message: 'Payment received from John Doe', date: '2023-05-15', read: false },
    { id: 2, type: 'reminder', message: 'Fee due reminder for Jane Smith', date: '2023-05-10', read: true },
  ]);

  useEffect(() => {
    // Set the first student as active by default when viewing details
    if (students.length > 0 && !activeStudent && (currentView === 'details' || currentView === 'payments')) {
      setActiveStudent(students[0]);
    }
  }, [currentView]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!activeStudent || !paymentAmount) return;

    const amount = parseFloat(paymentAmount);
    const updatedStudents = students.map(student => {
      if (student.id === activeStudent.id) {
        const newPayment = {
          id: student.paymentHistory.length + 1,
          amount: amount,
          date: paymentDate,
          method: paymentMethod
        };

        const updatedPaymentHistory = [...student.paymentHistory, newPayment];
        const newFeesPaid = student.feesPaid + amount;
        const newStatus = newFeesPaid >= student.totalFees ? 'Paid' :
                         newFeesPaid > 0 ? 'Partially Paid' : 'Unpaid';

        return {
          ...student,
          feesPaid: newFeesPaid,
          status: newStatus,
          paymentHistory: updatedPaymentHistory
        };
      }
      return student;
    });

    setStudents(updatedStudents);
    setActiveStudent(updatedStudents.find(s => s.id === activeStudent.id));

    // Add notification
    const newNotification = {
      id: notifications.length + 1,
      type: 'payment',
      message: `Payment of $${amount} recorded for ${activeStudent.name}`,
      date: new Date().toISOString().split('T')[0],
      read: false
    };

    setNotifications([newNotification, ...notifications]);
    setPaymentAmount('');
    alert('Payment recorded successfully!');
  };

  const sendNotification = () => {
    if (!notificationMessage.trim() || !activeStudent) return;

    const newNotification = {
      id: notifications.length + 1,
      type: 'notification',
      message: `Message to ${activeStudent.name}: ${notificationMessage}`,
      date: new Date().toISOString().split('T')[0],
      read: false
    };

    setNotifications([newNotification, ...notifications]);
    setNotificationMessage('');
    alert('Notification sent successfully!');
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;

    const studentToAdd = {
      ...newStudent,
      id: newId,
      feesPaid: 0,
      status: 'Unpaid',
      paymentHistory: []
    };

    setStudents([...students, studentToAdd]);
    setShowAddStudentModal(false);
    setNewStudent({
      name: '',
      email: '',
      phone: '',
      class: '',
      rollNumber: '',
      address: '',
      totalFees: 300
    });

    alert('Student added successfully!');
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex flex-col w-64 bg-white">
          <div className="flex items-center justify-between h-16 px-4 bg-green-500">
            <div className="text-xl font-bold text-white">EduManage</div>
            <button onClick={() => setSidebarOpen(false)} className="text-white">
              <XIcon className="w-6 h-6" />
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
            <div className="text-xl font-bold text-white">EduManage</div>
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
            <MenuIcon className="w-6 h-6" />
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
          {/* Students List View */}
          {currentView === 'students' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Student Records</h1>
                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  <UserAddIcon className="w-5 h-5 mr-2" />
                  Add Student
                </button>
              </div>

              {/* Search bar */}
              <div className="mb-6">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Students Table */}
              <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll No
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fee Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <UserCircleIcon className="h-10 w-10 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.class}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.rollNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.status === 'Paid' ? 'bg-green-100 text-green-800' :
                            student.status === 'Unpaid' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {student.status} (${student.feesPaid}/${student.totalFees})
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              setActiveStudent(student);
                              setCurrentView('details');
                            }}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              setActiveStudent(student);
                              setCurrentView('payments');
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Payments
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Student Details View */}
          {currentView === 'details' && activeStudent && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Student Details</h1>
                <div>
                  <button
                    onClick={() => setCurrentView('students')}
                    className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Back to List
                  </button>
                  <button
                    onClick={() => setCurrentView('payments')}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Payment History
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Student Details Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg lg:col-span-1">
                  <div className="px-4 py-5 sm:px-6 bg-green-500">
                    <h3 className="text-lg font-medium text-white">Student Information</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center mb-4">
                      <UserCircleIcon className="h-16 w-16 text-gray-400" />
                      <div className="ml-4">
                        <h2 className="text-xl font-bold text-gray-800">{activeStudent.name}</h2>
                        <p className="text-sm text-gray-500">{activeStudent.class} | Roll No: {activeStudent.rollNumber}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
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
                      <div>
                        <p className="text-sm font-medium text-gray-500">Fee Status</p>
                        <p className="flex items-center">
                          <span className={`mr-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            activeStudent.status === 'Paid' ? 'bg-green-100 text-green-800' :
                            activeStudent.status === 'Unpaid' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {activeStudent.status}
                          </span>
                          ${activeStudent.feesPaid} of ${activeStudent.totalFees} paid
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg lg:col-span-2">
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
            </div>
          )}

          {/* Payments View */}
          {currentView === 'payments' && activeStudent && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Fee Payments for {activeStudent.name}</h1>
                <button
                  onClick={() => setCurrentView('students')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back to List
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Fee Status Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6 bg-green-500">
                    <h3 className="text-lg font-medium text-white">Fee Status</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
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
                </div>

                {/* Record Payment Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6 bg-green-500">
                    <h3 className="text-lg font-medium text-white">Record Payment</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <form onSubmit={handlePaymentSubmit}>
                      <div className="grid grid-cols-1 gap-4">
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
                </div>

                {/* Payment History Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg lg:col-span-3">
                  <div className="px-4 py-5 sm:px-6 bg-green-500">
                    <h3 className="text-lg font-medium text-white">Payment History</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    {activeStudent.paymentHistory.length > 0 ? (
                      <div className="overflow-x-auto">
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
                    ) : (
                      <p className="text-gray-500 text-center py-4">No payment records found</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications View */}
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
                              <CashIcon className="h-5 w-5 text-green-500" />
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

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowAddStudentModal(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <UserAddIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Student</h3>
                  <div className="mt-2">
                    <form onSubmit={handleAddStudent}>
                      <div className="grid grid-cols-1 gap-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Full Name</label>
                          <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            value={newStudent.name}
                            onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            value={newStudent.email}
                            onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone</label>
                          <input
                            type="tel"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            value={newStudent.phone}
                            onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Class</label>
                            <input
                              type="text"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                              value={newStudent.class}
                              onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                            <input
                              type="text"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                              value={newStudent.rollNumber}
                              onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Address</label>
                          <textarea
                            rows={2}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            value={newStudent.address}
                            onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Monthly Fee Amount</label>
                          <input
                            type="number"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            value={newStudent.totalFees}
                            onChange={(e) => setNewStudent({...newStudent, totalFees: parseFloat(e.target.value) || 0})}
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
                        >
                          Add Student
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddStudentModal(false)}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sidebar Components
const MobileSidebar = ({ currentView, setCurrentView, notifications }) => {
  return (
    <nav className="px-2 py-4">
      <NavItem
        icon={<UsersIcon className="w-5 h-5" />}
        title="Students"
        active={currentView === 'students'}
        onClick={() => setCurrentView('students')}
      />
      <NavItem
        icon={<CashIcon className="w-5 h-5" />}
        title="Payments"
        active={currentView === 'payments'}
        onClick={() => setCurrentView('payments')}
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
          icon={<LogoutIcon className="w-5 h-5" />}
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
        icon={<UsersIcon className="w-5 h-5" />}
        title="Students"
        active={currentView === 'students'}
        onClick={() => setCurrentView('students')}
      />
      <NavItem
        icon={<CashIcon className="w-5 h-5" />}
        title="Payments"
        active={currentView === 'payments'}
        onClick={() => setCurrentView('payments')}
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
          icon={<LogoutIcon className="w-5 h-5" />}
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

export default StudentDashboard;