import React, {Fragment} from "react";
import { useTranslation } from 'react-i18next';

export default function GoalsAndObjective(){
    const { t } = useTranslation();
    return(
        <Fragment>

            {/* <div className="container-fluid position-relative p-0"> */}
                {/* <Navbar/> */}
                {/*<!-- Header Start -->*/}
                {/* <div className="container-fluid bg-breadcrumb">
                    <div className="container text-center py-5" style={{maxWidth: '900px'}}>
                        <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">About Us</h4>
                        <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active text-primary">About</li>
                        </ol>
                    </div>
                </div> */}
                {/*<!-- Header End -->*/}
            {/* </div> */}
            
   
                <h1>
                {t('GoalsAndObjectives.text')}
                </h1>
                <p>
                {t('GoalsAndObjectivesDec.text')}
                </p>


        
        
        </Fragment>
);
};