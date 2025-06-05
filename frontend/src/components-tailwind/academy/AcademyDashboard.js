import React from 'react';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon,
  BellIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const AcademyDashboard = () => {
  // Sample data
  const courses = [
    { id: 1, name: 'Mathematics 101', progress: 75, nextLesson: 'Algebra Basics' },
    { id: 2, name: 'Literature', progress: 42, nextLesson: 'Poetry Analysis' },
    { id: 3, name: 'Computer Science', progress: 88, nextLesson: 'Data Structures' }
  ];

  const announcements = [
    { id: 1, title: 'Exam Schedule', date: 'May 15', content: 'Final exams will begin June 1st' },
    { id: 2, title: 'Library Hours', date: 'May 10', content: 'Extended hours during finals week' }
  ];

  const stats = [
    { name: 'Courses', value: 5, icon: BookOpenIcon },
    { name: 'Assignments', value: 12, icon: AcademicCapIcon },
    { name: 'Classmates', value: 32, icon: UserGroupIcon },
    { name: 'Events', value: 3, icon: CalendarIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-100 text-gray-500 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <AcademicCapIcon className="h-8 w-8" />
            <h1 className="text-2xl font-bold">DIB Academy</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full hover:bg-green-700">
              <BellIcon className="h-6 w-6" />
            </button>
            <button className="p-1 rounded-full hover:bg-green-700">
              <CogIcon className="h-6 w-6" />
            </button>
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="font-medium">JS</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <stat.icon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Courses Section */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <BookOpenIcon className="h-5 w-5 text-green-500 mr-2" />
                  My Courses
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {courses.map((course) => (
                  <div key={course.id} className="px-6 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{course.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Next: {course.nextLesson}</p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Announcements */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <BellIcon className="h-5 w-5 text-green-500 mr-2" />
                  Announcements
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {announcements.map((item) => (
                  <div key={item.id} className="px-6 py-4">
                    <div className="flex justify-between">
                      <h3 className="text-md font-medium text-gray-900">{item.title}</h3>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <ChartBarIcon className="h-5 w-5 text-green-500 mr-2" />
                  Performance
                </h2>
              </div>
              <div className="p-6">
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                  [Performance Chart Placeholder]
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">Your overall performance is improving!</p>
                  <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AcademyDashboard;