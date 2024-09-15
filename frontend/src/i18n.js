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
                PreyerTimeMessage: {
                    text:'There are 5 prayers every day and two Jummah prayers every Friday.'
                },
                OurHistory:{
                  text:'Our History',
                },
                CreationOfOurGroup:{
                  text:'Creation of Our Group',
                },
                OurHistoryDec:{
                  text: 'Darul Ihsan Berlin’s journey began with a long-reaching dream of some families living in ' +
                      'Berlin for reading and understanding the Word of Allah correctly and trying to implement it in ' +
                      'their own lives as a result of today’s DIB. This organisation dreams of building a strong ' +
                      'Muslim community for the Bangladeshi Muslims in Berlin and Germany. ' +
                      'Darul Ihsan Berlin’s path in the hope that people of all classes, ' +
                      'professions and ages will learn the Qur’an and find a way of life from it.'
                },
                WelcomeToDarulIhsan:{
                  text: 'Welcome To Darul Ihsan Berlin e.V'
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
                  text: 'Die Reise von Darul Ihsan Berlin begann mit dem lang gehegten Traum einiger in Berlin lebender Familien, ' +
                      'das Wort Allahs richtig zu lesen und zu verstehen und es als Ergebnis des heutigen DIB in ihrem eigenen Leben ' +
                      'umzusetzen. Diese Organisation träumt davon, eine starke muslimische Gemeinschaft für die bangladeschischen ' +
                      'Muslime in Berlin und Deutschland aufzubauen. Darul Ihsan Berlins Weg ist in der Hoffnung,' +
                      ' dass Menschen aller Klassen, Berufe und Altersgruppen den Koran lernen und daraus eine Lebensweise finden.'
                },
                WelcomeToDarulIhsan:{
                  text: 'Willkommen bei Darul Ihsan Berlin e.V'
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