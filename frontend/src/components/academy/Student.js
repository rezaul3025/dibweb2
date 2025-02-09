import React, {Fragment, useEffect, useState} from "react";

export default function Student() {

    const [students, setStudents] = useState(null);
    const [loading, setLoading] = useState(false)
    const [groupData, setGroupData] = useState(null)
    const [selectedGroup, setSelectedGroup] = useState(null)

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
        'cl':{full_name:'Class', url:'/api/v1/classes/'},
        'sh':{full_name:'Shift', url:'/api/v1/shifts/'},
        'th':{full_name:'Teacher', url:'/api/v1/teachers/'}
    }

    const groupByHandler = (groupParam) =>{
        console.log(groupParam.target.value);
        fetch(groupBySearchParams[groupParam.target.value].url)
            .then(response => response.json())
            .then(data => {
                setSelectedGroup(groupBySearchParams[groupParam.target.value].full_name)
                setGroupData(data)
            }).catch(error => {
        });
    }

    return (
        <div className="container-fluid feature pb-5 py-5">
            <div id="donation" className="container pb-5">
                {students != null &&
                    <Fragment>
                        <div className="dropdown">
                            <select className="form-select" aria-label="Default select example" onChange={e => groupByHandler(e)}>
                                <option selected>Group By</option>
                                <option value="cl"  onChange={e => groupByHandler(e)} >Class</option>
                                <option value="th"  onChange={e=> groupByHandler(e)}>Teacher</option>
                                <option value="sh" onChange={e=> groupByHandler(e)} >Shift</option>
                            </select>
                        </div>

                        {groupData != null && <div className="dropdown">
                            <select className="form-select"  defaultValue={'Select '+selectedGroup}>
                                <option  selected={selectedGroup != null} value={'Select '+selectedGroup}>{'Select '+selectedGroup}</option>
                                    {groupData.map((group) => (
                                        <option key={group.id} value={group.name}>{group.name}</option>))}
                            </select>
                        </div>}

                        <table className="table table-borderless">
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Class</th>
                                <th>Siblings?</th>
                            </tr>
                            </thead>
                            <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.first_name}</td>
                                    <td>{student.last_name}</td>
                                    <td>{student.classes[0].name}</td>
                                    <td>{student.siblings ? '' : 'X'}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Fragment>}
            </div>
        </div>
    )
};