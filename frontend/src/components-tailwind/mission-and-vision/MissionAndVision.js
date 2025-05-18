import React from "react";
import {CheckCircleIcon} from "@heroicons/react/16/solid";

const MissionAndVision = () => {
    const items = [
        {
            title: "দারুল ইহসান বার্লিনের ভিশন",
            description: "বার্লিনের মুসলমান, বিশেষ করে বাংলাদেশীদের  সংগঠিত করে ইসলামের আদর্শ ও শিক্ষাকে ধারণ করে এমন একটি সমাজ ব্যবস্থা বিনির্মাণ করার জন্য প্রচেষ্টা চালিয়ে যাওয়া।"
        },
        {
            title: "মিশন : (৪ দফা কার্যক্রম)",
            description: "",
            items: [
                {
                    title: "আত্ম উন্নয়ন ",
                     description: "আল-কুরআন, সুন্নাহ ও সীরাহ্‌-এর সঠিক জ্ঞানার্জন, এর আলোকে আমল ও আত্ম উন্নয়নের মাধ্যমে দ্বীনের একজন দায়ী হিসেবে গড়ে তোলা।"
                },
                {
                    title: "দাওয়াত ",
                     description: "সকল মুসলিমদের মধ্যে আল-কুরআনের শিক্ষা, রাসুল সাঃ এর জীবনী  ও সুন্নাহর প্রচার ও প্রসারের মাধ্যমে ইসলামের সত্যতা, এবং সৌন্দর্য তুলে ধরা। এই লক্ষ্যে নিয়মিত দারসুল কুরআন, ওয়াজ মাহ্‌ফিল, ইসলামী সেমিনার ও আলোচনা সভা আয়োজন করা। \n" +
                         "অন্যান্য ধর্মাবলম্বীদের কাছে ইসলামের সঠিক শিক্ষা তুলে ধরা এবং ভূল ধারণাগুলো দূর করার চেষ্টা করা।"
                },
                {
                    title: "প্রতিষ্ঠান ",
                     description: "দ্বীনি শিক্ষাকে প্রতিষ্ঠানিক রূপ দেয়ার জন্য মাদ্রাসা কার্যক্রম, ইসলামিক লাইব্রেরি পরিচালনা, এবং বিভিন্ন কোর্স চালুর মাধ্যমে শিশু , কিশোর এবং প্রাপ্তবয়ষ্কদের ইসলাম শিক্ষায় সম্পৃক্ত করা ।"
                },
                {
                    title: "মানবতার জন্য দায়বদ্ধতা ",
                     description: "বিভিন্ন সামাজিক ও মানবিক কল্যানমুলক কাজে উদ্যোগ গ্রহণ এবং স্বেচ্ছাসেবী হিসেবে ভুমিকা রাখা।"
                }

            ]
        },
        {
            title: "লক্ষ্য",
            description: "দারুল ইহসানের সকল শিক্ষা, দাওয়াতী ও সামাজিক কার্যক্রম পরিচালনার জন্য একটি  পুরণাংগ ইসলামিক সেন্টার প্রতিষ্ঠা করা, যাকে কেন্দ্র করে কুরআন ও সুন্নাহর আলোকে পরিচালিত একটি ইসলামী সমাজ গড়ে উঠবে। \n" +
                "এই সেন্টারে অন্তর্ভুক্ত থাকবে একটি পুর্ণকালীন মাদ্রাসা, যেখান থেকে পরবর্তী প্রজন্ম থেকে সমাজের জন্য আলেম উলামা তৈরীর বীজ বপন করা হবে । \n" +
                "এই সেন্টার হবে সমাজের মুসলিম পরিবারগুলোর  সকলের ইসলামী পরিবেশে সামাজিক মিলনের একটি প্রাণকেন্দ্র।\n"
        }
    ];

    return (
        <div className="mx-auto">
            {/* List Header */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Mission & Vision</h2>
            </div>

            {/* Content List */}
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="group p3 rounded-lg gap-3 p-3
                        dark:hover:bg-gray-800/50
                            border border-transparent hover:border-gray-200 dark:hover:border-gray-700
                                backdrop-blur-sm"
                    >
                        <div className="flex">
                            <CheckCircleIcon className="h-5 w-5 mt-1 mr-2 text-green-500"/>
                            <span className="text-xl font-medium text-gray-800 dark:text-white inline">
                                {item.title}
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mt-1 text-justify break-words">
                            {item.description}
                        </p>

                        {item.items && item.items.map((item, index) => (
                            <ul className="space-y-3">
                                <li className="text-gray-600 dark:text-gray-300 mt-4 text-justify break-words"> <span className="font-bold">{index +1}. {item.title}  : </span> {item.description} </li>
                            </ul>
                        ))}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default MissionAndVision;