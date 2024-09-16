import React,{Fragment} from "react";

export default function ContactMap(){
    return(
        <Fragment>
            <div className="rounded h-100">
                <iframe className="rounded h-100 w-100"
                        style={{height: '400px'}}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2742.579579632027!2d13.3912745770041!3d52.540414272066585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a85189789b79db%3A0x6c3999b02d78ed28!2sDarul%20Ihsan%20Berlin%20(Mosque)!5e1!3m2!1sen!2sde!4v1726469346147!5m2!1sen!2sde"
                        allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </Fragment>
    );
};