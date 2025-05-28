import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const NewMemberAnnouncementBlock = () => {
    const { t } = useTranslation();
  return (
      <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-xl p-8 md:p-12 text-white mt-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('MemberAnnouncement.heading')}</h1>
          <p className="text-lg mb-2">
              {t('MemberAnnouncement.sub_heading')}:
          </p>
          <p className="text-lg mb-4 text-justify break-words">
              {t('MemberAnnouncement.description')}
          </p>
          <Link to={'/vision/'}
              className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all shadow-md">
              {t('view_details')}
          </Link>
      </div>
  );
};

export default NewMemberAnnouncementBlock;