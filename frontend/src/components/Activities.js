import React, {Fragment} from "react";

export default function Activities(){
    return(
        <Fragment>
            {/* Activities Start */}
            <div className="container-fluid service pb-5 py-5">
                <div className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: '800px'}}>
                        <h4 className="text-primary">Our Activities</h4>
                        <h1 className="display-5 mb-4">দারুল ইহসানের বর্তমান কার্যক্রম</h1>
                        <p className="mb-0">Darul Ihsan Berlin e.V.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="service-item">
                                <div className="service-img">
                                    <img width={600} height={400} src={'/static/assets/img/study_brother.png'} className="img-fluid rounded-top w-100" alt="DIB logo"/>
                                </div>
                                <div className="rounded-bottom p-4">
                                    <a href="#" className="h4 d-inline-block mb-4">For Brothers</a>
                                    <p className="mb-4">
                                        Every Friday 8:00 pm – 10:30 pm
                                    </p>
                                    <p className="mb-4 fw-bold">
                                        ভাইদের জন্য শিক্ষা কার্যক্রম:
                                    </p>
                                    <div className="d-flex flex-column">
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span>কোরআন তাজউয়ীদ শিক্ষা
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i>  </span>কোরআন তাফসীর
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span>সূরা মুখস্ত
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span>সীরাহ – হাদীছ
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span> আত্ম উন্নয়ণ
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span>সামাজিক কর্মকান্ড
                                        </li>
                                    </div>
                                    <br/>
                                    <a className="btn btn-primary rounded-pill py-2 px-4" href="#">Learn More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.4s">
                            <div className="service-item">
                                <div className="service-img">
                                    <img src={'/static/assets/img/study_sister.png'}
                                         className="img-fluid rounded-top w-100" alt="Image"/>
                                </div>
                                <div className="rounded-bottom p-4">
                                    <a href="#" className="h4 d-inline-block mb-4">For Sisters</a>
                                    <p className="mb-4">Every Sunday 9:00 am – 10:30 am</p>
                                    <p className="mb-4 fw-bold">
                                        বোনদের জন্য শিক্ষা কার্যক্রম:
                                    </p>
                                    <div className="d-flex flex-column">
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span>কোরআন তাজউয়ীদ শিক্ষা
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i>  </span>কোরআন তাফসীর
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span>সূরা মুখস্ত
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span>সীরাহ – হাদীছ
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span> আত্ম উন্নয়ণ
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span>সামাজিক কর্মকান্ড
                                        </li>
                                    </div>
                                    <br/>
                                    <a className="btn btn-primary rounded-pill py-2 px-4" href="#">Learn More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.6s">
                            <div className="service-item">
                                <div className="service-img">
                                    <img src={'/static/assets/img/study_children.png'} className="img-fluid rounded-top w-100"
                                         alt="Image"/>
                                </div>
                                <div className="rounded-bottom p-4">
                                    <a href="#" className="h4 d-inline-block mb-4">For Children</a>
                                    <p className="mb-4">Weekend (Teacher: Mustafijur Rahman) </p>
                                    <p className="mb-4 fw-bold">
                                        ছোটদের জন্য শিক্ষা কার্যক্রম:
                                    </p>
                                    <div className="d-flex flex-column">
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span>কোরআন
                                            তাজউয়ীদ শিক্ষা
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i>  </span>কোরআন তাফসীর
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span>সূরা মুখস্ত
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span>সীরাহ – হাদীছ
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span> আত্ম উন্নয়ণ
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span>রচনা লেখা
                                        </li>
                                        <li className="d-flex align-items-center py-1">
                                            <span className="me-3"><i
                                                className="fas text-primary fa-solid fa-check"></i> </span>কোরআন প্রতিযোগিতা
                                        </li>
                                    </div>
                                    <br/>
                                    <a class="btn btn-primary rounded-pill py-2 px-4" href="#">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Activities End */}
        </Fragment>
    );
};