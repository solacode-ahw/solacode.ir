import React, { useState, useRef } from "react";
import Cookies from "js-cookie";

import { Input, SolaButton } from "./basic";

import '../../css/subscribe.sass';


function FrequencyOption({label,select,onClick}){
    return (
        <section className="option">
            <p className={`icon ${select?'checkbox':'box'}`} onClick={onClick}></p>
            <p>{label}</p>
        </section>
    );
}

function Subscribe({close}){
    const msgRef = useRef(null);
    const formRef = useRef(null);
    const [msg,setMsg] = useState('');
    const [freq,setFreq] = useState('w');

    const select = (flag) => {
        setFreq(flag);
    };
    const subscribe = () => {
        const form = new FormData(formRef.current);
        form.append("frequency",freq);
        fetch('/api/db/subscribe/',{
            method: 'POST',
            body: form,
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            mode: 'same-origin',
        }).then((response) => {
            if(response.ok){
                setMsg('ثبت‌نام در خبرنامه موفق‌آمیز بود!');
                msgRef.current.showModal();
                Object.values(document.getElementsByTagName('input')).forEach(inp=>{
                    inp.value='';
                });
                setFreq('w');
            } else {
                throw new Error(`Error: ${response.status}`);
            }
            }).catch((error) => {
                console.log(error);
                setMsg('مشکلی رخ داده‌است. دوباره تلاش کنید.');
                msgRef.current.showModal();
            });
    };
    const closeMsg = () => {
        msgRef.current.close();
        close();
    };

    return (
        <>
            <form ref={formRef} id="subscribe-form">
                <p className="back-whole" onClick={close}><span className="icon down back"></span>برگشت</p>
                <p id="form-header">برای دریافت مقالات جدید در ایمیل خود، برای خبرنامه ثبت‌نام کنید</p>
                <Input name="email" label="ایمیل" type="email" />
                <section id="frequency">
                    <p>با چه تناوب زمانی‌ای می‌خواهید مقالات جدید را دریافت کنید؟</p>
                    <FrequencyOption label="به محض انتشار(هفته‌ای دوبار)" select={freq==='a'} onClick={()=>select('a')} />
                    <FrequencyOption label="هفتگی" select={freq==='w'} onClick={()=>select('w')} />
                    <FrequencyOption label="ماهانه" select={freq==='m'} onClick={()=>select('m')} />
                </section>
                <SolaButton label="تکمیل ثبت‌نام خبرنامه" action={subscribe} />
            </form>
            <dialog ref={msgRef}>
                <p>{msg}</p>
                <SolaButton action={closeMsg} label="باشه" />
            </dialog>
        </>
    );
}

export default Subscribe;