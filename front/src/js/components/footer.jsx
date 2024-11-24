import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

import { SettingsContext } from "../utils/context";
import { footer } from "../utils/translations";

import '../../css/footer.sass';


function Footer({onChangeSettings}){
    const blog = /(\/blog\/?$)|(\/blog\/post\/\d+)/.test(useLocation().pathname);
    const resource = useLocation().pathname==='/resources';
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
                <a href="/api/insta" className="icon instagram" title={footer.mail[settings.lang]}></a>
                <a href="/api/mail" className="icon mail" title={footer.insta[settings.lang]}></a>
            </section>
            <section id="control">
                <button id="theme-switch" type="button" onClick={()=>onChangeSettings('theme')} aria-label={footer.themeSwitcher.label[settings.lang]} aria-valuetext={footer.themeSwitcher[settings.theme][settings.lang]}>
                    <span className={`icon ${settings.theme}`}></span>
                </button>
                {blog || resource?null:
                    <aside id="language-picker" aria-label="website's language, زبان سایت">
                        <button type="button" onClick={()=>setLangOpen(true)} aria-label="open menu, بازکردن منو">
                            <span>{settings.lang==='fa'?'فا':'en'}</span> <span id="arrow" className="icon down"></span>
                        </button>
                        <dialog open={langOpen}>
                            <p onClick={()=>changeLang('fa')} role="button">فا</p>
                            <p onClick={()=>changeLang('en')} role="button">en</p>
                        </dialog>
                    </aside>
                }
            </section>
        </footer>
    );
}

export default Footer;