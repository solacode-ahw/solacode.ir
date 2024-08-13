import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

import { SettingsContext } from "../utils/context";
import { footer } from "../utils/translations";

import '../../css/footer.sass';


function Footer({onChangeSettings}){
    const blog = useLocation().pathname.includes('/blog');
    const settings = useContext(SettingsContext);

    const [langOpen,setLangOpen] = useState(false);

    const changeLang = (lang) => {
        if(lang!==settings.lang){
            onChangeSettings(lang);
        }
        setLangOpen(false);
    };

    return (
        <footer>
            <section id="information">
                <p>{footer[settings.lang].font[0]} <a href="https://fontiran.com/fonts/borna/?ref=868">{footer[settings.lang].font[1]}</a></p>
                <p>{footer[settings.lang].icon[0]} <a href="https://github.com/480-Design/Solar-Icon-Set">{footer[settings.lang].icon[1]}</a></p>
            </section>
            <section id="contact">
                <a href="/api/insta" className="icon instagram"></a>
                <a href="/api/mail" className="icon mail"></a>
            </section>
            <section id="control">
                <button id="theme-switch" type="button" onClick={()=>onChangeSettings('theme')}>
                    <span className={`icon ${settings.theme}`}></span>
                </button>
                {blog?null:
                    <aside id="language-picker">
                        <button type="button" onClick={()=>setLangOpen(true)}>
                            <span>{settings.lang==='fa'?'فا':'en'}</span> <span id="arrow" className="icon down"></span>
                        </button>
                        <dialog open={langOpen}>
                            <p onClick={()=>changeLang('fa')}>فا</p>
                            <p onClick={()=>changeLang('en')}>en</p>
                        </dialog>
                    </aside>
                }
            </section>
        </footer>
    );
}

export default Footer;