import React from "react";

const HistoryV2 = () => {
    const timelineData = [
        {
            year: 2025,
            title: "দারুল ইহসান একাডেমি",
            description: "১ লা ফেব্রুয়ারি ২০২৫ থেকে শেখ মুস্তাফিজুর রহমান সাহেবকে প্রধান শিক্ষক করে দারুল ইহসান একাডেমি'র অফিসিয়াল কার্যক্রম শুরু হয়।"
        },
        {
            year: 2024,
            title: "দারুল ইনসান ভিশন",
            description: "সেপ্টেম্বর ২০২৪ এ \"দারুল ইনসান ভিশন\" প্রণয়ন করা হয় এবং এর জন্য সহযোগী সদস্য গ্রহণ করা শুরু হয়।"
        },
        {
            year: 2021,
            title: "মসজিদ",
            description: "এপ্রিল ২০২১, রমজান মাস থেকে ব্রুনেনস্ট্রাসে ১২২ এ, \"দারুল ইহসান বার্লিন\" এর মসজিদ উন্মুক্ত করা হয়।"
        },
        {
            year: 2018,
            title: "নিজেদের দাওয়াতী ও শিক্ষা কার্যক্রম",
            description: "২০১৮ থেকে \"দারুল ইহসান বার্লিন\" নিজেদের দাওয়াতী ও শিক্ষা কার্যক্রম পরিচালনার জন্য নিজস্য জায়গার ভাড়া অথবা ক্রয় করার জন্য প্রচেস্টা শুরু হয়।" +
                "একই বছর ভবিষ্যতে একটি মসজিদ এবং মাদ্রাসা প্রতিষ্ঠার পরিকল্পনাকে মাথায় রেখে " +
                "শেখ মুস্তাফিজুর রহমান সাহেবকে শিক্ষক হিসেবে সম্পৃক্ত করে।"
        },
        {
            year: 2016,
            title: "ফারাইন রেজিস্ট্রেশ",
            description: "২০১৬ সালে এসে নিজেদের দাওয়াতী কার্যক্রম পরিচালনাকে প্রাতিষ্ঠানিক রূপ দেওয়ার জন্য \"দারুল ইহসান বার্লিন\" নামে একটি থেকে ফারাইন রেজিস্ট্রেশনের কাজ শুরু করে।"
        },
        {
            year: 2015,
            title: "উম্মুক্ত  দাওয়াহ কার্যক্রম শুরু",
            description: "২০১৫ সালে এসে পাক্ষিক ভাবে ফ্রিড্রিকশাইনের ভিন স্ট্রাসেতে একটি পাবলিক মিটিং হল ভাড়া করে  কুরআন কে সহজ ভাবে সকল মানুশের মাঝে সহজ ভাবে তুলে ধরার মাধ্যমে উম্মুক্ত  দাওয়াহ কার্যক্রম শুরু।"
        },
        {
            year: 2011,
            title: "কুরআন স্টাডি সার্কেল'র যাত্রা শুরু",
            description: "মে ২০১১-  ৫ টি পরিবার প্রতি সপ্তাহে তাদের ড্রয়িংরুমে কুরআন স্টাডি সার্কেল আয়োজনের মধ্য দিয়ে যাত্রা শুরু করে।"
        }
    ];


    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    <span className="text-green-500">দারুল ইহসান বার্লিন-এর যাত্রা</span>
                </h2>
                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                    {timelineData.map((item, index) => (<li className="mb-10 ms-4">
                        <div
                            className="absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time
                            className="mb-1 text-md font-normal leading-none text-green-500 dark:text-gray-700">{item.year}
                        </time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white"> {item.title}</h3>
                        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 text-justify break-words">{item.description}</p>
                    </li>))}
                </ol>
            </div>
        </div>
    );
};

export default HistoryV2;