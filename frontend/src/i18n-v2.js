import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
             bn: {
                  translation: {
                      AboutUs: {text: 'আমাদের সম্পর্কে'},
                      Membership: {text: "সদস্যপদ"},
                      Home: {text: 'হোম'},
                      Vision: {text: 'ভিশন'},
                      Academy: {text: 'একাডেমি'},
                      Donation: {text: 'ডোনেশন'},
                      Download: {text: 'ডাউনলোড করুন'},
                  }
             },
            de: {
                translation: {
                    AboutUs: {text: 'Über uns'},
                    Membership: {text: "Mitgliedschaft"},
                    Home: {text: 'Home'},
                    Vision:{text: 'Vision'},
                    Academy:{text:'Akademie'},
                    Donation:{text:'Spende'},
                    Download:{text:'Herunterladen'},
                }
            },
            en: {
                translation: {
                    AboutUs: {text: 'About Us'},
                    Membership: {text: "Membership"},
                    Home: {text: 'Home'},
                    Vision:{text: 'Vision'},
                    Academy:{text:'Academy'},
                    Donation:{text:'Donation'},
                    Download:{text:'Download'},
                }
            },
        },
        lng: localStorage.getItem("languageCode") ? localStorage.getItem("languageCode") : 'bn', // if you're using a language detector, do not define the lng option
        fallbackLng: 'bn',
        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });

export default i18n;