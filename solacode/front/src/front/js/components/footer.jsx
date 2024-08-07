import React from "react";
import { useLocation } from "react-router-dom";


function Footer({onChangeSettings}){
    const blog = useLocation().pathname.includes('/blog');

    if(blog){
        return (
            <>
                <p>this is blog footer</p>
            </>
        );
    } else {
        return (
            <>
                <p>this is default footer</p>
            </>
        );
    }
}

export default Footer;