import React, {Fragment} from "react";
import { useTranslation } from 'react-i18next';

export default function About(){
    const { t } = useTranslation();
    return(
      <Fragment>
          {/* Abvout Start */}
            <div className="container-fluid about">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-xl-7 wow fadeInLeft" data-wow-delay="0.2s">
                            <div>
                                <h4 className="text-primary">{t('AboutUs.text')}</h4>
                                <h1 className="display-5 mb-4">{t('OurHistory.text')}</h1>
                                <p className="mb-4">{t('CreationOfOurGroup.text')}</p>
                                <div className="row g-4">
                                    <div className="col-md-12 col-lg-12 col-xl-12">
                                        <div className="d-flex">
                                            <div><i className="fas fa-lightbulb fa-3x text-primary"></i></div>
                                            <div className="ms-4">
                                                <p>{t('OurHistoryDec.text')}</p>
                                                <p>
                                                    দারুল ইহসান বার্লিন এর পথচলার শুরুটা হয়েছিল বার্লিন এ বসবাসকারী ৫টি পরিবারের একটি সুদূরপ্রসারী স্বপ্নের কারণে, আল্লাহর কালাম কে শুদ্ধভাবে পড়া ও বুঝা এবং নিজেদের জীবনে তার বাস্তবায়নের একটি প্রয়াসের চেষ্টার ফল আজকের DIB. বার্লিন তথা জার্মানির বাংলাদেশী মুসলিমদের জন্যে এবং তাদের সহযোগিতায় একটি শক্তিশালী মুসলিম কমিউনিটি গড়ার স্বপ্ন দেখে এই প্রতিষ্ঠানটি.
                                                </p>
                                                <p>
                                                     সকল শ্রেণী পেশা ও বয়সের মানুষরা আল কুরআন শিখবে এবং তা থেকে জীবন চলার পাথেয় পাবে এই কামনায় দারুল ইহসান বার্লিন এর পথচলা.
                                                </p>
                                                <p>
                                                    শুরুটা পাঁচটা পরিবারের মাধ্যমে হলেও বর্তমানে এই প্রতিষ্ঠানের স্থায়ী সদস্য ১৫টি পরিবার. প্রথমত  ছোট পরিসরে আল কুরআন হতে পাঠ নেয়া হলেও বর্তমানে ভাই এবং বোনদের জন্যে দুইটি আলাদা পাঠচক্রের ব্যবস্থা  আছে. এছাড়া মাসে প্রায় দুইটি করে উন্মুক্ত কুরআন পাঠ ও পর্যালোচনার সুযোগ করে দেয় দারুল ইহসান বার্লিন. বার্লিন বসবাসকারী শিশু কিশোরদের মধ্যে কুরআন ও হাদিস এর শিক্ষা ছড়িয়ে দেয়ার প্রয়াসে DIB অন্যতম ভূমিকা পালন করছে.
                                                </p>
                                                <p>
                                                    পারিবারিক আবহে কুরআন শিক্ষা এবং সামাজিক মিথস্ক্রিয়ার মাধ্যমে ব্যক্তিগত ও সামাজিক জীবনে কুরআনের বাস্তবায়ন – এটাই হলো মূলত দারুল ইহসান বার্লিন এর মূল চালিকা শক্তি. ভবিষ্যতে বার্লিন এ একটি মননশীল ও শক্তিশালী  বাংলাদেশী মুসলিম কমুনিটির স্বপ্ন দেখে এই প্রতিষ্ঠান.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 wow fadeInRight" data-wow-delay="0.2s">
                            <div className="bg-primary rounded position-relative overflow-hidden">
                                <img src={'/static/assets/img/dib-logo-new.png'} className="img-fluid rounded w-100" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* About End */}
      </Fragment>
    );
}