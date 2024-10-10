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
          CreationOfOurGroup: { text: 'Creation of Our Group' },
          OurHistoryDecOne: {
            text:
              'In 2013, five families in Berlin came together with a desire to gain a deeper understanding of ' +
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


        },
      },
      bn: {
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
            text:''
          },
          ActivityOneTitle:{
            text:''
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