import React, {Fragment} from "react";

function Spinner(props){
    return(
            <Fragment>
                <img src="/static/assets/img/logo.gif"
                    style={{width:props.width, height: props.height}}
                />
            </Fragment>
    );
}

export default Spinner;