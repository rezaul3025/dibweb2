import React, {useEffect, useState, Fragment} from "react";
import axiosInstance from "../axiosApi";
import parse from 'html-react-parser'
import * as events from "events";

function Notice() {
    const [notice, setNotice] = useState([]);
    const [user, setUser] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

    async function fetchData(user) {
        try {
            const response = await axiosInstance.get('/notice/?user_id=' + user.id)
            setNotice(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchDataByDates() {
        try {
            if(user && fromDate && toDate) {
                const response = await axiosInstance.get('/notice/?user_id=' + user.id + '&start_date=' + fromDate + '&end_date=' + toDate)
                setNotice(response.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user)
        fetchData(user);
    }, [])

    const  fromDateChange = function (event){
        setFromDate(event.target.value)
    }

     const  toDateChange = function (event){
        setToDate(event.target.value)
    }

    const messageAge = function (creation_date){
        let crDate = new Date(creation_date)
        let nowDate = new Date();
        let days = Math.round((nowDate.getTime() - crDate.getTime())/(1000 * 3600 * 24))
        let datestring = crDate.getDate()  + "-" + (crDate.getMonth()+1) + "-" + crDate.getFullYear() + " " +
crDate.getHours() + ":" + crDate.getMinutes();
        return  'Posted '+days+' days ago on '+datestring;
    }

    return (
        <Fragment>
            <div  className="row">
                <div className="col-md-12">
                    <div className="input-group">
                        <span className="input-group-text">From</span>
                        <input type="text" aria-label="from date" placeholder="yyyy-mm-dd" className="form-control" name="from_date" aria-describedby="fromDateHelp"
                        title="Please enter from date as dd-mm-yyyy" onChange={fromDateChange} />
                        <span className="input-group-text">To</span>
                        <input type="text" aria-label="To date" placeholder="yyyy-mm-dd" className="form-control" name="to_date" aria-describedby="toDateHelp"
                        title="Please enter to date as dd-mm-yyyy"  onChange={toDateChange}/>
                        <button className="btn btn-outline-success" type="button" onClick={fetchDataByDates}>Search</button>
                    </div>
                </div>
            </div>
            <br/>
            <div  className="row">
                <div className="col-md-12">
                    <span className="badge rounded-pill bg-success">TOTAL NOTICE : {notice.length}</span>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-md-12">
                     {notice && notice.length > 0 && notice.map((noticeObj, index) => (<div key={index} className="alert alert-success" role="alert">
                        <h4 className="alert-heading">{noticeObj.title}
                        </h4>
                         &nbsp;<small className="blockquote-footer"> {messageAge(noticeObj.creation_date)}</small>
                         <hr />
                        {parse(noticeObj.description)}
                    </div>))}
                </div>
            </div>
        </Fragment>
);
}

export default Notice;