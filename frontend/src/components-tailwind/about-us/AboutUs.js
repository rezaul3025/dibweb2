import React from 'react';
import History from "./History";
import HistoryV2 from "./HistoryV2";

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Nasir Uddin',
      position: 'CEO & Founder',
      bio: 'Sarah founded the company with a vision to revolutionize the industry through sustainable practices.',
      twitter: '#',
      linkedin: '#'
    },
    {
      id: 2,
      name: 'Dr. Sabbir Ahmed Osmany ',
      position: 'CTO',
      bio: 'Michael leads our technical team with expertise in sustainable technology solutions.',
      twitter: '#',
      linkedin: '#'
    },
    {
      id: 3,
      name: 'Masud Rana Hossain',
      position: 'Head of Sustainability',
      bio: 'Elena ensures all our operations meet the highest environmental standards.',
      twitter: '#',
      linkedin: '#'
    },
    {
      id: 4,
      name: 'Dr. Mohammad Maruf Hossain',
      position: 'Marketing Director',
      bio: 'David crafts our brand message to communicate our environmental commitment.',
      twitter: '#',
      linkedin: '#'
    }
  ];

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* About Us Description */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Darul Ihsan Berlin (DIB) e.V.
          </h2>
          <div className="mt-6 mx-auto text-xl text-gray-500 break-keep">
            <p className="mb-6">
              In 2011, five families in Berlin came together with a desire to gain a deeper understanding of Islam’s teachings and way of life,
                which led them to begin Quranic Tafsir sessions. Over time, the need arose for an organization where families could study the Quran,
                Tafsir, and Seerah together, guiding their lives with the light of Islamic knowledge.
                By then, the Darul Ihsan family had grown to 18 families. By the immense grace of Allah,
                in 2018, this dream became a reality with the establishment of Darul Ihsan Berlin (DIB) e.V.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-green-50 rounded-lg p-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <p className="text-4xl font-bold text-green-600">10+</p>
              <p className="mt-2 text-lg text-gray-600">Years in History</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-green-600">50+</p>
              <p className="mt-2 text-lg text-gray-600">Associate Members</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-green-600">30+</p>
              <p className="mt-2 text-lg text-gray-600">Members</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Board member
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            The talented people behind our success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
          <HistoryV2 />
      </div>
    </section>
  );
};

const TeamMemberCard = ({ member }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="bg-green-500 h-48 flex items-center justify-center">
        <svg
          className="h-32 w-32 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
        <p className="text-green-600 font-medium">{member.position}</p>
        <p className="mt-3 text-gray-600">{member.bio}</p>
        <div className="mt-4 flex space-x-4">
          <a
            href={member.twitter}
            className="text-green-500 hover:text-green-700"
            aria-label={`${member.name} Twitter`}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a
            href={member.linkedin}
            className="text-green-500 hover:text-green-700"
            aria-label={`${member.name} LinkedIn`}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

