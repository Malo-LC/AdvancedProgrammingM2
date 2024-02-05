import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import userService from "../../services/userService.js";
import api from "../../utils/api.js";

//style
import "./internship.css";
import {useMediaQuery} from "react-responsive";
import InternshipElement from "../../components/InternshipElement/InternshipElement.jsx";

function Internship() {

    const controls = useAnimation();
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const userRole = userService.getUserInfo();
    const [requests, setRequests] = useState([]);
    //let internshipColumn= ["Intitulé du stage", "Date du début", "Date de fin", "Société", "Action", "Status"];

    useEffect(() => {
        controls.start({ y: 0 });
        api.get("studentInternship/all").then((res) => {
            setRequests(res);
        });
    }, []);

    return (
        <div className={`stages ${isMobile ? "items-start" : "items-center justify-center"}`}>
            <motion.div
                className={`stages-header ${isMobile ? "flex-col" : "flex-row"}`}
                initial={{ x: "-300%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
            >
                <p className="stages-title">Mon stage</p>
            </motion.div>
            <div className="table">
                <InternshipElement userRole={userRole} data={requests} />
            </div>
        </div>
    )
}

export default Internship;
