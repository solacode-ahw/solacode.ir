import React, { useContext } from "react";

import { SettingsContext } from "../utils/context";

import '../../css/basic.sass';


export function SolaButton({action=null,url=null,icon='',label='',arrow=false}){
    const settings = useContext(SettingsContext);

    if(url){
        return (
            <a href={url} className={`sola-button ${label?'wide':'square'}`}>
                {icon?<span className={`icon ${icon} symbol`}></span>:null}
                {label?label:null}
                {arrow?<span className={`icon ${settings.lang==='fa'?'left':'right'} arrow`}></span>:null}
            </a>
        );
    } else if(action){
        return (
            <button type="button" onClick={action} className={`sola-button ${label?'wide':'square'}`}>
                {icon?<span className={`icon ${icon} symbol`}></span>:null}
                {label?label:null}
                {arrow?<span className={`icon ${settings.lang==='fa'?'left':'right'} arrow`}></span>:null}
            </button>
        );
    }
}