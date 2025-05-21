import React from "react";
import {Link} from "react-router-dom";

const NewMemberAnnouncementBlock = () => {
  return (
      <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-xl p-8 md:p-12 text-white mt-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">দারুল ইনসান এর ভিশনের একজন আর পৃষ্ঠপোষক হোন। </h1>
          <p className="text-lg mb-2">
              সহযোগী সদস্য হিসেবে যোগদান করুন। :
          </p>
          <p className="text-lg mb-2 text-justify break-words">
              দারুল ইহসান বার্লিন আল্লাহর পথে কাজ করছে এবং একটি মসজিদ পরিচালনা করছে। এর লক্ষ্যকে এগিয়ে নিতে, দারুল ইহসান বার্লিন e.V. দাতা সদস্যদের স্বাগত জানানোর জন্য একটি প্রোগ্রাম চালু করেছে।
              যারা দ্বীনের (ঈমানের) পক্ষে সমর্থন করতে চান তাদের আমরা সদস্য হিসেবে যোগদানের জন্য উৎসাহিত করি। আল্লাহ আমাদের সকলকে পুরস্কৃত করুন, ইনশাআল্লাহ।
          </p>
          <Link to={'/vision/'}
              className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all shadow-md">
              View Details
          </Link>
      </div>
  );
};

export default NewMemberAnnouncementBlock;