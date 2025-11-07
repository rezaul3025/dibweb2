import React, {useEffect, useState} from 'react';
import {
  BellIcon,
  CogIcon,
  DocumentTextIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
  UsersIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import {HiCash, HiMenu, HiSearch, HiUserAdd} from "react-icons/hi";
import {BiLogOut} from "react-icons/bi";
import Dropdown from "./Dropdown";
import PaymentReceiptModal from "./PaymentReceiptModal";
import A4FeeReceipt from "./A4FeeReceipt";
import Popup from "../utils/Popup";
import moment from "moment";

const AcademyAdminDashboardV3 = () => {
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
        first_name: '',
        last_name: '',
        address: '',
        email: '',
        phone_number: '',
        shift: '',
        classes: '',
        monthly_fee : 50,
        sibling: false
    });

    // Sample data
    const [students, setStudents] = useState([]);

    const [showReceipt, setShowReceipt] = useState(false);

      const handleShowReceiptClick = () => {
        setShowReceipt(true);  // show component
      };

    const [notifications, setNotifications] = useState([
        {id: 1, type: 'payment', message: 'Payment received from John Doe', date: '2023-05-15', read: false},
        {id: 2, type: 'reminder', message: 'Fee due reminder for Jane Smith', date: '2023-05-10', read: true},
    ]);

    useEffect(() => {
        const fetchStudents = async () => {
          try {
            const response = await fetch('/api/v1/students/');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // 🔄 Adapt backend response to your state shape
            const formattedStudents = data.map((student) => ({
              id: student.id,
              first_name: student.first_name,
              last_name: student.last_name,
              email: student.email,
              phone_number: student.phone_number,
              classes: student.classes[0]?.name,
              shift: student.shift?.name || student.shift || '', // adapt based on API
              address: student.address,
              siblings: student.siblings ? 'true' : 'false',
              paymentHistory : student.payments
            }));

            setStudents(formattedStudents);
          } catch (error) {
            console.error('Error fetching students:', error);
          }
        };

        fetchStudents().then(r => {});

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
        first_name: '',
        last_name: '',
        address: '',
        email: '',
        phone_number: '',
        shift: '',
        class: '',
        monthly_fee : '',
        sibling: false
    });

        alert('Student added successfully!');
    };

    const filteredStudents = students.filter(student =>
        student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDropdownChange = (field, selectedValue) => {
    setNewStudent(prev => ({ ...prev, [field]: selectedValue }));
  };

    const handleSubmit = async (e) => {
        alert(newStudent);
        e.preventDefault();

        const payload = {
          first_name: newStudent.first_name,
          last_name: newStudent.last_name,
          address: newStudent.address,
          email: newStudent.email,
          phone_number: newStudent.phone_number,
          shift: parseInt(newStudent.shift), // match Django field
          classes: [parseInt(newStudent.classes)], // expects a list of IDs
          monthly_fee: parseInt(newStudent.monthly_fee || 0),
          siblings: newStudent.sibling
        };

        try {
          const response = await fetch('/api/v1/students/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value,
            },
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Student added:', data);
            alert('Student added successfully!');
          } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
            alert('Error adding student: ' + JSON.stringify(errorData));
          }
        } catch (error) {
          console.error('Network error:', error);
          alert('Network error occurred.');
        }
  };

    const receiptData = {
    receiptNo: 'INV-2025-00123',
    date: '2025-11-07',
    studentName: 'Aisha Rahman',
    amount: '€120.00',
    method: 'Card',
    note: 'Monthly fee - November'
  };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                <div className="relative flex flex-col w-64 bg-white">
                    <div className="flex items-center justify-between h-16 px-4 bg-green-500">
                        <div className="text-xl font-bold text-white">EduManage</div>
                        <button onClick={() => setSidebarOpen(false)} className="text-white">
                            <XMarkIcon className="w-6 h-6"/>
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
                        <HiMenu className="w-6 h-6"/>
                    </button>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button className="p-1 text-gray-400 rounded-full hover:text-gray-500">
                                <BellIcon className="w-6 h-6"/>
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
                                    <HiUserAdd className="w-5 h-5 mr-2"/>
                                    Add Student
                                </button>
                            </div>

                            {/* Search bar */}
                            <div className="mb-6">
                                <div className="relative rounded-md shadow-sm">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <HiSearch className="w-5 h-5 text-gray-400"/>
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
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             Name
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                         <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Phone
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Shift
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Classes
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Sibling
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredStudents.map((student) => (
                                        <tr key={student.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <UserCircleIcon className="h-10 w-10 text-gray-400"/>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div
                                                            className="text-sm font-medium text-gray-900">{student.first_name} {student.last_name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.address}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.phone_number}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.shift}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.classes}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.siblings==='true'?'Yes':'No'}
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
                                            <UserCircleIcon className="h-16 w-16 text-gray-400"/>
                                            <div className="ml-4">
                                                <h2 className="text-xl font-bold text-gray-800">{activeStudent.name}</h2>
                                                <p className="text-sm text-gray-500">{activeStudent.class} | Roll
                                                    No: {activeStudent.rollNumber}</p>
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
                                            <label className="block text-sm font-medium text-gray-700">Message
                                                to {activeStudent.name}</label>
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
                                <h1 className="text-2xl font-bold text-gray-800">Fee Payments
                                    for {activeStudent.first_name+' '+activeStudent.last_name}</h1>
                                <button
                                    onClick={() => setCurrentView('students')}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Back to List
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                {/* Fee Status Card */}
                                {/*<div className="bg-white overflow-hidden shadow rounded-lg">
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
                                                <span
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        activeStudent.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                                            activeStudent.status === 'Unpaid' ? 'bg-red-100 text-red-800' :
                                                                'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                  {activeStudent.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>*/}

                                {/* Record Payment Card */}
                                {/*<div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:px-6 bg-green-500">
                                        <h3 className="text-lg font-medium text-white">Record Payment</h3>
                                    </div>
                                    <div className="px-4 py-5 sm:p-6">
                                        <form onSubmit={handlePaymentSubmit}>
                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <label
                                                        className="block text-sm font-medium text-gray-700">Amount</label>
                                                    <input
                                                        type="number"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                                        value={paymentAmount}
                                                        onChange={(e) => setPaymentAmount(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Payment
                                                        Method</label>
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
                                                    <label
                                                        className="block text-sm font-medium text-gray-700">Date</label>
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
                                </div>*/}

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
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Amount</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Amount</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                    {activeStudent.paymentHistory.map((payment) => (
                                                        <tr key={payment.id}>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{moment(payment.created_date).format('DD-MM-YYYY')}</td>
                                                             <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">${payment.total_expected_amount}</td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">${payment.total_paid_amount}</td>
                                                             <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{payment.status_display}</td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{payment.payment_method_display}</td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                                <button className="text-green-500 hover:text-green-700" onClick={()=>setShowReceipt(true)}>
                                                                    <DocumentTextIcon className="h-5 w-5"/>
                                                                </button>



                                                                { showReceipt &&
                                                                    <Popup
                                                                            isOpen={showReceipt}
                                                                            onClose={() => setShowReceipt(false)}
                                                                            title="Reusable Popup"
                                                                          >
                                                                        <A4FeeReceipt payment={payment} student={activeStudent}/>
                                                                    </Popup>

                                                                }

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
                                            <div
                                                className={`px-4 py-4 sm:px-6 ${!notification.read ? 'bg-green-50' : ''}`}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        {notification.type === 'payment' ? (
                                                            <HiCash className="h-5 w-5 text-green-500"/>
                                                        ) : (
                                                            <ExclamationCircleIcon className="h-5 w-5 text-yellow-500"/>
                                                        )}
                                                        <p className="ml-3 text-sm font-medium text-gray-900 truncate">
                                                            {notification.message}
                                                        </p>
                                                    </div>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <p className="text-xs text-gray-500">{notification.date}</p>
                                                        {!notification.read && (
                                                            <span
                                                                className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 transition-opacity duration-300 opacity-100">
                    <div
                        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                              aria-hidden="true">&#8203;</span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div
                                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                    <HiUserAdd className="h-6 w-6 text-green-600"/>
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Student</h3>
                                    <div className="mt-2">
                                        <form onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-1 gap-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">First
                                                        Name</label>
                                                    <input
                                                        type="text"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 "
                                                        value={newStudent.first_name}
                                                        onChange={(e) => setNewStudent({
                                                            ...newStudent,
                                                            first_name: e.target.value
                                                        })}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Last
                                                        Name</label>
                                                    <input
                                                        type="text"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 "
                                                        value={newStudent.last_name}
                                                        onChange={(e) => setNewStudent({
                                                            ...newStudent,
                                                            last_name: e.target.value
                                                        })}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        className="block text-sm font-medium text-gray-700">Email</label>
                                                    <input
                                                        type="email"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                                        value={newStudent.email}
                                                        onChange={(e) => setNewStudent({
                                                            ...newStudent,
                                                            email: e.target.value
                                                        })}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        className="block text-sm font-medium text-gray-700">Phone</label>
                                                    <input
                                                        type="tel"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                                        value={newStudent.phone_number}
                                                        onChange={(e) => setNewStudent({
                                                            ...newStudent,
                                                            phone_number: e.target.value
                                                        })}
                                                        required
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Dropdown
                                                            label="Class"
                                                            endpoint="/api/v1/classes/"
                                                            value={newStudent.classes}
                                                            onChange={(val) => handleDropdownChange('classes', val)}
                                                          />
                                                    </div>
                                                    <div>
                                                        <Dropdown
                                                            label="Shift"
                                                            endpoint="/api/v1/shifts/"
                                                            value={newStudent.shift}
                                                            onChange={(val) => handleDropdownChange('shift', val)}
                                                          />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label
                                                        className="block text-sm font-medium text-gray-700">Address</label>
                                                    <textarea
                                                        rows={2}
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3  focus:ring-green-500 focus:border-green-500"
                                                        value={newStudent.address}
                                                        onChange={(e) => setNewStudent({
                                                            ...newStudent,
                                                            address: e.target.value
                                                        })}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Monthly
                                                        Fee Amount</label>
                                                    <input
                                                        type="number"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3  focus:ring-green-500 focus:border-green-500"
                                                        value={newStudent.monthly_fee}
                                                        onChange={(e) => setNewStudent({
                                                            ...newStudent,
                                                            monthly_fee: parseFloat(e.target.value) || 0
                                                        })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                                <button
                                                    type="submit"
                                                    className="w-full z-10 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
                                                >
                                                    Add Student
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowAddStudentModal(false)}
                                                    className="mt-3 z-10 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-start-1 sm:text-sm"
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
const MobileSidebar = ({currentView, setCurrentView, notifications}) => {
  const handleLogout = async () => {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api-auth/logout/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
              'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.ok) {
            localStorage.setItem("isLogin", false);
            location.reload(true);
        }
    };

    return (
        <nav className="px-2 py-4">
            <NavItem
                icon={<UsersIcon className="w-5 h-5"/>}
                title="Students"
                active={currentView === 'students'}
                onClick={() => setCurrentView('students')}
            />
            <NavItem
                icon={<HiCash className="w-5 h-5"/>}
                title="Payments"
                active={currentView === 'payments'}
                onClick={() => setCurrentView('payments')}
            />
            <NavItem
                icon={<BellIcon className="w-5 h-5"/>}
                title="Notifications"
                active={currentView === 'notifications'}
                onClick={() => setCurrentView('notifications')}
                badge={notifications.filter(n => !n.read).length}
            />
            <div className="pt-4 mt-4 border-t border-gray-200">
                <NavItem
                    icon={<CogIcon className="w-5 h-5"/>}
                    title="Settings"
                    active={currentView === 'settings'}
                    onClick={() => setCurrentView('settings')}
                />
                <NavItem
                    icon={<BiLogOut className="w-5 h-5"/>}
                    title="Logout"
                    active={currentView === 'logout'}
                    onClick={handleLogout}
                />
            </div>
        </nav>
    );
};

const DesktopSidebar = ({currentView, setCurrentView, notifications}) => {
  const handleLogout = async () => {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/auth/logout/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
              'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.ok) {
            localStorage.setItem("isLogin", false);
            location.reload(true);
        }
    };

    return (
        <nav className="px-2 py-4">
            <NavItem
                icon={<UsersIcon className="w-5 h-5"/>}
                title="Students"
                active={currentView === 'students'}
                onClick={() => setCurrentView('students')}
            />
            <NavItem
                icon={<HiCash className="w-5 h-5"/>}
                title="Payments"
                active={currentView === 'payments'}
                onClick={() => setCurrentView('payments')}
            />
            <NavItem
                icon={<BellIcon className="w-5 h-5"/>}
                title="Notifications"
                active={currentView === 'notifications'}
                onClick={() => setCurrentView('notifications')}
                badge={notifications.filter(n => !n.read).length}
            />
            <div className="pt-4 mt-4 border-t border-gray-200">
                <NavItem
                    icon={<CogIcon className="w-5 h-5"/>}
                    title="Settings"
                    active={currentView === 'settings'}
                    onClick={() => setCurrentView('settings')}
                />
                <NavItem
                    icon={<BiLogOut className="w-5 h-5"/>}
                    title="Logout"
                    active={currentView === 'logout'}
                    onClick={handleLogout}
                />
            </div>
        </nav>
    );
};

const NavItem = ({icon, title, active, onClick, badge}) => {
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
                <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {badge}
        </span>
            )}
        </button>
    );
};

export default AcademyAdminDashboardV3;