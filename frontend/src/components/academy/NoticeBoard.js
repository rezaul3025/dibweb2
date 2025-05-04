import React, {Fragment, useEffect, useState} from "react";
import { Document, Page } from 'react-pdf';

export default function NoticeBoard() {
    const [noticeBoard, setNoticeBoard] = useState(null);

    useEffect(() => {
        const eventTemp = [];
        fetch('/api/v1/notice-board/')
            .then(response => response.json())
            .then(data => {
                setNoticeBoard(data)
            }).catch(error => {
            console.log(error);
        });

    }, []);

    return (
        <div className="container-fluid feature pb-5 py-5">
            <div id="donation" className="container pb-5">
                {noticeBoard !== null &&
                    <Fragment>
                    <div className="alert alert-success" role="alert">
                        {noticeBoard.text}
                    </div>

                     {noticeBoard.documents.map((document) => (
                         <Fragment>
                             <p>{document.description}</p>
                             <Document file={'/static/assets' + document.document} />
                             <img src={'/static/assets' + document.document} className="img-fluid" alt="..."/>
                         </Fragment>
                     ))}
                    </Fragment>
                }
            </div>
        </div>
    )
}