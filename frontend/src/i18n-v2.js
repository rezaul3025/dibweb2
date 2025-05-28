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
                      DIB: 'দারুল ইহসান বার্লিন e.V.',
                      download: 'ডাউনলোড',
                      view_details: 'বিস্তারিত দেখুন',
                      AcName: 'অ্যাকাউন্টের নাম',
                      AboutUs: {
                          title: 'আমাদের সম্পর্কে',
                          description: '২০১১ সালে, বার্লিনের পাঁচটি পরিবার ইসলামের শিক্ষা এবং জীবনধারা সম্পর্কে আরও গভীর ধারণা অর্জনের আকাঙ্ক্ষা নিয়ে একত্রিত হয়েছিল,\n' +
                              'যার ফলে তারা কুরআনের তাফসির অধিবেশন শুরু করে। সময়ের সাথে সাথে, এমন একটি সংস্থার প্রয়োজন দেখা দেয় যেখানে পরিবারগুলি একসাথে কুরআন,\n' +
                              'তাফসির এবং সীরাহ অধ্যয়ন করতে পারে, ইসলামী জ্ঞানের আলোয় তাদের জীবন পরিচালনা করতে পারে।\n' +
                              'ততক্ষণে, দারুল ইহসান পরিবার ১৮টি পরিবারে বৃদ্ধি পেয়েছিল। আল্লাহর অশেষ রহমতে,\n' +
                              '২০১৮ সালে, দারুল ইহসান বার্লিন (DIB) e.V. প্রতিষ্ঠার মাধ্যমে এই স্বপ্ন বাস্তবে পরিণত হয়।',
                          history_text: 'বছরের ইতিহাস',
                          member_text: 'সদস্য',
                          associate_member_text: 'সহযোগী সদস্য',
                          board_member_text: 'বোর্ড সদস্য',
                          board_member_sub_text: 'আমাদের সাফল্যের পেছনে প্রতিভাবান ব্যক্তিরা',
                           history_timeline: {
                            title: 'দারুল ইহসান বার্লিন-এর যাত্রা',
                            y_2025: {
                                title: 'দারুল ইহসান একাডেমি',
                                description: '১ লা ফেব্রুয়ারি ২০২৫ থেকে শেখ মুস্তাফিজুর রহমান সাহেবকে প্রধান শিক্ষক করে দারুল ইহসান একাডেমি\'র অফিসিয়াল কার্যক্রম শুরু হয়।'
                            },
                            y_2024:{
                                title: 'দারুল ইনসান ভিশন',
                                description: 'সেপ্টেম্বর ২০২৪ এ "দারুল ইনসান ভিশন" প্রণয়ন করা হয় এবং এর জন্য সহযোগী সদস্য গ্রহণ করা শুরু হয়।'
                            },
                            y_2021:{
                                title: 'মসজিদ',
                                description: 'এপ্রিল ২০২১, রমজান মাস থেকে ব্রুনেনস্ট্রাসে ১২২ এ, "দারুল ইহসান বার্লিন" এর মসজিদ উন্মুক্ত করা হয়।'
                            },
                            y_2018:{
                                title: 'নিজেদের দাওয়াতী ও শিক্ষা কার্যক্রম',
                                description: '২০১৮ থেকে "দারুল ইহসান বার্লিন" নিজেদের দাওয়াতী ও শিক্ষা কার্যক্রম পরিচালনার জন্য নিজস্য জায়গার ভাড়া অথবা ক্রয় করার জন্য প্রচেস্টা শুরু হয়।' +
                                    'একই বছর ভবিষ্যতে একটি মসজিদ এবং মাদ্রাসা প্রতিষ্ঠার পরিকল্পনাকে মাথায় রেখে শেখ মুস্তাফিজুর রহমান সাহেবকে শিক্ষক হিসেবে সম্পৃক্ত করে।'
                            },
                            y_2016:{
                                title: 'এসোসিয়েশন রেজিস্ট্রেশন',
                                description: '২০১৬ সালে এসে নিজেদের দাওয়াতী কার্যক্রম পরিচালনাকে প্রাতিষ্ঠানিক রূপ দেওয়ার জন্য "দারুল ইহসান বার্লিন" নামে একটি থেকে এসোসিয়েশন রেজিস্ট্রেশনের কাজ শুরু করে।'
                            },
                            y_2015:{
                                title: 'উম্মুক্ত দাওয়াহ কার্যক্রম শুরু',
                                description: '২০১৫ সালে এসে পাক্ষিক ভাবে ফ্রিড্রিকশাইনের ভিন স্ট্রাসেতে একটি পাবলিক মিটিং হল ভাড়া করে কুরআন কে সহজ ভাবে সকল মানুশের মাঝে সহজ ভাবে তুলে ধরার মাধ্যমে উম্মুক্ত দাওয়াহ কার্যক্রম শুরু।'
                            },
                            y_2011:{
                                title: 'কুরআন স্টাডি সার্কেল\'র যাত্রা শুরু',
                                description: 'মে ২০১১- ৫ টি পরিবার প্রতি সপ্তাহে তাদের ড্রয়িংরুমে কুরআন স্টাডি সার্কেল আয়োজনের মধ্য দিয়ে যাত্রা শুরু করে।'
                            }
                        }
                      },
                      Membership: {
                          title: 'সদস্যপদ',
                          heading: 'সহযোগী সদস্য হন',
                          description: 'দারুল ইহসান বার্লিন আল্লাহর পথে কাজ করছে এবং একটি মসজিদ পরিচালনা করছে। এর লক্ষ্যকে এগিয়ে নিতে, দারুল ইহসান বার্লিন e.V. দাতা সদস্যদের স্বাগত জানানোর জন্য একটি কর্মসূচি চালু করেছে। ' +
                              'যারা দ্বীনের (ঈমানের) পক্ষে সমর্থন করতে চান তাদের আমরা সদস্য হিসেবে যোগদানের জন্য উৎসাহিত করি। আল্লাহ আমাদের সকলকে পুরস্কৃত করুন, ইনশাআল্লাহ।'
                      },
                      Home: {
                          title: 'হোম',
                          heading: 'আল-আসরের (সময়ের) শপথ। নিশ্চয়ই মানুষ [গভীর] ক্ষতির মধ্যে নিমজ্জিত, তবে তারা ব্যতীত যারা ঈমান আনে এবং সৎকর্ম করে, একে অপরকে সত্যের দিকে উৎসাহিত করে এবং একে অপরকে ধৈর্যের দিকে উৎসাহিত করে।',
                          sub_heading: 'আল-কুরআন ১০৩',
                          next_event: 'Upcoming Events',
                          mission_vision: 'মিশন এবং ভিশন',
                          vision_heading: 'দারুল ইহসান বার্লিনের ভিশন',
                          vision_sub_heading: 'বার্লিনের মুসলমান, বিশেষ করে বাংলাদেশীদের সংগঠিত করে ইসলামের আদর্শ ও শিক্ষাকে ধারণ করে এমন একটি সমাজ ব্যবস্থা বিনির্মাণ করার জন্য প্রচেষ্টা চালিয়ে যাওয়া।',
                          mission: {
                              title: 'মিশন : (৪ দফা কার্যক্রম)',
                              items:
                                  {
                                      title_0: "আত্ম উন্নয়ন ",
                                      description_0: "আল-কুরআন, সুন্নাহ ও সীরাহ্‌-এর সঠিক জ্ঞানার্জন, এর আলোকে আমল ও আত্ম উন্নয়নের মাধ্যমে দ্বীনের একজন দায়ী হিসেবে গড়ে তোলা।",

                                      title_1: "দাওয়াত ",
                                      description_1: "সকল মুসলিমদের মধ্যে আল-কুরআনের শিক্ষা, রাসুল সাঃ এর জীবনী  ও সুন্নাহর প্রচার ও প্রসারের মাধ্যমে ইসলামের সত্যতা, এবং সৌন্দর্য তুলে ধরা। এই লক্ষ্যে নিয়মিত দারসুল কুরআন, ওয়াজ মাহ্‌ফিল, ইসলামী সেমিনার ও আলোচনা সভা আয়োজন করা। \n" +
                                          "অন্যান্য ধর্মাবলম্বীদের কাছে ইসলামের সঠিক শিক্ষা তুলে ধরা এবং ভূল ধারণাগুলো দূর করার চেষ্টা করা।",

                                      title_2: "প্রতিষ্ঠান ",
                                      description_2: "দ্বীনি শিক্ষাকে প্রতিষ্ঠানিক রূপ দেয়ার জন্য মাদ্রাসা কার্যক্রম, ইসলামিক লাইব্রেরি পরিচালনা, এবং বিভিন্ন কোর্স চালুর মাধ্যমে শিশু , কিশোর এবং প্রাপ্তবয়ষ্কদের ইসলাম শিক্ষায় সম্পৃক্ত করা ।",

                                      title_3: "মানবতার জন্য দায়বদ্ধতা ",
                                      description_3: "বিভিন্ন সামাজিক ও মানবিক কল্যানমুলক কাজে উদ্যোগ গ্রহণ এবং স্বেচ্ছাসেবী হিসেবে ভুমিকা রাখা।"
                                  }
                          },
                          Goal: {
                              title: 'লক্ষ্য',
                              description: 'দারুল ইহসানের সকল শিক্ষা, দাওয়াতী ও সামাজিক কার্যক্রম পরিচালনার জন্য একটি পুরণাংগ ইসলামিক সেন্টার প্রতিষ্ঠা করা, যাকে কেন্দ্র করে কুরআন ও সুন্নাহর আলোকে পরিচালিত একটি ইসলামী সমাজ গড়ে উঠবে। ' +
                                  'এই সেন্টারে অন্তর্ভুক্ত থাকবে একটি পুর্ণকালীন মাদ্রাসা, যেখান থেকে পরবর্তী প্রজন্ম থেকে সমাজের জন্য আলেম উলামা তৈরীর বীজ বপন করা হবে । ' +
                                  'এই সেন্টার হবে সমাজের মুসলিম পরিবারগুলোর সকলের ইসলামী পরিবেশে সামাজিক মিলনের একটি প্রাণকেন্দ্র।'
                          }
                      },
                      Vision: {
                          title: 'ভিশন',
                          heading: 'আমাদের লক্ষ্যকে সমর্থন করুন',
                          description: 'দারুল ইহসান বার্লিন (DIB) প্রতিষ্ঠার পর থেকে, আমরা বার্লিনে বসবাসকারী মুসলমানদের জন্য একটি সুস্থ ও প্রগতিশীল পরিবেশ তৈরির স্বপ্ন দেখে আসছি। যদিও আমাদের বর্তমান মসজিদ, ১৪০ বর্গমিটার আয়তনের, একসাথে ২০০ জন মুসল্লির থাকার ব্যবস্থা করে, তবুও আমাদের চাহিদা এবং আকাঙ্ক্ষা অনেক বেশি। ' +
                              'দারুল ইহসান বার্লিন একটি বৃহত্তর ইসলামিক কেন্দ্র প্রতিষ্ঠার স্বপ্ন দেখে যেখানে আমরা আমাদের কার্যক্রম সম্প্রসারণ করতে এবং নতুন উদ্যোগ গ্রহণ করতে পারি।'
                      },
                      Academy: {
                          nav_title: 'একাডেমি',
                          page_title: 'দারুল ইহসান বার্লিন একাডেমি',
                          page_motto: '',
                          established: '2024 সালে প্রতিষ্ঠিত',
                          notice_board: 'নোটিশ বোর্ড ',
                          download: 'ডাউনলোড করুন',
                          courses_section: 'বিভাগসমুহ ও শিক্ষাদানের সময়সীমা'
                      },
                      Donation: {
                          title: 'ডোনেশন',
                          heading: 'একটি ইসলামিক সেন্টার তৈরিতে সহায়তা করুন',
                          sub_heading: 'যে ব্যক্তি আল্লাহর জন্য একটি মসজিদ নির্মাণ করবে, আল্লাহ তার জন্য জান্নাতে অনুরূপ একটি ঘর নির্মাণ করবেন।',
                          sub_heading_1: 'Ṣaḥīḥ al-Bukhārī 450, Ṣaḥīḥ Muslim 533',
                          paypal_heading: 'PayPal Donation',
                          paypal_button_heading: 'PayPal দিয়ে দান করুন',
                          paypal_heading_RRcode: 'PayPal QR Code',
                          paypal_heading_RRcode_ins: 'PayPal এর মাধ্যমে দান করতে স্ক্যান করুন',
                          bank_transfer_heading: 'ব্যাংকের বিবরণ',
                          bank_name: 'ব্যাংকের নাম',
                          thank_msg: 'আপনার সমর্থনের জন্য ধন্যবাদ! আপনার অবদান আমাদের পরিবর্তন আনতে সাহায্য করবে।'
                      },
                      Download: {
                          title: 'ডাউনলোড করুন',
                          heading: 'ডাউনলোড করার জন্য ফাইলগুলি',
                          heading_files: 'ডাউনলোডযোগ্য ফাইল'
                      },
                      Footer: {
                          DescText: 'পারিবারিক পরিবেশে কুরআন শিক্ষার প্রসার ঘটানো এবং সামাজিক জীবনে ইসলামী শিক্ষা বাস্তবায়ন করা।',
                          ContactUs: 'যোগাযোগ',
                          BankDetails: 'ব্যাংকের তথ্য',
                          QuickLinks: 'Quick Links',
                          CopyAll: 'Copy All'
                      },
                      MemberAnnouncement: {
                          heading: 'দারুল ইনসান ভিশনের একজন পৃষ্ঠপোষক হোন।',
                          sub_heading: 'সহযোগী সদস্য হিসেবে যোগদান করুন।',
                          description: 'দারুল ইহসান বার্লিন আল্লাহর পথে কাজ করছে এবং একটি মসজিদ পরিচালনা করছে। এর লক্ষ্যকে এগিয়ে নিতে, দারুল ইহসান বার্লিন e.V. দাতা সদস্যদের স্বাগত জানানোর জন্য একটি প্রোগ্রাম চালু করেছে। ' +
                              'যারা দ্বীনের (ঈমানের) পক্ষে সমর্থন করতে চান তাদের আমরা সদস্য হিসেবে যোগদানের জন্য উৎসাহিত করি। আল্লাহ আমাদের সকলকে পুরস্কৃত করুন, ইনশাআল্লাহ।'
                      }
                  }
             },
            de: {
                translation: {
                    DIB: 'Darul Ihsan Berlin e.V',
                    download: 'Herunterladen',
                    view_details: 'Details anzeigen',
                    AcName: 'Kontoinhaber',
                    AboutUs: {
                        title: 'Über uns',
                        description: 'Im Jahr 2011 schlossen sich fünf Berliner Familien zusammen, um die Lehren und die Lebensweise des Islam besser zu verstehen. ' +
                            'Dies führte dazu, dass sie mit Koran-Tafsir-Sitzungen begannen. Mit der Zeit entstand der Bedarf nach einer Organisation, in der Familien gemeinsam Koran, Tafsir und Sira studieren und ihr Leben im Licht des islamischen Wissens gestalten konnten. ' +
                            'Zu diesem Zeitpunkt war die Familie Darul Ihsan auf 18 Familien angewachsen. ' +
                            'Durch die große Gnade Allahs wurde dieser Traum 2018 mit der Gründung von Darul Ihsan Berlin (DIB) e.V. Wirklichkeit.',
                        history_text: 'Jahre der Geschichte',
                        member_text: 'Mitglieder',
                        associate_member_text: 'Assoziierte Mitglieder',
                        board_member_text: 'Vorstandsmitglied',
                        board_member_sub_text: 'Die talentierten Menschen hinter unserem Erfolg',
                        history_timeline: {
                            title: 'Die Reise von Darul Ihsan Berlin',
                            y_2025: {
                                title: 'Darul Ihsan Academy',
                                description: 'Die offiziellen Aktivitäten der Darul Ihsan Academy begannen am 1. Februar 2025 mit Sheikh Mustafizur Rahman als Schulleiter.'
                            },
                            y_2024:{
                                title: 'Darul Insan Vision',
                                description: 'Im September 2024 wurde „Darul Insan Vision“ formuliert und die Aufnahme assoziierter Mitglieder begann.'
                            },
                            y_2021:{
                                title: 'Moschee',
                                description: 'Ab April 2021 ist mit Beginn des Fastenmonats Ramadan die Moschee „Darul Ihsan Berlin“ in der Brunnenstraße 122 geöffnet.'
                            },
                            y_2018:{
                                title: 'Eigene Dawah und Bildungsprogramme',
                                description: 'Seit 2018 versucht „Darul Ihsan Berlin“, eigene Räumlichkeiten für seine Da\'wah- und Bildungsaktivitäten zu mieten oder zu erwerben. Im selben Jahr wurde Scheich Mustafizur Rahman als Lehrer engagiert, mit dem Plan, in Zukunft eine Moschee und eine Madrasa zu errichten.'
                            },
                            y_2016:{
                                title: 'Vereinsregistrierung',
                                description: 'Im Jahr 2016 begann ein Verein namens „Darul Ihsan Berlin“ mit der Registrierung, um seine Dawah-Aktivitäten zu institutionalisieren.'
                            },
                            y_2015:{
                                title: 'Beginn der offenen Dawah-Aktivitäten',
                                description: 'Im Jahr 2015 begannen wir mit einem offenen Dawah-Programm, indem wir alle zwei Wochen einen öffentlichen Versammlungssaal in der Wienstraße in Friedrichshain mieteten, um allen Menschen den Koran auf leicht verständliche Weise vorzustellen.'
                            },
                            y_2011:{
                                title: 'Die Reise des Quran Sturdy Circle beginnt',
                                description: 'Mai 2011 – 5 Familien begannen ihre Reise, indem sie jede Woche einen Koranstudienkreis in ihrem Wohnzimmer veranstalteten.'
                            }
                        }
                    },
                    Membership: {
                        title: "Mitgliedschaft",
                        heading: 'Werden Sie assoziiertes Mitglied',
                        description: 'Darul Ihsan Berlin arbeitet auf dem Weg Allahs und betreibt eine Moschee. Um seine Mission voranzutreiben, hat Darul Ihsan Berlin e.V. ein Programm zur Aufnahme von Spendern ins Leben gerufen. ' +
                            'Wir ermutigen alle, die die Sache des Glaubens unterstützen möchten, Mitglied zu werden. Möge Allah uns alle belohnen, inschallah.'
                    },
                    Home: {
                        title: 'Home',
                        heading: 'Bei Al-‘Asr (der Zeit). Wahrlich, der Mensch ist [tief] im Verlust, außer denen, die glauben und gute Taten tun, sich gegenseitig zur Wahrheit anhalten und sich gegenseitig zur Geduld anhalten.',
                        sub_heading: 'Al-Quran 103',
                        next_event: 'Kommende Veranstaltungen',
                        mission_vision: 'Mission und Vision',
                        vision_heading: 'Die Vision von Darul Ihsan Berlin',
                        vision_sub_heading: 'Die Bemühungen zur Organisation der Muslime in Berlin, insbesondere der Bangladescher, fortzusetzen und ein soziales System aufzubauen, das die Ideale und Lehren des Islam verkörpert.',
                        mission: {
                            title: 'Mission: (4-Punkte-Aktivitäten)',
                            items:
                                {
                                    title_0: "Selbstentwicklung",
                                    description_0: "Sich selbst als verantwortungsbewusste Person der Religion zu entwickeln, indem man genaue Kenntnisse über den Koran, die Sunna und die Sira erlangt, im Lichte dessen handelt und sich selbst weiterentwickelt.",

                                    title_1: "Einladung",
                                    description_1: "Die Wahrheit und Schönheit des Islam soll allen Muslimen durch die Lehren des Korans, der Biographie des Propheten Mohammed (Friede sei mit ihm) und der Sunna nahegebracht werden. " +
                                        "Zu diesem Zweck werden regelmäßig Darsul Quran, Waz Mahfil, islamische Seminare und Diskussionsveranstaltungen organisiert. " +
                                        "Anhängern anderer Religionen sollen die wahren Lehren des Islam vermittelt und Missverständnisse ausgeräumt werden.",

                                    title_2: "Organist ",
                                    description_2: "Institutionalisierung der islamischen Bildung durch Einbeziehung von Kindern, Jugendlichen und Erwachsenen in die islamische Bildung durch Madrasa-Aktivitäten, Betrieb islamischer Bibliotheken und Einführung verschiedener Kurse.",

                                    title_3: "Verantwortung für die Menschheit",
                                    description_3: "Initiative ergreifen und sich ehrenamtlich in verschiedenen sozialen und humanitären Wohlfahrtsaktivitäten engagieren."
                                }
                        },
                        Goal: {
                            title: 'Ziel',
                            description: 'Die Gründung eines vollwertigen islamischen Zentrums für alle Bildungs-, Da\'wah- und sozialen Aktivitäten von Darul Ihsan, um das herum eine islamische Gesellschaft entstehen soll, die sich am Licht des Korans und der Sunna orientiert. ' +
                                'Zu diesem Zentrum gehört auch eine vollwertige Madrasa, von der aus die Grundlage für die Ausbildung von Gelehrten für die nächste Generation gelegt wird. ' +
                                'Dieses Zentrum wird ein Treffpunkt für alle muslimischen Familien der Gesellschaft in islamischem Umfeld sein.'
                        }
                    },
                    Vision: {
                        title: 'Vision',
                        heading: 'Unterstützen Sie unsere Mission',
                        description: 'Seit der Gründung von Darul Ihsan Berlin (DIB) träumen wir davon, ein gesundes und fortschrittliches Umfeld für die in Berlin lebenden Muslime zu schaffen. Obwohl unsere derzeitige Moschee mit 140 Quadratmetern Platz für 200 Gläubige bietet, sind unsere Bedürfnisse und Ziele viel größer. ' +
                            'Darul Ihsan Berlin träumt von der Gründung eines größeren islamischen Zentrums, in dem wir unsere Aktivitäten ausweiten und neue Initiativen ergreifen können.'
                    },
                    Academy: {
                        nav_title: 'Akademie',
                        page_title: 'Darul Ihsan Berlin Academy',
                        page_motto: 'Exzellenz durch Innovation',
                        established: 'Gegründet 2024',
                        notice_board: 'Anschlagbrett',
                        download: 'Herunterladen',
                        courses_section: 'Fachbereiche und Lehrzeiten'
                    },
                    Donation: {
                        title: 'Spende',
                        heading: 'Unterstützung beim Bau eines islamischen Zentrums',
                        sub_heading: 'Wer für Allah eine Moschee baut, dem wird Allah im Paradies ein Haus wie dieses bauen.',
                        sub_heading_1: 'Ṣaḥīḥ al-Bukhārī 450, Ṣaḥīḥ Muslim 533',
                        paypal_heading: 'PayPal-Spende',
                        paypal_button_heading: 'Spenden mit PayPal',
                        paypal_heading_RRcode: 'PayPal QR Code',
                        paypal_heading_RRcode_ins: 'Scannen, um über PayPal zu spenden',
                        bank_transfer_heading: 'Banküberweisung',
                        bank_name: 'Name der Bank',
                        thank_msg: 'Vielen Dank für Ihre Unterstützung! Ihr Beitrag hilft uns, etwas zu bewegen.'
                    },
                    Download: {
                        title: 'Herunterladen',
                        heading: 'Artikel herunterladen',
                        heading_files: 'Herunterladbare Dateien'
                    },
                    Footer: {
                        DescText: 'Förderung der Koranbildung in einem familienorientierten Umfeld und Umsetzung der islamischen Lehren im gesellschaftlichen Leben.',
                        ContactUs: 'Kontakt',
                        BankDetails: 'Bankverbindung',
                        QuickLinks: 'Direktlinks',
                        CopyAll: 'Alles kopieren'
                    },
                    MemberAnnouncement: {
                        heading: 'Werden Sie Förderer von Darul Insan Vision.',
                        sub_heading: 'Werden Sie assoziiertes Mitglied',
                        description: 'Darul Ihsan Berlin arbeitet auf dem Weg Allahs und betreibt eine Moschee. Um seine Mission zu fördern, hat Darul Ihsan Berlin e.V. ein Programm zur Aufnahme von Spendern ins Leben gerufen. ' +
                            'Wir ermutigen alle, die die Sache des Glaubens unterstützen möchten, Mitglied zu werden. Möge Allah uns alle belohnen, InshaAllah.'
                    }
                }
            },
            en: {
                translation: {
                    DIB: 'Darul Ihsan Berlin e.V',
                    download: 'Download',
                    view_details: 'View Details',
                    AcName: 'Account Name',
                    AboutUs: {
                        title: 'About Us',
                        description: 'In 2011, five families in Berlin came together with a desire to gain a deeper understanding of Islam’s teachings and way of life, which led them to begin Quranic Tafsir sessions. ' +
                            'Over time, the need arose for an organization where families could study the Quran, Tafsir, and Seerah together, guiding their lives with the light of Islamic knowledge. ' +
                            'By then, the Darul Ihsan family had grown to 18 families. By the immense grace of Allah, in 2018, this dream became a reality with the establishment of Darul Ihsan Berlin (DIB) e.V.',
                        history_text: 'Years of History',
                        member_text: 'Members',
                        associate_member_text: 'Associate Members',
                        board_member_text: 'Board member',
                        board_member_sub_text: 'The talented people behind our success',
                        history_timeline: {
                            title: 'The journey of Darul Ihsan Berlin',
                            y_2025: {
                                title: 'Darul Ihsan Academy',
                                description: 'The official activities of Darul Ihsan Academy began on February 1, 2025 with Sheikh Mustafizur Rahman as the headmaster.'
                            },
                            y_2024:{
                                title: 'Darul Insan Vision',
                                description: 'In September 2024, "Darul Insan Vision" was formulated and associate members began to be accepted for it.'
                            },
                            y_2021:{
                                title: 'Mosque',
                                description: 'From April 2021, the mosque of "Darul Ihsan Berlin" opened at Brunnenstrasse 122, starting from the month of Ramadan.'
                            },
                            y_2018:{
                                title: 'Own dawah and educational programs',
                                description: 'Since 2018, "Darul Ihsan Berlin" has been trying to rent or purchase its own space to conduct its da\'wah and educational activities. In the same year, Sheikh Mustafizur Rahman was involved as a teacher, keeping in mind the plan to establish a mosque and madrasa in the future.'
                            },
                            y_2016:{
                                title: 'Association Registration',
                                description: 'In 2016, an association called "Darul Ihsan Berlin" began work on registering to institutionalize its Dawah activities.'
                            },
                            y_2015:{
                                title: 'Open Dawah activities begin',
                                description: 'In 2015, we began an open dawah program by renting a public meeting hall on Wien Strasse in Friedrichshain fortnightly to present the Quran to all people in an easy-to-understand manner.'
                            },
                            y_2011:{
                                title: 'The journey of Quran Sturdy Circle begins',
                                description: 'May 2011 - 5 families started their journey by hosting a Quran study circle in their drawing room every week.'
                            }
                        }
                    },
                    Membership: {
                        title: "Membership",
                        heading: 'Become an Associate Member',
                        description: 'Darul Ihsan Berlin is working in the path of Allah and managing a mosque. To further its mission, Darul Ihsan Berlin e.V. has launched a program to welcome donor members. ' +
                            'We encourage those who wish to support the cause of deen (faith) to join as members. May Allah reward us all, Insha’Allah.'
                    },
                    Home: {
                        title: 'Home',
                        heading: 'By Al-’Asr (the time). Verily, man is [deep] in loss, except for those who believe and do good deeds, urge one another to the truth and urge one another to patience.',
                        sub_heading: 'Al-Quran 103',
                        next_event: 'Upcoming Events',
                        mission_vision: 'Mission & Vision',
                        vision_heading: 'The vision of Darul Ihsan Berlin',
                        vision_sub_heading: 'To continue efforts to organize Muslims in Berlin, especially Bangladeshis, and build a social system that embodies the ideals and teachings of Islam.',
                        mission: {
                            title: 'Mission: (4-point activities)',
                            items:
                                {
                                    title_0: "Self-development",
                                    description_0: "To develop oneself as a responsible person of the religion through acquiring accurate knowledge of the Quran, Sunnah, and Seerah, acting in light of this, and self-development.",

                                    title_1: "Invitation",
                                    description_1: "To highlight the truth and beauty of Islam among all Muslims through the teachings of the Quran, the biography of the Prophet Muhammad (peace be upon him) and the Sunnah. " +
                                        "To this end, to organize regular Darsul Quran, Waz Mahfil, Islamic seminars and discussion meetings. To present the correct teachings of Islam to followers of other religions and try to remove misconceptions.",

                                    title_2: "Organisation ",
                                    description_2: "To institutionalize Islamic education by involving children, adolescents, and adults in Islamic education through madrasa activities, running Islamic libraries, and launching various courses.",

                                    title_3: "Responsibility for humanity",
                                    description_3: "Taking initiatives and volunteering in various social and humanitarian welfare activities."
                                }
                        },
                        Goal: {
                            title: 'Goal',
                            description: 'To establish a full-fledged Islamic Center to conduct all educational, da\'wah and social activities of Darul Ihsan, around which an Islamic society will be developed guided by the light of the Quran and Sunnah.' +
                                ' This center will include a full-fledged Madrasa, from where the seeds of producing scholars for the society from the next generation will be sown. ' +
                                'This center will be a center of social gathering in an Islamic environment for all Muslim families of the society.'
                        }
                    },
                    Vision: {
                        title: 'Vision',
                        heading: 'Support Our Mission',
                        description: 'Since the establishment of Darul Ihsan Berlin (DIB), we have dreamed of creating a healthy and progressive environmentfor Muslims residing in Berlin. ' +
                            'Although our current mosque, with an area of 140 square metres, accommodates 200 worshippersat a time, our needs and aspirations are much greater. ' +
                            'Darul Ihsan Berlin envisions establishing a larger Islamic centre wherewe can expand our activities and undertake new initiatives.'
                    },
                    Academy: {
                        nav_title: 'Academy',
                        page_title: 'Darul Ihsan Berlin Academy',
                        page_motto: 'Excellence Through Innovation',
                        established: 'Established 2024',
                        notice_board: 'Notice Board',
                        download: 'Download',
                        courses_section: 'Departments and teaching periods'
                    },
                    Donation: {
                        title: 'Donation',
                        heading: 'Support to build an islamic center',
                        sub_heading: 'Whoever builds a mosque for Allah, Allah will build for him a house like it in Paradise.',
                        sub_heading_1: 'Ṣaḥīḥ al-Bukhārī 450, Ṣaḥīḥ Muslim 533',
                        paypal_heading: 'PayPal Donation',
                        paypal_button_heading: 'Donate with PayPal',
                        paypal_heading_RRcode: 'PayPal QR Code',
                        paypal_heading_RRcode_ins: 'Scan to donate via PayPal',
                        bank_transfer_heading: 'Bank Transfer',
                        bank_name: 'Bank Name',
                        thank_msg: 'Thank you for your support! Your contribution helps us make a difference.'
                    },
                    Download: {
                        title: 'Download',
                        heading: 'Download Item(s)',
                        heading_files: 'Downloadable Files'
                    },
                    Footer: {
                        DescText: 'To foster Quranic education in a family-oriented environment and to implement Islamic teachings in social life.',
                        ContactUs: 'Contact US',
                        BankDetails: 'Bank Details',
                        QuickLinks: 'Quick Links',
                        CopyAll: 'Copy All'
                    },
                    MemberAnnouncement: {
                        heading: 'Become a patron of Darul Insan Vision.',
                        sub_heading: 'Join as an associate member',
                        description: 'Darul Ihsan Berlin works in the way of Allah and runs a mosque. To further its mission, Darul Ihsan Berlin e.V. has launched a program to welcome donor members. ' +
                            'We encourage those who want to support the cause of faith to join as members. May Allah reward us all, InshaAllah.'
                    }
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