import React from "react";
import DownloadItem from "./DownloadItem";
import {useTranslation} from "react-i18next";

const DownloadList = ({ items }) => {
    const {t} = useTranslation();
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{t('Download.heading_files')}</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {items.map((item, index) => (
          <DownloadItem
            key={index}
            name={item.filename}
            type='pdf'
            size={item.filesize}
            date={item.date}
            url={item.document}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No files available for download
        </div>
      )}
    </div>
  );
};

export default DownloadList;