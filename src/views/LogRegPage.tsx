import React from "react";
import {LogForm} from "../components/logreg/LogForm";

export const LogRegPage = () => {
    const refreshMath = () => {
        window.location.replace("http://localhost:3000");
    }
    return <LogForm refresh={refreshMath}/>
}