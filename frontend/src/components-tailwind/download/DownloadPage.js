import React, {useEffect, useState} from "react";
import StickyHeaderV2 from "../header/StickyHeaderV2";
import FooterV3 from "../FooterV3";
import DownloadList from "./DownloadList";

const DownloadPage = () => {
    const [downloadItems, setDownloadItems] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('/api/v1/download-items/');
              const data = await response.json();
              setDownloadItems(data);

          } catch (error) {
              console.error("Error fetching download data:", error);
          }
      };
      fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <StickyHeaderV2/>
            <main className="flex-grow">
                {/* Event details page section */}
                <section className="container mx-auto px-4 pt-4">
                    <h2 className="text-2xl font-bold text-green-500 mb-6 text-center">Download Item(s)</h2>
                    <div className="w-full max-w-2xl mx-auto py-10">
                        <DownloadList items={downloadItems}/>
                    </div>
                </section>
            </main>
            <FooterV3/>
        </div>
    )

}

export default DownloadPage;