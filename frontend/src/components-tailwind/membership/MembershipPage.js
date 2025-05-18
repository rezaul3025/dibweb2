import FooterV3 from "../FooterV3";
import StickyHeaderV2 from "../header/StickyHeaderV2";
import VisionImageGallery from "../vision/VisionImageGallery";
import React from "react";
import DownloadButton from "../DownloadButton";

const MembershipPage = () => {
    const handleDownload = () => {
        window.open('/static/assets/pdf/membership_form.pdf', '_blank');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <StickyHeaderV2/>
            <main className="flex-grow">
                {/* Event details page section */}
                <section className="container mx-auto px-4 pt-4">
                    <h2 className="text-2xl font-bold text-green-500 mb-6 text-center">Become an Associate</h2>
                    <p className="text-gray-500 mx-auto text-xl text-justify break-words p-2">
                        Darul Ihsan Berlin is working in the path of Allah and managing a mosque.
                        To further its mission, Darul Ihsan Berlin e.V. has launched a program to welcome donor members.
                        We encourage those who wish to support the cause of deen (faith) to join as members. May Allah reward us all, Insha’Allah.
                    </p>
                    <div className="relative aspect-video w-full max-w-6xl mx-auto">
                        <VisionImageGallery images={[
                            {
                                thumbnail: '/static/assets/img/membership/membership_v1.png',
                                fullSize: '/static/assets/img/membership/membership_v1.png',
                                alt: 'Vision 1'
                            }
                        ]}/>
                        <div className="text-gray-600 items-center max-w-2xl pb-4 mx-auto">
                             <DownloadButton
                            text="Download Form"
                            enabled
                            className="mt-4 mb-4"
                            onClick={handleDownload}/>

                        </div>
                    </div>

                </section>
            </main>
            <FooterV3/>
        </div>
    )
}

export default MembershipPage;