import React, {Fragment} from "react";

const History = () => {
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

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-4 sm:left-1/2 h-full w-0.5 bg-gray-200 transform sm:-translate-x-1/2"
            aria-hidden="true"
          ></div>

          <div className="space-y-10">
            {timelineData.map((item, index) => (
              <div key={item.year} className="relative pl-12 sm:pl-0 group">
                {/* Year marker dot */}
                <div className="absolute left-0 sm:left-1/2 h-5 w-5 -translate-x-2 sm:-translate-x-2.5 bg-green-500 rounded-full border-4 border-white ring-2 ring-green-300 z-10"></div>

                {/* Content area */}
                <div className={`sm:flex ${index % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end'}`}>
                  <div className={`sm:w-5/12 ${index % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'}`}>
                    {/* Year label */}
                    <div className={`absolute sm:pl-8 left-0 sm:left-1/2 -translate-x-10 sm:top-0 text-sm font-medium text-green-500 ${index % 2 === 0 ? 'sm:-translate-x-16 sm:text-left' : 'sm:translate-x-4 sm:text-right'}`}>
                      {item.year}
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;