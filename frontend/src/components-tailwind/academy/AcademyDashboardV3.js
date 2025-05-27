import React, {useEffect, useState} from 'react';
import {
    AcademicCapIcon,
    ArrowDownTrayIcon,
    BellIcon,
    BookOpenIcon,
    ClipboardDocumentIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import Overlay2 from "../OverlayV2";
import moment from "moment";
import PDFViewerWithDownload from "../pdf/PDFViewerWithDownload";
import PdfThumbnailPreview from "../pdf/PdfThumbnailPreview";

const AcademyDashboardV3 = () => {

    const [downloadItems, setDownloadItems] = useState([]);
    const [noticeBoardItems, setNoticeBoardItems] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/v1/download-items/AC/');
                const data = await response.json();
                setDownloadItems(data);

            } catch (error) {
                console.error("Error fetching download data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchNoticeBoardData = async () => {
            try {
                const response = await fetch('/api/v1/notice-board/');
                const data = await response.json();
                setNoticeBoardItems(data);

            } catch (error) {
                console.error("Error fetching NoticeBoar data:", error);
            }
        };
        fetchNoticeBoardData();
    }, []);

    function HtmlRenderer({htmlContent}) {
        return <div dangerouslySetInnerHTML={{__html: htmlContent}}/>;
    }

    const handleView = (title) => {
    console.log(`Viewing: ${title}`);
    // Implement PDF viewer logic
  };

  const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = file; // Replace with your PDF path
    link.download = 'document.pdf'; // Custom filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

    // Sample data
    const academyInfo = {
        name: "Darul Ihsan Berlin Academy",
        motto: "Excellence Through Innovation",
        established: "Established 2024"
    };

    const courses = [
        {
            id: 1,
            name: "নূরানী",
            requirement: "বয়স ৫ বছর",
            instructor: "Hafez Hasan Abbas, Sheikh Momahmad Mustafijur Rahman",
            description: "কেন পড়তে হবে ? \n" +
                "তাজবিদ সহকারে বিশুদ্ধভাবে কুরআন পড়তে পারা, রাসুল সালাল্লাহুয়ালাইহিস সালাম এর জীবনী জানা, নামাজের বিশুদ্ধ পদ্ধতি জানা, তাহারাত অর্জনের পদ্ধতি শেখা \n"
        },
        {
            id: 2,
            name: "হিফয",
            requirement: "শর্ত নূরানী",
            instructor: "Hafez Hasan Abbas, Sheikh Momahmad Mustafijur Rahman",
            description: "কেন পড়তে হবে ? \n" +
                "কুরআনের হিফাজতকারী হওয়া, দক্ষ ইমাম ও হাফেজ হওয়া, কিয়ামতের দিনে বাবা-মায়ের মর্যাদা \n"
        },
        {
            id: 3,
            name: "মাদানি নিসাব",
            requirement: "বয়স ১১+ বছর",
            instructor: "Sheikh Momahmad Mustafijur Rahman",
            description: "<p>কেন পড়তে হবে ? </p>\n" +
                "আরবি বুঝে কুরআন ও হাদিস পড়া \n" +
                "দায়ী ইলাল্লাহ হওয়া \n" +
                "ইসলামি শরিয়াকে জানা ও দাওয়াতি কাজে সক্রিয় অংশ নেয়া\n" +
                "নিজেকে ও পরিবারকে জান্নাতের লাভের জন্য প্রচেষ্টায় থাকা   \n"
        },
        {
            id: 4,
            name: "বাংলা",
            requirement: "সবার জন্য",
            instructor: "Farazana Bithy, Mehnaj Tabaksum",
            description: "কেন পড়তে হবে ? \n" +
                "বাংলাদেশি আত্মীয়দের সাথে সুন্দর করে কথা বলতে শেখা \n" +
                "বাংলা ভাষায় আত্মীয়দেরকে জন্য দায়ী ইলাল্লাহ হিসেবে থাকা\n"
        }
    ];

    const teachers = [
        {
            id: 1,
            name: "Sheikh Momahmad Mustafijur Rahman",
            department: "নূরানী, মাদানি নিসাব",
            email: "ssmith@academy.edu",
            phone: "(555) 123-4567"
        },
        {
            id: 2,
            name: "Hasan Abbas",
            department: "নূরানী, হিফয",
            email: "mjohnson@academy.edu",
            phone: "(555) 234-5678"
        },
        {
            id: 3,
            name: "Heba Tollah Elsayed",
            department: "নূরানী",
            email: "erodriguez@academy.edu",
            phone: "(555) 345-6789"
        },
        {id: 4, name: "Jahanara Khatun", department: "নূরানী", email: "wchen@academy.edu", phone: "(555) 456-7890"}
    ];

    const notices = [
        {id: 1, title: "Final Exam Schedule", date: "May 25", urgent: true},
        {id: 2, title: "Summer Break Announcement", date: "May 18", urgent: false},
        {id: 3, title: "Library Renovation", date: "May 10", urgent: false}
    ];

    const downloads = [
        {id: 1, name: "Academic Calendar", type: "pdf", size: "2.4 MB"},
        {id: 2, name: "Student Handbook", type: "pdf", size: "3.1 MB"},
        {id: 3, name: "Campus Map", type: "jpg", size: "1.8 MB"}
    ];

    return (
        <div className="min-h-screen">
            {/* Academy Header */}
            <header className="text-green-500 py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <AcademicCapIcon className="h-12 w-12 mx-auto text-green-500"/>
                    <h1 className="text-3xl md:text-4xl font-bold mt-4">{academyInfo.name}</h1>
                    <p className="text-xl mt-2">{academyInfo.motto}</p>
                    <p className="mt-1">{academyInfo.established}</p>
                </div>
            </header>

            {/* Main Content */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content - 3 columns */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Notice Board */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                            <BellIcon className="h-6 w-6 text-green-500 mr-2"/>
                            Notice Board
                        </h2>
                        <div className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden">
                            <div className="grid grid-cols-1 divide-y divide-gray-100">
                                {noticeBoardItems.map((notice, index) => (
                                    <div key={index}
                                         className="p-4 hover:bg-green-50 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-500">
                                                    {notice.title}
                                                </h3>
                                                <p className="text-md text-gray-600 mt-1 text-justify break-words">{notice.description}</p>
                                                <div className="flex items-center my-4">
                                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                    </svg>
                                                    <span
                                                        className="text-sm text-gray-500 mt-1">{moment(notice.date).format('dddd, MMM D YYYY')}</span>
                                                </div>
                                                {/*<PDFThumbnail
                                                    key={index}
                                                    title={notice.document_name}
                                                    description={notice.description}
                                                    size={notice.document_size}
                                                    lastModified={notice.date}
                                                    thumbnailUrl={notice.document}
                                                    onView={() => handleView(notice.document_name)}
                                                    onDownload={() => handleDownload(notice.document_name)}
                                                  />*/}

                                                <PdfThumbnailPreview file={notice.document}
                                                                     doc_name={notice.document_name}
                                                                    doc_size={notice.document_size}
                                                />

                                                <Overlay2
                                                    triggerText="View Details"
                                                    title={notice.title}
                                                >
                                                    <div className="space-y-4">
                                                        <p className="text-gray-500"><HtmlRenderer
                                                            htmlContent={notice.description}/></p>
                                                    </div>
                                                    <PDFViewerWithDownload
                                                        file={notice.document}
                                                        doc_name={notice.document_name}
                                                        doc_size={notice.document_size}
                                                        onDownload={() => handleDownload(notice.document_name)}
                                                    />
                                                </Overlay2>

                                            </div>

                                            {notice.urgent && (
                                                <span
                                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                Urgent
                                            </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Course Information */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                            <BookOpenIcon className="h-6 w-6 text-green-500 mr-2"/>
                            বিভাগসমুহ ও শিক্ষাদানের সময়সীমা
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {courses.map(course => (
                                <div key={course.id}
                                     className="bg-white rounded-lg shadow-sm border border-green-100 p-6 hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-medium text-green-700">{course.name}</h3>
                                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                                        <span
                                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{course.requirement}</span>
                                        <p className="mt-2">Instructor: {course.instructor}</p>
                                    </div>
                                    <Overlay2
                                        triggerText="View Details"
                                        title="Confirmation Required"
                                    >
                                        <div className="space-y-4">
                                            <p className="text-gray-500"><HtmlRenderer
                                                htmlContent={course.description}/></p>
                                        </div>
                                    </Overlay2>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Teacher List */}
                    {/*<div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                            <UserIcon className="h-6 w-6 text-green-500 mr-2"/>
                            Faculty Members
                        </h2>
                        <div className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden">
                            <div className="grid grid-cols-1 divide-y divide-gray-100">
                                {teachers.map(teacher => (
                                    <div key={teacher.id} className="p-4 hover:bg-green-50 transition-colors">
                                        <h3 className="font-medium text-green-700">{teacher.name}</h3>
                                        <p className="text-sm text-gray-600">{teacher.department}</p>
                                        <div className="mt-2 flex items-center text-sm text-gray-500">
                                            <EnvelopeIcon className="h-4 w-4 mr-1"/>
                                            <span className="mr-3">{teacher.email}</span>
                                            <PhoneIcon className="h-4 w-4 mr-1"/>
                                            <span>{teacher.phone}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>*/}
                </div>

                {/* Sidebar - 1 column */}
                <div className="lg:col-span-1 space-y-6 md:pt-14">
                    {/* Download Items */}
                    <div className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden">
                        <div className="bg-green-500 px-4 py-2">
                            <h2 className="text-lg font-semibold text-white flex items-center">
                                <ArrowDownTrayIcon className="h-5 w-5 mr-2"/>
                                Downloads
                            </h2>
                        </div>
                        <div className="p-4 space-y-3">
                            {downloadItems.map(item => (
                                <div key={item.id}
                                     className="flex items-center justify-between p-3 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
                                    <div className="flex items-center">
                                        <DocumentTextIcon className="h-5 w-5 text-green-500 mr-3"/>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{item.filename}</p>
                                            <p className="text-xs text-gray-500">{item.size}</p>
                                        </div>
                                    </div>
                                    <button className="text-green-500 hover:text-green-700" onClick={() => handleDownload(item.document)} title="Download">
                                        <ArrowDownTrayIcon className="h-5 w-5"/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    {/*<div className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden">
                        <div className="bg-green-500 px-4 py-2">
                            <h2 className="text-lg font-semibold text-white flex items-center">
                                <ClipboardDocumentIcon className="h-5 w-5 mr-2"/>
                                Quick Links
                            </h2>
                        </div>
                        <div className="p-4 space-y-2">
                            <a href="#"
                               className="block p-2 text-sm text-green-700 hover:bg-green-50 rounded-md transition-colors">
                                Academic Calendar
                            </a>
                            <a href="#"
                               className="block p-2 text-sm text-green-700 hover:bg-green-50 rounded-md transition-colors">
                                Student Portal
                            </a>
                            <a href="#"
                               className="block p-2 text-sm text-green-700 hover:bg-green-50 rounded-md transition-colors">
                                Faculty Directory
                            </a>
                            <a href="#"
                               className="block p-2 text-sm text-green-700 hover:bg-green-50 rounded-md transition-colors">
                                Library Resources
                            </a>
                        </div>
                    </div>*/}
                </div>
            </div>
        </div>
    );
};

export default AcademyDashboardV3;