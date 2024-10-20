import React, {Fragment, useState} from "react";

export default function RegistrationForm(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        try {
            let res = await fetch("/api/v1/attendees/", {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    'name': name,
                    'email': email,
                    'phone': mobile,
                }),
            });
            const resJson = await res.json();
            if (res.status === 201) {
                setName("");
                setEmail("");
                setMobile("")
                setMessage("User created successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Fragment>
            <h4 className="text-primary">{props.title}</h4>
            <p className="mb-4">{props.subtitle}</p>
            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                            <input type="text" className="form-control border-0" id="name" value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   placeholder="Your Full Name"/>
                            <label htmlFor="name">Your Name</label>
                        </div>
                    </div>
                    <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                            <input type="email" className="form-control border-0" id="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                   placeholder="Your Email"/>
                            <label htmlFor="email">Your Email</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="phone" className="form-control border-0" id="phone" value={mobile}
                                   onChange={(e) => setMobile(e.target.value)}
                                   placeholder="Phone"/>
                            <label htmlFor="phone">Your Phone</label>
                        </div>
                    </div>
                    <div className="col-12">
                        {message}
                        <button className="btn btn-primary w-100 py-3" type="submit">Register</button>
                    </div>
                </div>
            </form>
        </Fragment>
    )
};