import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import { SettingsContext } from "../utils/context";


function Footer({onChangeSettings}){
    const blog = useLocation().pathname.includes('/blog');
    const settings = useContext(SettingsContext);

    if(blog){
        return (
            <footer>
                <p>this is blog footer</p>
            </footer>
        );
    } else {
        return (
            <footer>
                <p>this is default footer</p>
            </footer>
        );
    }
}

export default Footer;