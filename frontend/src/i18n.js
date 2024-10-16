import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          AboutUs: { text: 'About Us' },
          ContactUs: { text: "Contact Us" },
          Home: { text: 'Home' },
          Activities: { text: 'Activities' },
          Donation: { text: 'Donation' },
          PrayerTime: { text: 'Prayer Time' },
          Language: { text: '' },
          PreyerTimeMessage: {
            text: 'There are 5 prayers every day and two Jummah prayers every Friday.'
          },
          OurHistory: { text: 'History of Darul Ihsan Berlin' },
          OurHistorySubheader: {
            text: 'From a Humble Dream to a Grand Vision: Growing Together by the Grace of Allah'
          },
          CreationOfOurGroup: { text: 'Creation of Our Group' },
          OurHistoryDecOne: {
            text:
              'In 2011, five families in Berlin came together with a desire to gain a deeper understanding of ' +
              'Islam’s teachings and way of life, which led them to begin Quranic Tafsir sessions. ' +
              'Over time, the need arose for an organization where families could study the Quran, Tafsir, and Seerah together, ' +
              'guiding their lives with the light of Islamic knowledge. By then, the Darul Ihsan family had grown to 18 families. ' +
              'By the immense grace of Allah, in 2018, this dream became a reality with the establishment of Darul Ihsan Berlin (DIB) e.V.'
          },
          OurHistoryDecTwo: {
            text:
              'From the very beginning, Darul Ihsan Berlin (DIB) has operated as an institution rooted in family and Islamic education. ' +
              'Alongside Quranic education, one of DIB’s primary goals is the implementation of Quranic teachings in all aspects of society. ' +
              'It is not only focused on Quran and Tafsir lessons but also on how to apply the guidance of the Quran in every aspect of ' +
              'life through discussions and activities. '
          },
          OurHistoryDecThree: {
            text:
              'The main objective of Darul Ihsan Berlin is to foster Quranic education in a family-oriented environment and ' +
              'to implement Islamic teachings in social life. DIB is working towards strengthening ' +
              'and enlightening the Bangladeshi Muslim community in Berlin. The organisation envisions building a united society based on ' +
              'knowledge, where individual and collective life is guided by the light of the Quran.'
          },
          WelcomeToDarulIhsan: { text: 'Welcome To Darul Ihsan Berlin e.V' },
          IdealsAndValues: { text: 'Ideals and Values' },
          IdealsAndValuesDecOneTitle: { text: 'Unwavering Faith in Allah' },
          IdealsAndValuesDecOne: { text: 'Remaining steadfast in the fundamental beliefs of Islam and striving to attain Allah’s pleasure in everyday life' },
          IdealsAndValuesDecTwoTitle: { text: 'Following the Sunnah of the Prophet (PBUH)' },
          IdealsAndValuesDecTwo: { text: 'Applying the principles and teachings of the life of the Prophet (PBUH) in all aspects of life, so that we may draw closer to Allah and build a better society' },
          IdealsAndValuesDecThreeTitle: { text: 'Family Bond and Compassion' },
          IdealsAndValuesDecThree: { text: 'Building families with proper education based on Islamic ideals and strengthening social bonds' },
          IdealsAndValuesDecFourTitle: { text: 'Social Responsibility and Service' },
          IdealsAndValuesDecFour: { text: 'Creating a better society through humanitarian service, where everyone works for the welfare of one another' },
          IdealsAndValuesDecFiveTitle: { text: 'Education and Knowledge' },
          IdealsAndValuesDecFive: { text: 'Bringing positive change in all aspects of life by acquiring proper knowledge in light of the Quran and Sunnah' },
          GoalsAndObjectives: { text: 'Goals and Objectives' },
          GoalsAndObjectivesDecOne: {
            text: 'We believe that by cultivating Islamic knowledge, it is possible to develop morality, compassion, and ' +
            'a sense of service. Our goal is not limited to religious education alone, but to establish a peaceful ' +
            'and ethical society by implementing Islamic values at all levels of society. Our objectives include: '
          },
          GoalsAndObjectivesDecTwoTitle: {
            text:
            'Islamic Knowledge and Research'
          },
          GoalsAndObjectivesDecTwo: {
            text:
            'As an Islamic institution, we aim to encourage research on Islamic history, ' +
            'culture, and the contributions of Islam to global civilization, increasing awareness about the rich knowledge ' +
            'base of Islam.'
          },
          GoalsAndObjectivesDecThreeTitle: {
            text: 'Providing Islamic Education'
          },

          GoalsAndObjectivesDecThree: {
            text: 'Most Muslim families face difficulties in finding structured ' +
            'religious education for their children in non-Muslim countries. DIB seeks to provide a platform where ' +
            'courses on Quran study, Islamic law (Sharia), and the Arabic language are offered. This will fulfil ' +
            'a crucial need of the Muslim community while ensuring the educational environment aligns with local ' +
            'laws and values.'
          },
          GoalsAndObjectivesDecFourTitle: {
            text: 'Building a Moral Society'
          },
          GoalsAndObjectivesDecFour: {
            text: 'DIB is working to implement these Islamic values in ' +
            'every aspect of personal and social life, with the aim of creating a beautiful, peaceful, and moral society.'
          },
          GoalsAndObjectivesDecFiveTitle: {
            text: 'Community Empowerment through Service'
          },
          GoalsAndObjectivesDecFive: {
            text: ' We aim to foster a sense of responsibility and community service, encouraging' +
             'Muslims to actively contribute to the welfare of society through charity, social work, and' +
              'volunteerism. By embodying the values of compassion and solidarity, we strive to uplift' +
               'communities around us.'
          },
          OurActivities:{
            text:'At Darul Ihsan Berlin (DIB), various activities are conducted to expand and deepen Islamic education.'+
            'Through these activities, we are committed to enriching our community with Islamic teachings collectively.' +
             'Our activities are as follows:'
          },
          ActivityOneTitle:{
            text:'Waaz Mahfil and Inviting Scholars'
          },
          ActivityOne:{
            text:'We organise waaz mahfils by inviting distinguished scholars from the contemporary'+
             'Muslim community to expand Islamic knowledge and provide proper guidance to society.'
          },
          ActivityTwoTitle:{
            text:'Quran Education'
          },
          ActivityTwo:{
            text:'Quran recitation is taught with correct tartil and tajweed. Separate' +
             'classes are arranged for men, women, and children'
          },
          ActivityThreeTitle:{
            text:'Quran Tafsir and Application'
          },
          ActivityThree:{
            text:'Weekly classes are held to understand the meaning and significance'+
             'of the Quran. Separate classes are organised for men and women.'
          },
          ActivityFourTitle:{
            text:'Seerah Lessons'
          },
          ActivityFour:{
            text:'Efforts are made to learn and apply lessons from the life of Prophet'+
             'Muhammad (PBUH) in real life. Weekly Seerah classes are conducted for children' +
             'and youth, where they read the biographies of all Prophets and learn from their lives.'
          },
          ActivityFiveTitle:{
            text:'Biweekly Public Session'
          },
          ActivityFive:{
            text:'Topic-based discussions are held in the light of the Quran. These sessions'+
             'are conducted in Bangla.'
          },
          ActivitySixTitle:{
            text:'Weekly Quran Study Circle'
          },
          ActivitySix:{
            text:'A weekly Quran study circle is held for members,'+
            'where Quran recitation and Tafsir are discussed.'
          },
          ActivitySevenTitle:{
            text:'Mubasshira: Weekly Online Halaka (Sisters Only)'
          },
          ActivitySeven:{
            text:'A special online Halaka is organized for women, focusing on topic-based discussions, the'+
             'biographies of the Prophets, lessons from the lives of the Mothers of the Believers, Asmaul Husna, and more.'
          },
          ActivityEightTitle:{
            text:'Personal Development Groups'
          },
          ActivityEight:{
            text:'Workshops are conducted in small groups to improve Quran recitation and memorization.'+
             'Through these activities, members help each other and work together to enhance their skills.'
          },
          ActivityNineTitle:{
            text:'Special Programs for Young Muslims'
          },
          ActivityNine:{
            text:'Separate classes are held for young men and women, focusing on special activities'+
             'to help them grow with the true ideals of Islam. These activities aim to instill confidence and a love for Islam.'
          },
          ActivityTenTitle:{
            text:'Central Library'
          },
          ActivityTen:{
            text:'A central library with Islamic books in Bangla, German, and English has been established, allowing'+
            'members to read and learn about various Islamic topics. Books are collected for members of all ages.'
          },
          ActivityElevenTitle:{
            text:'Workshops for Children'
          },
          ActivityEleven:{
            text:'Various workshops are held for children on topics like "How to be a Good Muslim." These workshops help spark interest and love for the principles of Islam in young minds.'
          },
          ActivityTwelveTitle:{
            text:''
          },
          ActivityTwelve:{
            text:''
          },
          DIBVision:{
            text:'DIB Vision'
          },

          DIBVisionDecOne:{
            text:'Since the establishment of Darul Ihsan Berlin (DIB), we have dreamed of creating a healthy and progressive environment' +
             'for Muslims residing in Berlin. Although our current mosque, with an area of 140 square metres, accommodates 200 worshippers' +
              'at a time, our needs and aspirations are much greater. Darul Ihsan Berlin envisions establishing a larger Islamic centre where' +
               'we can expand our activities and undertake new initiatives.'
          },
          DIBVisionDecTwo:{
            text:'We dream of establishing a full-time madrasa that ensures a high standard of Islamic education for children and youth. Our'+
             'goal is to build an Islamic centre for families, where various Islamic activities, Quran lessons, Tafsir sessions, and Seerah'+
              'teachings will be available.'
          },
          DIBVisionDecThree:{
            text:'We aim to provide modern education for children with dedicated prayer spaces and classrooms, ensuring they can acquire' +
            'both Islamic education and contemporary knowledge under close supervision.'
          },
          DIBVisionDecFour:{
            text:'Our vision is to build a strong and organised Muslim community, where our members can follow the core principles' +
            'of Islam in every aspect of life. We believe that through this initiative, we will be able to further strengthen and' +
            'cultivate a thoughtful Bangladeshi Muslim community in Berlin.'
              },


        },
      },
      de: {
        translation: {
          AboutUs: { text: '' },
          ContactUs: { text: '' },
          Home: { text: '' },
          Activities: { text: '' },
          Donation: { text: '' },
          PrayerTime: { text: '' },
          Language: { text: '' },
          PreyerTimeMessage: { text: '' },
          OurHistory: { text: '' },
          CreationOfOurGroup: { text: '' },
          OurHistoryDecOne: { text: '' },
          OurHistoryDecTwo: { text: '' },
          OurHistoryDecThree: { text: '' },
          WelcomeToDarulIhsan: { text: '' },
          IdealsAndValues: { text: '' },
          IdealsAndValuesDecOneTitle: { text: '' },
          IdealsAndValuesDecOne: { text: '' },
          IdealsAndValuesDecTwoTitle: { text: '' },
          IdealsAndValuesDecTwo: { text: '' },
          IdealsAndValuesDecThreeTitle: { text: '' },
          IdealsAndValuesDecThree: { text: '' },
          IdealsAndValuesDecFourTitle: { text: '' },
          IdealsAndValuesDecFour: { text: '' },
          IdealsAndValuesDecFiveTitle: { text: '' },
          IdealsAndValuesDecFive: { text: '' },
          GoalsAndObjectives: { text: '' },
          GoalsAndObjectivesDec: { text: '' },
          GoalsAndObjectivesDecOne: {
            text: ''
          },
          GoalsAndObjectivesDecTwoTitle: {
            text: ''
          },
          GoalsAndObjectivesDecTwo: {
            text: ''
          },
          GoalsAndObjectivesDecThreeTitle: {
            text: ''
          },
          GoalsAndObjectivesDecThree: {
            text: ''
          },
          GoalsAndObjectivesDecFourTitle: {
            text: ''
          },
          GoalsAndObjectivesDecFour: {
            text: ''
          },
          GoalsAndObjectivesDecFiveTitle: {
            text: ''
          },
          GoalsAndObjectivesDecFive: {
            text: ''
          },
          OurActivities:{
            text:'Our Activities'
          },
          ActivityOneTitle:{
            text:' 1st Activity'
          },
          ActivityOne:{
            text:''
          },
          ActivityTwoTitle:{
            text:''
          },
          ActivityTwo:{
            text:''
          },
          ActivityThreeTitle:{
            text:''
          },
          ActivityThree:{
            text:''
          },
          ActivityFourTitle:{
            text:''
          },
          ActivityFour:{
            text:''
          },
          ActivityFiveTitle:{
            text:''
          },
          ActivityFive:{
            text:''
          },
          ActivitySixTitle:{
            text:''
          },
          ActivitySix:{
            text:''
          },
          ActivitySevenTitle:{
            text:''
          },
          ActivitySeven:{
            text:''
          },
          ActivityEightTitle:{
            text:''
          },
          ActivityEight:{
            text:''
          },
          ActivityNineTitle:{
            text:''
          },
          ActivityNine:{
            text:''
          },
          ActivityTenTitle:{
            text:''
          },
          ActivityTen:{
            text:''
          },
          ActivityElevenTitle:{
            text:''
          },
          ActivityEleven:{
            text:''
          },
          ActivityTwelveTitle:{
            text:''
          },
          ActivityTwelve:{
            text:''
          },
          DIBVision:{
            text:''
          },
          DIBVisionDecOne:{
            text:''
          },
          DIBVisionDecTwo:{
            text:''
          },
          DIBVisionDecThree:{
            text:''
          },
          DIBVisionDecFour:{
            text:''
              },


        },
      },
      bn: {
        translation: {
          AboutUs: { text: 'আমাদের সম্পর্কে' },
          ContactUs: { text: 'যোগাযোগ' },
          Home: { text: 'হোম' },
          Activities: { text: 'আমাদের কার্যক্রম' },
          Donation: { text: 'ডোনেশন' },
          PrayerTime: { text: 'নামাজের সময়সূচী' },
          Language: { text: 'ভাষা' },
          PreyerTimeMessage: { text: '' },
          OurHistory: { text: 'দারুল ইহসান বার্লিনের ইতিহাস' },
          OurHistorySubheader: {
            text: 'ছোট স্বপ্ন থেকে বৃহৎ সাফল্যের পথে: আল্লাহর রহমতে আমাদের ঐক্যবদ্ধ পথচলা'
          },
          CreationOfOurGroup: { text: '' },
          OurHistoryDecOne: {
             text: '২০১১ সালে বার্লিনে পাঁচটি পরিবার একত্রিত হয়ে ইসলামের গভীরতর শিক্ষা ও জীবন-ব্যবস্থার' +
              ' মূল মর্মবাণী অনুধাবন করার আকাঙ্ক্ষা থেকে কুরআনের তাফসীর পাঠ শুরু করেন। সময়ের সাথে সাথে' +
              ' এমন একটি সংগঠনের প্রয়োজন অনুভব হয়, যেখানে মানুষ পরিবারসহ কুরআন, তাফসীর, এবং সীরাতের' +
               ' পাঠ গ্রহণ করতে পারবে। এর মাধ্যমে তারা ইসলামী জ্ঞানের আলোয় নিজেদের জীবনকে পরিচালিত করতে' + 
               ' পারবে।ততদিনে দারুল ইহসান পরিবারের সদস্য ১৮ টি পরিবার।  আল্লাহর অশেষ রহমতে ২০১৮' +
               ' সালে তাদের এই স্বপ্ন বাস্তবে রূপ নেয়, এবং প্রতিষ্ঠিত হয় দারুল ইহসান বার্লিন (DIB)।'
             },
          OurHistoryDecTwo: { 
            text: 'শুরু থেকে, দারুল ইহসান বার্লিন (DIB) একটি পারিবারিক এবং ইসলামী শিক্ষার ভিত্তিতে গড়ে ওঠা ' + 
            ' একটি প্রতিষ্ঠান হিসেবে কাজ করে আসছে। কুরআন শিক্ষার পাশাপাশি, DIB-এর অন্যতম প্রধান লক্ষ্য' +
            ' হলো সমাজের সব ক্ষেত্রে কুরআনের শিক্ষার বাস্তবায়ন। এখানে শুধুমাত্র কুরআন ও তাফসীর পাঠ নয়, বরং' +
            ' জীবনের প্রতিটি স্তরে কিভাবে কুরআনের নির্দেশনা অনুসরণ করা যায়, সেসব বিষয়ে আলোচনা এবং কার্যক্রম' +
            ' পরিচালনা করা হয়।' 
          },
          OurHistoryDecThree: { 
            text: 'দারুল ইহসান বার্লিনের মূল উদ্দেশ্য হলো পারিবারিক পরিবেশে কুরআন শিক্ষার চর্চা এবং সামাজিক' +
            ' জীবনে ইসলামের শিক্ষার বাস্তবায়ন। বার্লিনের বাংলাদেশী মুসলিম সম্প্রদায়কে শক্তিশালী ও মননশীল করে' +
            ' গড়ে তোলার লক্ষ্য নিয়ে, DIB কাজ করে যাচ্ছে। প্রতিষ্ঠানটি একটি জ্ঞানের ভিত্তিতে ঐক্যবদ্ধ সমাজ গঠনের' +
            ' স্বপ্ন দেখে, যেখানে কুরআনের আলোকে ব্যক্তি এবং সমাজ জীবন পরিচালিত হবে।'
          },
          WelcomeToDarulIhsan: { text: '' },
          IdealsAndValues: { 
            text: 'আদর্শ ও মূল্যবোধ'
           },
          IdealsAndValuesDecOneTitle: { text: 'আল্লাহর প্রতি অগাধ বিশ্বাস' },
          IdealsAndValuesDecOne: { text: 'ইসলামের মৌলিক বিশ্বাসের ওপর অবিচল থাকা এবং প্রতিদিনের জীবনযাত্রায় আল্লাহর সন্তুষ্টি অর্জনের চেষ্টা।' },
          IdealsAndValuesDecTwoTitle: { text: 'রাসূলুল্লাহ (সা.)-এর সুন্নাহ অনুসরণ' },
          IdealsAndValuesDecTwo: { text: 'নবী (সা.)-এর জীবনযাত্রার আদর্শ ও শিক্ষাকে জীবনের প্রতিটি ক্ষেত্রে প্রয়োগ করা, যাতে আমরা আল্লাহর নৈকট্য লাভ করতে পারি এবং সুন্দর একটি সমাজ গড়ে তুলতে পারি।' },
          IdealsAndValuesDecThreeTitle: { text: 'পারিবারিক বন্ধন ও সহমর্মিতা' },
          IdealsAndValuesDecThree: { text: 'ইসলামের আদর্শ অনুযায়ী পরিবারকে সঠিক শিক্ষায় গড়ে তোলা এবং সামাজিক বন্ধন শক্তিশালী করা।' },
          IdealsAndValuesDecFourTitle: { text: 'সামাজিক দায়বদ্ধতা ও সেবা' },
          IdealsAndValuesDecFour: { text: 'মানব সেবার মাধ্যমে একটি উত্তম সমাজ গঠন, যেখানে প্রত্যেকেই একে অপরের কল্যাণে কাজ করবে।' },
          IdealsAndValuesDecFiveTitle: { text: 'শিক্ষা ও জ্ঞানচর্চা' },
          IdealsAndValuesDecFive: { 
            text: 'কুরআন ও সুন্নাহর আলোকে সঠিক জ্ঞান অর্জনের মাধ্যমে জীবনের সকল ক্ষেত্রে ইতিবাচক পরিবর্তন আনা।' },
          GoalsAndObjectives: { text: 'লক্ষ্য ও উদ্দেশ্য' },
          GoalsAndObjectivesDecOne: { 
            text: 'আমরা বিশ্বাস করি যে ইসলামের জ্ঞান চর্চার মাধ্যমে নৈতিকতা, সহমর্মিতা, এবং সেবার মনোভাব' +
            ' গড়ে তোলা সম্ভব। আমাদের লক্ষ্য শুধুমাত্র ধর্মীয় শিক্ষার সীমানায় সীমাবদ্ধ নয়, বরং সমাজের সকল স্তরে ইসলামের' +
             ' মূল্যবোধগুলো বাস্তবায়নের মাধ্যমে একটি শান্তিপূর্ণ ও নৈতিক সমাজ প্রতিষ্ঠা করা। আমাদের উদ্দেশ্যগুলোর মধ্যে রয়েছে:' 
            },
          
          GoalsAndObjectivesDecTwoTitle: {
            text: 'ইসলামিক জ্ঞানচর্চা ও গবেষণা'
          },
          GoalsAndObjectivesDecTwo: {
            text: 'একটি ইসলামিক প্রতিষ্ঠান ইসলামিক ইতিহাস, সংস্কৃতি, এবং বৈশ্বিক সভ্যতায় ইসলামের অবদান সম্পর্কিত' +
             'গবেষণাকে উৎসাহিত করতে পারে যাতে ইসলামের জ্ঞানভাণ্ডার নিয়ে সচেতনতা বৃদ্ধি পায়।'
          },
          GoalsAndObjectivesDecThreeTitle: {
            text: 'ইসলামী শিক্ষা প্রদান'
          },
          GoalsAndObjectivesDecThree: {
            text: 'অধিকাংশ মুসলিম পরিবার তাদের শিশুদের জন্য অমুসলিম দেশগুলোতে কাঠামোগত ধর্মীয় শিক্ষা খুঁজে পেতে সমস্যার' +
            ' সম্মুখীন হয়। DIB এমন একটি প্ল্যাটফর্ম প্রদান করতে চায় যেখানে কুরআন অধ্যয়ন, ইসলামী আইন (শরিয়া), এবং' +
             ' আরবি ভাষার ওপর কোর্স পরিচালিত হবে। এর মাধ্যমে মুসলিম সম্প্রদায়ের একটি গুরুত্বপূর্ণ চাহিদা পূরণ করা সম্ভব হবে, এবং'+
              'একই সাথে স্থানীয় আইন ও মূল্যবোধের সাথে সামঞ্জস্য রেখে শিক্ষার পরিবেশ নিশ্চিত করা যাবে।'
          },
          GoalsAndObjectivesDecFourTitle: {
            text: 'নৈতিক সমাজ গঠন'
          },
          GoalsAndObjectivesDecFour: {
            text: 'ইসলামের এই মূল্যবোধগুলো আমাদের ব্যক্তিগত ও সামাজিক জীবনের প্রতিটি ক্ষেত্রে বাস্তবায়ন করে' +
            ' একটি সুন্দর, শান্তিপূর্ণ, এবং নৈতিক সমাজ গড়ে তোলার উদ্দেশ্যে DIB কাজ করে যাচ্ছে।'
          },
          GoalsAndObjectivesDecFiveTitle: {
            text: 'সেবার মাধ্যমে সমাজের উন্নয়ন'
          },
          GoalsAndObjectivesDecFive: {
            text: 'আমরা দায়িত্বশীলতা এবং সম্প্রদায় সেবার মানসিকতা গড়ে তোলার লক্ষ্যে কাজ করি, মুসলমানদের' +
             ' দাতব্য, সামাজিক কাজ এবং স্বেচ্ছাসেবার মাধ্যমে সমাজের কল্যাণে সক্রিয় ভূমিকা রাখতে উদ্বুদ্ধ করি। সহানুভূতি' +
             ' এবং সংহতির মূল্যবোধকে ধারণ করে আমরা আমাদের চারপাশের সম্প্রদায়কে উন্নত করার এবং ইতিবাচক' +
              'প্রভাব সৃষ্টির চেষ্টা চালিয়ে যাচ্ছি।'
          },
          OurActivities:{
            text:'দারুল ইহসান বার্লিন (DIB) এ ইসলামিক শিক্ষার বিস্তৃত এবং গভীরতা বৃদ্ধির জন্য বিভিন্ন কার্যক্রম পরিচালনা করা হয়।' +
            ' আমাদের কার্যক্রমগুলো নিম্নরূপ:'
          },
          ActivityOneTitle:{
            text:'ওয়াজ মাহফিল ও আলেমদের আমন্ত্রণ'
          },
          ActivityOne:{
            text:'বর্তমান মুসলিম সমাজের বিশিষ্ট আলেমদের আমন্ত্রণ জানিয়ে ওয়াজ মাহফিলের আয়োজন করা হয়, যাতে ইসলামিক জ্ঞান' +
             ' প্রসারিত হয় এবং সমাজের সঠিক দিকনির্দেশনা পাওয়া যায়।'
          },
          ActivityTwoTitle:{
            text:'কুরআন শিক্ষা'
          },
          ActivityTwo:{
            text:'সঠিক তারতিল ও তাজবীদ এর সাথে কোরান পড়া শেখানো হয় । ভাই-বোন ও শিশুদের জন্য আলাদা' +  
            'ক্লাসের ব্যবস্থা আছে।'
          },
          ActivityThreeTitle:{
            text:'কুরআনের তাফসীর ও প্রয়োগ'
          },
          ActivityThree:{
            text:'সাপ্তাহিক ক্লাসের মাধ্যমে কুরআনের অর্থ এবং এর গুরুত্ব অনুধাবন করার চেষ্টা করা হয়। ভাই ও বোনদের' +
             'জন্য আলাদা ক্লাসের ব্যবস্থা আছে ।'
          },
          ActivityFourTitle:{
            text:'সীরাহ পাঠ'
          },
          ActivityFour:{
            text:'রাসূল মুহাম্মদ (সা.) এর জীবন থেকে শিক্ষা নিয়ে বাস্তব জীবনে প্রয়োগ করার চেষ্টা করা হয়।শিশু-কিশোরদের' +
            ' জন্য সাপ্তাহিক সীরাহ ক্লাস নেয়া হয় যেখানে তারা সকল নবী-রাসূলদের জীবনী পড়া এবং সেখান থেকে শিক্ষা গ্রহণ করতে পারে।'
          },
          ActivityFiveTitle:{
            text:'দ্বি-সাপ্তাহিক দারসুল কুরআন '
          },
          ActivityFive:{
            text:'কুরআনের আলোকে বিভিন্ন বিষয়ভিত্তিক আলোচনা করা হয়। এই সভায় বাংলায় আলোচনা করা হয়।'
          },
          ActivitySixTitle:{
            text:'সাপ্তাহিক কুরআন স্টাডি সার্কেল'
          },
          ActivitySix:{
            text:'সদস্যদের জন্য সাপ্তাহিক কুরআন স্টাডি সার্কেল অনুষ্ঠিত হয়, যেখানে কুরআনের পাঠ এবং তার তাফসীর নিয়ে আলোচনা করা হয়।'
          },
          ActivitySevenTitle:{
            text:'মুবাশশিরা: সাপ্তাহিক অনলাইন হালাকা (শুধুমাত্র নারীদের জন্য)'
          },
          ActivitySeven:{
            text:'নারীদের জন্য বিশেষ অনলাইন হালাকা অনুষ্ঠিত হয়, যেখানে বিষয়ভিত্তিক আলোচনা, নবী-রাসূলদের জীবনী, উম্মুল মুমিনিনদের জীবন থেকে শিক্ষা, আসমাউল হুসনা ইত্যাদি বিষয়ে বক্তব্য দেয়া হয়। '
          },
          ActivityEightTitle:{
            text:'ব্যক্তিগত উন্নয়ন গ্রুপ'
          },
          ActivityEight:{
            text:'ছোট ছোট গ্রুপে কুরআন তিলাওয়াত এবং হেফজ উন্নত করার জন্য কর্মশালা পরিচালনা করা হয়। এই কার্যক্রমের মাধ্যমে সদস্যরা একে অপরকে সহায়তা করে এবং একে অপরকে উন্নত করতে সহায়তা করে ।'
          },
          ActivityNineTitle:{
            text:'তরুণ মুসলিমদের  জন্য বিশেষ কার্যক্রম'
          },
          ActivityNine:{
            text:'তরুণ/তরুণীদের জন্য পৃথক ক্লাসের মাধ্যমে বিশেষ কার্যক্রম পরিচালনা করা হয়, যাতে তারা ইসলামের প্রকৃত আদর্শে বেড়ে উঠতে পারে। এই কার্যক্রমগুলোর মাধ্যমে আমরা তাদের মধ্যে আত্মবিশ্বাস এবং ইসলামের প্রতি ভালোবাসা সৃষ্টি করতে চেষ্টা করি।'
          },
          ActivityTenTitle:{
            text:'কেন্দ্রিয় লাইব্রেরি'
          },
          ActivityTen:{
            text:'বাংলা, জার্মান, এবং ইংরেজি ভাষায় ইসলামিক বইয়ের একটি কেন্দ্রীয় লাইব্রেরি প্রতিষ্ঠা কড়া হয়েছে, যেখানে সদস্যরা ইসলামী জ্ঞানের বিভিন্ন বিষয় সম্পর্কে বই পড়তে এবং জানতে পারেন। সকল বয়সের সদস্যদের জন্য বই সংগ্রহ করা হয় ।'
          },
          ActivityElevenTitle:{
            text:'শিশুদের জন্য কর্মশালা'
          },
          ActivityEleven:{
            text:'শিশুদের জন্য বিভিন্ন বিষয়ের উপর কর্মশালা অনুষ্ঠিত হয়, যেমন “কিভাবে ভালো মুসলিম হতে হয়” ইত্যাদি। এই কর্মশালাগুলো তাদের মধ্যে ইসলামের মূলনীতির প্রতি আগ্রহ ও ভালোবাসা তৈরি করতে সহায়ক হয়।'
          },
          ActivityTwelveTitle:{
            text:''
          },
          ActivityTwelve:{
            text:''
          },
          DIBVision:{
            text:'DIB ভিশন'
          },
          DIBVisionDecOne:{
            text:'দারুল ইহসান বার্লিন (DIB) প্রতিষ্ঠার পর থেকে আমরা আমাদের বার্লিনে অবস্থারত মুসলিমদের  জন্য একটি সুষ্ঠ এবং' +
            ' প্রগতিশীল পরিবেশ তৈরি করার স্বপ্ন দেখি। বর্তমানে আমাদের ১৪০ মিটার বর্গক্ষেত্রের মসজিদে ২০০ জন মুসল্লি একসাথে নামাজ' +
            'আদায় করতে সক্ষম হলেও, আমদের প্রয়োজন এবং স্বপ্ন আরও বড় । দারুল ইহসান বার্লিনের উদ্দেশ্য একটি বৃহত্তর ইসলামী কেন্দ্র প্রতিষ্ঠা' +
            'করা, যেখানে আমরা আমাদের কার্যক্রমকে সম্প্রসারিত করতে পারবো এবং আরও নতুন উদ্যোগ গ্রহণ করতে পারবো।'
          },
          DIBVisionDecTwo:{
            text:'আমরা একটি পূর্ণকালীন মাদ্রাসা স্থাপন করার স্বপ্ন দেখি, যেখানে শিশু ও যুবকদের জন্য ইসলামিক শিক্ষার গুণগত' +
            ' মান নিশ্চিত করা হবে। আমাদের লক্ষ্য হল পরিবারের জন্য একটি ইসলামী কেন্দ্র গড়ে তোলা, যেখানে বিভিন্ন ইসলামিক' +
            ' কার্যক্রম, কুরআন শিক্ষা, তাফসীর, এবং সীরাতের পাঠের ব্যবস্থা থাকবে।'
          },
          DIBVisionDecThree:{
            text:'আলাদা নামাজের স্থান এবং শ্রেণীকক্ষের মাধ্যমে শিশুদের জন্য আধুনিক শিক্ষার ব্যবস্থা করতে চাই যাতে তারা নিবিড়' +
             ' পর্যবেক্ষণের সাথে ইসলামী শিক্ষা গ্রহণের পাশাপাশি আধুনিক জ্ঞান অর্জন করতে পারে।'
          },
          DIBVisionDecFour:{
            text:'আমাদের ভিশন হলো একটি শক্তিশালী ও সংগঠিত মুসলিম সম্প্রদায় গঠন করা, যেখানে আমাদের সদস্যরা ইসলামের' +
             ' মূল আদর্শকে জীবনের প্রতিটি ক্ষেত্রে অনুসরণ করতে পারে। আমরা বিশ্বাস করি, এই উদ্যোগের মাধ্যমে আমরা বার্লিনের বাংলাদেশী' +
              ' মুসলিম সম্প্রদায়কে আরও শক্তিশালী এবং চিন্তাশীল করে গড়ে তুলতে সক্ষম হবো।'
              },

        },
      },
    },
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;