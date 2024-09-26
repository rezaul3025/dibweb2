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
                AboutUs: {
                    text: 'About Us',
                },
                ContactUs: {
                    text: "Contact Us",
                },
                Home: {
                    text: 'Home',
                },
                Activities:{
                    text:'Activities',
                },
                Donation:{
                  text:'Donation'
                },
                PrayerTime:{
                  text:'Prayer Time'
                },
                Language:{
                   test:''
                },
                PreyerTimeMessage: {
                    text:'There are 5 prayers every day and two Jummah prayers every Friday.'
                },
                OurHistory:{
                  text:'History of Darul Ihsan Berlin',
                },
                CreationOfOurGroup:{
                  text:'Creation of Our Group',
                },
                OurHistoryDec:{
                  text: 
                      'In 2013, five families in Berlin came together with a desire to gain a deeper understanding of ' + 
                      'Islam’s teachings and way of life, which led them to begin Quranic Tafsir sessions.' + 
                      'Over time, the need arose for an organization where families could study the Quran, Tafsir, and Seerah together,'+
                      'guiding their lives with the light of Islamic knowledge. By then, the Darul Ihsan family had grown to 18 families.' +
                      'By the immense grace of Allah, in 2018, this dream became a reality with the establishment of Darul Ihsan Berlin (DIB).' +
                    
                      'From the very beginning, Darul Ihsan Berlin (DIB) has operated as an institution rooted in family and Islamic education.' +
                      'Alongside Quranic education, one of DIB’s primary goals is the implementation of Quranic teachings in all aspects of society.'+
                      'It is not only focused on Quran and Tafsir lessons but also on how to apply the guidance of the Quran in every aspect of ' + 
                      'life through discussions and activities. The main objective of Darul Ihsan Berlin is to foster Quranic education' +
                       'in a family-oriented environment and to implement Islamic teachings in social life. DIB is working towards strengthening' +
                      'and enlightening the Bangladeshi Muslim community in Berlin. The organisation envisions building a united society based on' +
                      'knowledge, where individual and collective life is guided by the light of the Quran.' 
                },
                WelcomeToDarulIhsan:{
                  text: 'Welcome To Darul Ihsan Berlin e.V'
                },
                IdealsAndValues:{
                  text:'Ideals and Values'
                },
                IdealsAndValuesDec:{
                  text:'Unwavering Faith in Allah: Remaining steadfast in the fundamental beliefs of' + 
                   'Islam and striving to attain Allah’s pleasure in everyday life. Following the Sunnah of' +
                   ' the Prophet (PBUH): Applying the principles and teachings of the life of the Prophet (PBUH) in ' +
                   'all aspects of life, so that we may draw closer to Allah and build a better society.' +
                   'Family Bond and Compassion: Building families with proper education based on Islamic ideals and' +
                   'strengthening social bonds. Social Responsibility and Service: Creating a better society through' +
                   'humanitarian service, where everyone works for the welfare of one another.' + 
                   'Education and Knowledge: Bringing positive change in all aspects of life by acquiring proper' +
                  'knowledge in light of the Quran and Sunnah.',

                }, 
                GoalsAndObjectives:{
                  textt:'Goals and Objectives'
                },
                GoalsAndObjectivesDec:{
                  textt:'We believe that by cultivating Islamic knowledge, it is possible to develop morality, compassion, and' +
                   'a sense of service. Our goal is not limited to religious education alone, but to establish a peaceful' +
                    'and ethical society by implementing Islamic values at all levels of society. Our objectives include:' + 
                 '- Islamic Knowledge and Research: As an Islamic institution, we aim to encourage research on Islamic history,' +
                  'culture, and the contributions of Islam to global civilization, increasing awareness about the rich knowledge' +
                   'base of Islam. - Providing Islamic Education: Most Muslim families face difficulties in finding structured' +
                    'religious education for their children in non-Muslim countries. DIB seeks to provide a platform where' +
                     'courses on Quran study, Islamic law (Sharia), and the Arabic language are offered. This will fulfil' +
                      'a crucial need of the Muslim community while ensuring the educational environment aligns with local' +
                       'laws and values. - Building a Moral Society: DIB is working to implement these Islamic values in' +
                       'every aspect of personal and social life, with the aim of creating a beautiful, peaceful, and moral society.'

                },
            },
        },
        de: {
            translation: {
                AboutUs: {
                    text: "Über uns",
                },
                 ContactUs: {
                    text: "Kontakt",
                },
                Home: {
                    text: 'Startseite',
                },
                Activities:{
                    text:'Aktivitäten',
                },
                Donation:{
                  text:''
                },
                PrayerTime:{
                  text:''
                },
                Language:{
                  test:''
               },
                PreyerTimeMessage: {
                    text:'Jeden Tag gibt es 5 Gebete und jeden Freitag zwei Jummah-Gebete.'
                },
                OurHistory:{
                  text:'Unsere Geschichte',
                },
                CreationOfOurGroup:{
                  text:'Gründung unserer Gruppe',
                },
                OurHistoryDec:{
                  text: ' ' +
                      '' +
                      '' +
                      ' ' +
                      ' '
                },
                WelcomeToDarulIhsan:{
                  text: 'Willkommen bei Darul Ihsan Berlin e.V'
                },
                IdealsAndValues:{
                  text:''
                },
                IdealsAndValuesDec:{
                  text:''
                },
                GoalsAndObjectives:{
                  textt:'Goals and Objectives'
                },
                GoalsAndObjectivesDec:{
                  textt:''
                },
            },
        },
        bn: {
          translation: {
              AboutUs: {
                  text: '',
              },
               ContactUs: {
                  text: "",
              },
              Home: {
                  text: '',
              },
              Activities:{
                  text:'',
              },
              Donation:{
                text:''
              },
              PrayerTime:{
                text:'',
              },
              Language:{
                test:''
             },
              PreyerTimeMessage: {
                  text:''
              },
              OurHistory:{
                text:'',
              },
              CreationOfOurGroup:{
                text:'',
              },
              OurHistoryDec:{
                text: ' ' +
                    ' ' +
                    ' ' +
                    ' ' +
                    ' ' +
                    ''
              },
              WelcomeToDarulIhsan:{
                text: 'Welcome To Darul Ihsan Berlin e.V'
              },
              IdealsAndValues:{
                text:''
              },
              IdealsAndValuesDec:{
                text:''
              },
              GoalsAndObjectives:{
                textt:'Goals and Objectives'
              },
              GoalsAndObjectivesDec:{
                textt:''
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