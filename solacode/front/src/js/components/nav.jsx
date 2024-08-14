import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import { SettingsContext } from "../utils/context";
import { navLinkTitles } from "../utils/translations";

import '../../css/nav.sass';

function Navigation({items}){
    const settings = useContext(SettingsContext);
    const path = useLocation().pathname;

    return (
        <nav>
            {Object.keys(items[settings.lang]).map(key=>
                path===items[settings.lang][key]?null:<a href={items[settings.lang][key]} key={key} title={`${navLinkTitles[settings.lang]} ${key}`}>{key}</a>
            )}
        </nav>
    );
}

export default Navigation;