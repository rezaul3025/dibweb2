import React, {Fragment} from "react";
import { useTranslation } from 'react-i18next';

export default function IdealsAndValues(){
    const { t } = useTranslation();
    return(
        <Fragment>
            {/* <div className="container-fluid position-relative p-0"> */}
                {/* <Navbar/> */}
                {/*<!-- Header Start -->*/}
                {/* <div className="container-fluid bg-breadcrumb">
                    <div className="container text-center py-5" style={{maxWidth: '900px'}}>
                        <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">About Us</h4>
                        <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active text-primary">About</li>
                        </ol>
                    </div>
                </div> */}
                {/*<!-- Header End -->*/}
            {/* </div> */}
                

            <div className="container-fluid feature pb-5 py-5">
                <div className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: '800px'}}>
                        <h4 className="text-primary"> {t('IdealsAndValues.text')}</h4>
                        <h1 className="display-5 mb-4">Add some text</h1>
                       
                    </div>
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="feature-item p-4">
                                <div className="p-4 mb-4">
                                    <h4 className="text-primary">  {t('IdealsAndValuesDecOneTitle.text')} </h4>
                                         <p className="mb-0"> {t('IdealsAndValuesDecOne.text')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="feature-item p-4">
                                <div className="p-4 mb-4">
                                    <h4 className="text-primary">  {t('IdealsAndValuesDecTwoTitle.text')} </h4>
                                         <p className="mb-0"> {t('IdealsAndValuesDecTwo.text')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="feature-item p-4">
                                <div className="p-4 mb-4">
                                    <h4 className="text-primary">  {t('IdealsAndValuesDecThreeTitle.text')} </h4>
                                         <p className="mb-0"> {t('IdealsAndValuesDecThree.text')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="feature-item p-4">
                                <div className="p-4 mb-4">
                                    <h4 className="text-primary">  {t('IdealsAndValuesDecFourTitle.text')} </h4>
                                         <p className="mb-0"> {t('IdealsAndValuesDecFour.text')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





        </Fragment>
);
};
