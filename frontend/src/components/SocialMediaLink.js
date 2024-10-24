import React,{Fragment} from "react";

export default function SocialMediaLink(){
    return(
        <Fragment>
            <div className="d-flex align-items-center justify-content-center">
                <h2 className="text-white me-2">Follow Us:</h2>
                <div className="d-flex justify-content-end ms-2">
                    <a className="btn btn-md-square btn-light rounded-circle me-2" href="https://www.facebook.com/profile.php?id=100068090377582"><i
                        className="fab fa-facebook-f"></i></a>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </Fragment>
    );
};