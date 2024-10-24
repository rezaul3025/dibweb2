import React, {Fragment} from "react";

function Spinner(){
    return(
            <Fragment>
                <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                    <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
                        <span className="sr-only">Loading...</span>
                        <img src="frontend/static/assets/img/logo.gif"
                            alt="Loading..."
                            style={{width: '5rem', height: '5rem'}}
                        />
                    </div>
                </div>
            </Fragment>
    );
}

export default Spinner;