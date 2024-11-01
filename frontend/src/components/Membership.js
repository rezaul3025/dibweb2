import React, { Fragment } from "react";
import { useTranslation } from 'react-i18next';

export default function Membership() {
    const { t } = useTranslation();

    return (
        <Fragment>
            <div className="container-fluid team pb-5">
                <div className="container pb-5">
                    <div 
                        className="text-center mx-auto pb-5 wow fadeInUp" 
                        data-wow-delay="0.2s" 
                        style={{ 
                            maxWidth: '800px', 
                            visibility: 'visible', 
                            animationDelay: '0.2s', 
                            animationName: 'fadeInUp' 
                        }}
                    >
                        <h4 
                            className="text-primary" 
                            style={{ 
                                marginTop: '20px', 
                                color: 'black' // Default color
                            }} 
                            onMouseEnter={(e) => e.currentTarget.style.color = 'white'} 
                            onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                        >
                            {t('AssociateMember.text')}
                        </h4>
                        <h5 className="mb-0">{t('MembershipDec.text')}</h5>
                    </div>

                    <div className="row g-4 justify-content-center"> 
                        <div 
                            className="col-md-12 col-lg-12 col-xl-8 wow fadeInUp"
                            data-wow-delay="0.2s" 
                            style={{ 
                                visibility: 'visible', 
                                animationDelay: '0.2s', 
                                animationName: 'fadeInUp' 
                            }}
                        >
                            <div className="team-item">
                                {/* Membership Rules */}
                                <div className="team-title">
                                    <h3>
                                        {/* <i className="fas fa-check-circle me-2"></i> */}
                                        {t('MembershipRules.text')}
                                    </h3>
                                    <ul className="mb-0" style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                                        <li>
                                            <i className="fas fa-check-circle me-2"></i>
                                            {t('MembershipRuleOne.text')}
                                        </li>
                                        <li>
                                            <i className="fas fa-check-circle me-2"></i>
                                            {t('MembershipRuleTwo.text')}
                                        </li>
                                        <li>
                                            <i className="fas fa-check-circle me-2"></i>
                                            {t('MembershipRuleThree.text')}
                                        </li>
                                        <li>
                                            <i className="fas fa-check-circle me-2"></i>
                                            {t('MembershipRuleFour.text')}
                                        </li>
                                        <li>
                                            <i className="fas fa-check-circle me-2"></i>
                                            {t('MembershipRuleFive.text')}
                                        </li>
                                        <li>
                                            <i className="fas fa-check-circle me-2"></i>
                                            {t('MembershipRuleSix.text')}
                                        </li>
                                    </ul>
                                </div>

                                {/* Membership Cancel */}
                                <div className="team-title">
                                    <h3>
                                        {/* <i className="fas fa-check-circle me-2"></i> */}
                                        {t('MembershipCancel.text')}
                                    </h3>
                                    <ul className="mb-0" style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                                        <li>
                                            <i className="fas fa-regular fa-circle-xmark me-2"></i>
                                            {t('MembershipCancelOne.text')}
                                        </li>

                                        <li>
                                            <i className="fas fa-regular fa-circle-xmark me-2"></i>
                                            {t('MembershipCancelTwo.text')}
                                        </li>
                                    </ul>
                                </div>

                                {/* Membership Benefit */}
                                <div className="team-title">
                                    <h3>
                                        {/* <i className="fas fa-check-circle me-2"></i> */}
                                        {t('MembershipBenefit.text')}
                                    </h3>
                                    <ul className="mb-0" style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                                        <li>
                                            <i className="fas fa-regular fa-handshake me-2"></i>
                                            {t('MembershipBenefitOne.text')}
                                        </li>


                                        <li>
                                            <i className="fas fa-regular fa-handshake me-2"></i>
                                            {t('MembershipBenefitTwo.text')}
                                        </li>
                                        <li>
                                            <i className="fas fa-regular fa-handshake me-2"></i>
                                            {t('MembershipBenefitThree.text')}
                                        </li>
                                        <li>
                                            <i className="fas fa-regular fa-handshake me-2"></i>
                                            {t('MembershipBenefitFour.text')}
                                        </li>
                                        <li>
                                            <i className="fas fa-regular fa-handshake me-2"></i>
                                            {t('MembershipBenefitFive.text')}
                                        </li>
                                    </ul>
                                </div>

                                <div className="team-icon">
                                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="tel:+49 176 5779 1221" title="Call us">
                                        <i className="fas fa-phone-alt"></i>
                                    </a>
                                    <a className="btn btn-primary btn-sm-square rounded-circle me-0" href="mailto:info@daurlihsan-berlin.de" title="Email us">
                                        <i className="fas fa-envelope"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
