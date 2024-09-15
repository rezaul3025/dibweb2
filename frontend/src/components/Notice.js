import React, {useEffect, useState, Fragment} from "react";
import axiosInstance from "../axiosApi";
import parse from 'html-react-parser'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";


import {
    useParams
} from "react-router-dom";


function Notice() {
    let {email} = useParams();
    const [notice, setNotice] = useState([]);
    const [user, setUser] = useState();
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState();

    async function fetchData(user) {
        try {
            const response = await axiosInstance.get('/notice/?user_id=' + user.id)
            checkResponse(response);
            setNotice(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchDataByDates() {
        try {
            if (user && fromDate && toDate) {
                const response = await axiosInstance.get('/notice/?user_id=' + user.id + '&start_date=' + fromDate + '&end_date=' + toDate)
                checkResponse(response);
                setNotice(response.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const checkResponse = function (response) {
        if (response.status === 401) {
            window.location.href = '/login/';
        }
    }

    useEffect(() => {
        const localUser = localStorage.getItem('user')
        if (isValidLocalUser(localUser)) {
            const user = JSON.parse(localUser);
            setUser(user)
            fetchData(user);
        } else {
            window.location.href = '/login/';
        }
    }, [])

    const fromDateChange = function (event) {
        //alert(event._d)
        setFromDate(event.format('YYYY-MM-DD'))
    }

    const toDateChange = function (event) {
        setToDate(event.format('YYYY-MM-DD'))
    }

    const messageAge = function (creation_date) {
        let crDate = new Date(creation_date)
        let nowDate = new Date();
        let days = Math.round((nowDate.getTime() - crDate.getTime()) / (1000 * 3600 * 24))
        let datestring = crDate.getDate() + "-" + (crDate.getMonth() + 1) + "-" + crDate.getFullYear() + " " +
            crDate.getHours() + ":" + crDate.getMinutes();
        return 'Posted ' + days + ' days ago on ' + datestring;
    }

    const isValidLocalUser = function (localUser) {
        if (localUser == null) {
            return false;
        } else if (localUser === 'undefined') {
            return false;
        } else return localUser.indexOf("object") === -1;
    }

    // Let's use the static moment reference in the Datetime component
    let yesterday = Datetime.moment().subtract(1, 'day');
    let valid = function (current) {
        return current.isAfter(yesterday);
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-12">
                    <form className="row g-3">
                        <div className="col-auto">
                            <label htmlFor="fromDate" className="visually-hidden">From</label>
                            <Datetime inputProps={{
                                placeholder: 'From(YYYY-MM-DD)',
                                'aria-label': 'From date',
                                className: 'form-control',
                                name: 'from_date',
                                id: 'fromDate',
                                title: 'Please enter from date as YYYY-MM-DD'
                            }} dateFormat="YYYY-MM-DD" timeFormat={false} onChange={fromDateChange}
                                      closeOnSelect={true}/>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="toDate" className="visually-hidden">To</label>
                            <Datetime inputProps={{
                                placeholder: 'To(YYYY-MM-DD)',
                                'aria-label': 'To date',
                                className: 'form-control',
                                name: 'to_date',
                                id: 'toDate',
                                title: 'Please enter to date as YYYY-MM-DD'
                            }} dateFormat="YYYY-MM-DD" timeFormat={false} onChange={toDateChange} closeOnSelect={true}/>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-outline-success" type="button"
                                    onClick={fetchDataByDates}>Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-md-12">
                    <span className="badge rounded-pill bg-success">TOTAL NOTICE : {notice.length}</span>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-md-12">
                    {notice && notice.length > 0 && notice.map((noticeObj, index) => (
                        <div className="card mb-3" key={index}>
                            <div className="card-body">
                                <div className="alert alert-success" role="alert">
                                    <h4 className="alert-heading">{noticeObj.title}
                                    </h4>
                                    &nbsp;<small
                                    className="blockquote-footer"> {messageAge(noticeObj.creation_date)}</small>
                                </div>
                                {parse(noticeObj.description)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}

export default Notice;