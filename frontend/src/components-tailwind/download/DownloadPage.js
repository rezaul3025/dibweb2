import React, {useEffect, useState} from "react";
import DownloadList from "./DownloadList";
import {useTranslation} from "react-i18next";
import StickyHeaderV3 from "../header/StickyHeaderV3";
import FooterV3 from "../FooterV3";

const DownloadPage = () => {
    const [downloadItems, setDownloadItems] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('/api/v1/download-items/DI/');
              const data = await response.json();
              setDownloadItems(data);

          } catch (error) {
              console.error("Error fetching download data:", error);
          }
      };
      fetchData();
    }, []);

    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex flex-col">
            <StickyHeaderV3/>
            <main className="flex-grow pt-20">
                <section className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-green-500 mb-6 text-center">{t('Download.heading')}</h2>
                    <div className="w-full max-w-2xl mx-auto py-10">
                        <DownloadList items={downloadItems}/>
                    </div>
                </section>
            </main>
            <FooterV3 />
        </div>

    )

}

export default DownloadPage;