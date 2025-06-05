import React, {useState} from "react"
import LoginPopup from "./LoginPopup";
import AcademyAdminDashboardV3 from "./AcademyAdminDashboardV3";

const AcademyAdminPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLogin"));

    const handleLoginSubmit = async (data) => {
       // console.log(data.username, data.password);

        const response = await fetch('/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value,
            },
            body: JSON.stringify({username: data.username,password: data.password})
        });

        const resData = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (resData.key) {
            localStorage.setItem('authToken', resData.key);
            setIsLoggedIn(true);
            localStorage.setItem("isLogin", true);
            location.reload(true);
        }
    };

    if (isLoggedIn === "true") return <AcademyAdminDashboardV3/>

    return <LoginPopup handleSubmit={handleLoginSubmit}/>
}

export default AcademyAdminPage;