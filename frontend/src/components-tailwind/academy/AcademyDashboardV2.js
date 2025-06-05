import React from 'react';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ClipboardDocumentIcon,
  UserIcon,
  ArrowDownTrayIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const AcademyDashboardV2 = () => {
  // Sample data
  const academyInfo = {
    name: "Green Valley Academy",
    established: "2005",
    students: "1,200",
    faculty: "85",
    address: "123 Education Blvd, Learning City"
  };

  const notices = [
    { id: 1, title: "Final Exams Schedule", date: "May 25", urgent: true },
    { id: 2, title: "Summer Break Announcement", date: "May 18", urgent: false },
    { id: 3, title: "Library Renovation", date: "May 10", urgent: false }
  ];

  const courses = [
    { id: 1, name: "Advanced Mathematics", code: "MATH-401", instructor: "Dr. Smith" },
    { id: 2, name: "Literature & Composition", code: "LIT-302", instructor: "Prof. Johnson" },
    { id: 3, name: "Computer Science Principles", code: "CSP-201", instructor: "Dr. Lee" }
  ];

  const students = [
    { id: 1, name: "Alex Johnson", grade: "A", attendance: "95%" },
    { id: 2, name: "Maria Garcia", grade: "A-", attendance: "92%" },
    { id: 3, name: "Sam Wilson", grade: "B+", attendance: "88%" }
  ];

  const downloads = [
    { id: 1, name: "Academic Calendar 2023", type: "pdf", size: "2.4 MB" },
    { id: 2, name: "Course Syllabus Template", type: "docx", size: "1.2 MB" },
    { id: 3, name: "Campus Map", type: "jpg", size: "3.1 MB" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <AcademicCapIcon className="h-8 w-8 text-green-200" />
            <h1 className="text-2xl font-bold">Green Valley Academy</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-green-700">
              <BellIcon className="h-6 w-6" />
            </button>
            <button className="p-2 rounded-full hover:bg-green-700">
              <CogIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Academy Info & Notices */}
        <div className="lg:col-span-1 space-y-6">
          {/* Academy Information */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
            <div className="bg-green-600 px-4 py-3">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <AcademicCapIcon className="h-5 w-5 mr-2" />
                Academy Information
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{academyInfo.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Established:</span>
                  <span className="font-medium">{academyInfo.established}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Students:</span>
                  <span className="font-medium">{academyInfo.students}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Faculty:</span>
                  <span className="font-medium">{academyInfo.faculty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address:</span>
                  <span className="font-medium text-right">{academyInfo.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notice Board */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
            <div className="bg-green-600 px-4 py-3">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <ClipboardDocumentIcon className="h-5 w-5 mr-2" />
                Notice Board
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {notices.map(notice => (
                <div key={notice.id} className="p-4 hover:bg-green-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-medium ${notice.urgent ? 'text-red-600' : 'text-gray-800'}`}>
                        {notice.title}
                      </h3>
                      {notice.urgent && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
                          Urgent
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{notice.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Courses & Students */}
        <div className="lg:col-span-1 space-y-6">
          {/* Course Information */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
            <div className="bg-green-600 px-4 py-3">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <BookOpenIcon className="h-5 w-5 mr-2" />
                Course Information
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {courses.map(course => (
                <div key={course.id} className="p-4 hover:bg-green-50 transition-colors">
                  <h3 className="font-medium text-green-700">{course.name}</h3>
                  <div className="mt-1 flex justify-between text-sm">
                    <span className="text-gray-600">Code: {course.code}</span>
                    <span className="text-gray-600">Instructor: {course.instructor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Information */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
            <div className="bg-green-600 px-4 py-3">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <UserIcon className="h-5 w-5 mr-2" />
                Student Information
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map(student => (
                    <tr key={student.id} className="hover:bg-green-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.grade}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.attendance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Downloads & Calendar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Download Items */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
            <div className="bg-green-600 px-4 py-3">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Download Center
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {downloads.map(item => (
                <div key={item.id} className="p-4 hover:bg-green-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.type.toUpperCase()} • {item.size}</p>
                    </div>
                    <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200">
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Calendar */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
            <div className="bg-green-600 px-4 py-3">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Academic Calendar
              </h2>
            </div>
            <div className="p-4">
              <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center text-gray-400">
                [Calendar Widget Placeholder]
              </div>
              <div className="mt-4 text-center">
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium">
                  View Full Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
            <div className="bg-green-600 px-4 py-3">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Quick Stats
              </h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-sm text-green-800">Active Courses</p>
                <p className="text-2xl font-bold text-green-600 mt-1">12</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-sm text-green-800">Upcoming Exams</p>
                <p className="text-2xl font-bold text-green-600 mt-1">3</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-sm text-green-800">New Notices</p>
                <p className="text-2xl font-bold text-green-600 mt-1">5</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-sm text-green-800">Pending Tasks</p>
                <p className="text-2xl font-bold text-green-600 mt-1">7</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AcademyDashboardV2;