import React, { Fragment } from "react";

export default function TermsCondition() {
    return (
        <Fragment>
            <div className="container-fluid about py-5" style={{ overflow: 'hidden', padding: 0 }}>
                <div className="container">
                    <div className="row g-0 align-items-center"> {/* Use g-0 to remove gutters */}
                        <div className="col-xl-12 wow fadeInLeft" data-wow-delay="0.2s">
                            <div>
                                <h4 className="display-5 mb-4 text-primary py-4">Data Collection & Storage</h4>
                                <h4>We are Darul Ihsan Berlin e.V, a non-profit organisation in Germany. Our hosting provider GoDaddy Deutschland GmbH adheres to the EU/US “Privacy Shield,” ensuring that your data is securely stored and GDPR compliant.</h4>

                                <h4 className="display-5 mb-4 text-primary py-4">Registration Data</h4>
                                <h4>If you register on our website, we store your chosen username and your email address along with any additional personal information added to your user profile. You can see, edit, or delete your personal information at any time (except changing your username). Website administrators can also see and edit this information.</h4>

                                <h4 className="display-5 mb-4 text-primary py-4">Purchase Data</h4>
                                <h4>To receive service or support, you have to purchase service codes on our website. These codes will be stored together with support expiration dates and your user data, enabling us to provide downloads, support, and other services.</h4>

                                <h4 className="display-5 mb-4 text-primary py-4">Support Data</h4>
                                <h4>If you have registered on our website and have a valid account, you can request support assistance. Only data you explicitly provided is sent, and you are asked for consent each time you initiate a new support request.</h4>

                                <h4 className="display-5 mb-4 text-primary py-4">Contact Form</h4>
                                <h4>Information submitted through our contact form is sent to Darul Ihsan Berlin e.V. email, hosted by Google Gmail, which complies with the EU/US “Privacy Shield” policy. These submissions are retained solely for customer service purposes and are never used for marketing or shared with third parties.</h4>

                                <h4 className="display-5 mb-4 text-primary py-4">Cases for Using the Personal Data</h4>
                                <h4>We use your personal information in the following cases:</h4>
                                <ul>
                                    <li>Verification/identification during website usage</li>
                                    <li>Providing support assistance</li>
                                    <li>Sending updates on important changes</li>
                                    <li>Checking account activity to prevent fraud</li>
                                    <li>Customizing website experience</li>
                                    <li>Ensuring website performance and administrative functions</li>
                                </ul>

                                <h4 className="display-5 mb-4 text-primary py-4">Embedded Content</h4>
                                <h4>Pages on this site may include embedded content, like YouTube videos. Embedded content from other websites behaves the same way as if you visited the other site directly. These third-party sites may collect data, use cookies, and monitor your interaction with their content.</h4>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
