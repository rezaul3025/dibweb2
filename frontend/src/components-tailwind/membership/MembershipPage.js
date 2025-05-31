import VisionImageGallery from "../vision/VisionImageGallery";
import React from "react";
import DownloadButton from "../DownloadButton";
import {useTranslation} from "react-i18next";
import StickyHeaderV3 from "../header/StickyHeaderV3";
import FooterV3 from "../FooterV3";

const MembershipPage = () => {
    const handleDownload = () => {
        window.open('/static/assets/pdf/membership_form.pdf', '_blank');
    };

    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex flex-col">
            <StickyHeaderV3/>
            <main className="flex-grow pt-20">
                <section className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-green-500 mb-6 text-center">{t('Membership.heading')}</h2>
                    <p className="text-gray-500 mx-auto text-justify break-words p-2">
                        {t('Membership.description')}
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
                                text={t('Membership.download_form')}
                                enabled
                                className="mt-4 mb-4"
                                onClick={handleDownload}/>

                        </div>
                    </div>
                </section>
            </main>
            <FooterV3 />
        </div>
    )
}

export default MembershipPage;