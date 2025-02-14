import React, {Fragment, useEffect, useState} from "react";

export default function Student() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false)
    const [groupData, setGroupData] = useState(null)
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [searchParam, setSearchParam] = useState("")

    useEffect(() => {
        setLoading(true);
        const eventTemp = [];
        fetch('/api/v1/students/')
            .then(response => response.json())
            .then(data => {
                setStudents(data)
                setLoading(false);
            }).catch(error => {
            setLoading(false);
        });

    }, []);

    const groupBySearchParams = {
        'cl':{full_name:'Class', short_name:'cl', url:'/api/v1/classes/', student_filter_url:'/api/v1/students/classes/'},
        'sh':{full_name:'Shift',  short_name:'sh', url:'/api/v1/shifts/', student_filter_url:'/api/v1/students/shifts/'},
        'th':{full_name:'Teacher',  short_name:'th', url:'/api/v1/teachers/',  student_filter_url:'/api/v1/students/teacher/'}
    }

    const groupByHandler = (groupParam) =>{
        const selectedGroupParam = groupParam.target.value;
        console.log(selectedGroupParam);
        setStudents([]);
        fetch(groupBySearchParams[selectedGroupParam].url)
            .then(response => response.json())
            .then(data => {
                setSelectedGroup(groupBySearchParams[selectedGroupParam].full_name)
                setGroupData(data)
                let groupData = [];
                let groupDataLine0 = {'id':-1,'name':'Select Class','selected': true};
                if(selectedGroupParam === 'sh'){
                     groupDataLine0['name'] = 'Select Shift';
                }else if(selectedGroupParam === 'th'){
                    groupDataLine0['name'] = 'Select Teacher';
                }

                groupData.push(groupDataLine0);

                data.map(group => {
                    let groupDataLine = {'id':group.id, 'name':group.name, 'student_filter_url':groupBySearchParams[selectedGroupParam].student_filter_url+group.id+'/'};
                    groupData.push(groupDataLine);
                })
                setGroupData(groupData);

            }).catch(error => {
        });
    }

    const handleSelectedGroup = (event) => {
        console.log(event.target.value);
         fetch(event.target.value)
            .then(response => response.json())
            .then(data => {
                setStudents(data);
                setLoading(false);
            }).catch(error => {
            setLoading(false);
        });
    }

    const handleSearchByName = (event) => {
        setSearchParam(event.target.value);
        fetch('/api/v1/students/search/' + event.target.value + '/')
            .then(response => response.json())
            .then(data => {
                setStudents(data);
                setLoading(false);
            }).catch(error => {
            setLoading(false);
        });
    }


    return (
        <div className="container-fluid feature pb-5 py-5">
            <div id="donation" className="container pb-5">
                {students != null &&
                    <Fragment>
                        <div className="row">
                            <div className="col">
                                <div className="dropdown">
                                    <select className="form-select form-select-sm mb-3"
                                            aria-label="Default select example"
                                            onChange={e => groupByHandler(e)}>
                                        <option selected>Group By</option>
                                        <option value="cl" onChange={e => groupByHandler(e)}>Class</option>
                                        <option value="th" onChange={e => groupByHandler(e)}>Teacher</option>
                                        <option value="sh" onChange={e => groupByHandler(e)}>Shift</option>
                                    </select>
                                </div>

                                {groupData != null && <div className="dropdown">
                                    <select className="form-select form-select-sm mb-3"
                                            onChange={e => handleSelectedGroup(e)}>
                                        {groupData.map((group) => (
                                            <option selected={group.selected} key={group.id}
                                                    value={group.student_filter_url}
                                                    onChange={e => handleSelectedGroup(e)}>{group.name}</option>
                                        ))}
                                    </select>
                                </div>
                                }
                                {groupData == null && <span className="badge bg-primary p-2 mb-1">Total {students.length}</span>}
                            </div>
                            <div className="col">
                                <input className="form-control form-control-sm mb-3" type="text"
                                       placeholder="Search by Name"
                                       value={searchParam}
                                       onChange={event => handleSearchByName(event)}
                                       aria-label=".form-control-lg search"/>
                                {groupData != null && <span className="badge bg-primary p-2 mb-1">Total {students.length}</span>}
                            </div>
                        </div>

                        <table className="table table-borderless">
                            <thead>
                            <tr className='bg-primary'>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Class</th>
                                <th>Siblings?</th>
                            </tr>
                            </thead>
                            <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className='bg-light'>
                                    <td>{student.first_name}</td>
                                    <td>{student.last_name}</td>
                                    <td>{student.classes[0].name}</td>
                                    <td>{!student.siblings ? '' : 'X'}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </Fragment>
                }
            </div>
        </div>
    )
};