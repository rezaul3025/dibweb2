import React from 'react'
import { useTranslation } from 'react-i18next';

export const PrayerTime = () => {
    const { t } = useTranslation();
    const embedUrl = "https://mawaqit.net/en/m/darul-ihsan-berlin?showNotification=0&showSearchButton=0&showFooter=0&showFlashMessage=0&view=mobile";
    const wrapperStyle = {
        position: 'relative',
        paddingBottom: '30,25%',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    }

    const iframeStyle = {
        width: '360px',
        height: '570px',
        frameborder: '0',
        scrolling: 'no'
    }

    return(
        <div>
            <iframe
                style={iframeStyle}
                src={embedUrl}
                allowFullScreen={true}
                className="iframe mobile"
                title="Darul ihsan prayer time"
            >
            </iframe>
            <br/>
        </div>
    );

};