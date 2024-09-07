import React, { useContext, useEffect, useRef, useState } from "react";

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

export function Input({name,label='',required=true,placeholder='',type="text"}){
    const settings = useContext(SettingsContext);

    return (
        <section className="input-wrapper">
            <label htmlFor={name}>{label}<span className="inp-indicator">{required?'*':(settings.lang==='en'?' (optional)':' (اختیاری)')}</span></label>
            {type=='textarea'?
                <textarea name={name} placeholder={placeholder} required={required} />:
                <input type={type} name={name} placeholder={placeholder} required={required} />
            }
        </section>
    );
}

export function Search({label, placeholder, onSearch, onChange=false}){
    const searchRef = useRef(null);

    const search = () => {
        onSearch(searchRef.current.value);
    };
    const onKey = (event) => {
        if(event.key==='Enter'){
            search();
        }
    };

    return (
        <aside className="search" onKeyUp={onKey}>
            <label htmlFor="search" className="hide">{label}</label>
            <input ref={searchRef} type="text" name="search" placeholder={placeholder} onInput={onChange?search:()=>{}} />
            <SolaButton action={search} icon="search" />
        </aside>
    );
}

export function BackToTop({lang}){
    const [show,setShow] = useState(false);
    
    const back2top = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const setVisible = () => {
        if(window.scrollY>window.innerHeight){
            setShow(true);
        } else {
            setShow(false);
        }
    };

    useEffect(()=>{
        window.addEventListener('scroll',setVisible);
    },[]);

    return (
        <button type="button" onClick={back2top} className={`sola-button ${show?'':'hide'} ${lang}`} id="back-to-top">
            <span className={`icon up`}></span>
        </button>
    );
}