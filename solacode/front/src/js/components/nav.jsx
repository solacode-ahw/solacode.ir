import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import { SettingsContext } from "../utils/context";

import '../../css/nav.sass';

function Navigation({items}){
    const settings = useContext(SettingsContext);
    const path = useLocation().pathname;

    console.log(path);
    console.log(Object.keys(items[settings.lang]).map(k=>items[settings.lang][k]));

    return (
        <nav>
            {Object.keys(items[settings.lang]).map(key=>
                path===items[settings.lang][key]?null:<a href={items[settings.lang][key]} key={key}>{key}</a>
            )}
        </nav>
    );
}

export default Navigation;