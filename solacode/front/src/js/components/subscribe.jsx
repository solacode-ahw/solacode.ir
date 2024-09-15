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

function Subscribe({close,edit=false,onEdit,subscription}){
    const msgRef = useRef(null);
    const formRef = useRef(null);
    const [msg,setMsg] = useState('');
    const [freq,setFreq] = useState(edit?subscription.frequency:'w');
    const [active,setActive] = useState(true);

    const select = (flag) => {
        setFreq(flag);
    };
    const subscribe = () => {
        const form = new FormData(formRef.current);
        form.append("frequency",freq);
        setActive(false);
        fetch('/api/db/subscription/',{
            method: 'POST',
            body: form,
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            mode: 'same-origin',
        }).then((response) => {
            if(response.ok){
                console.log(response);
                setMsg('لینک تایید ایمیل ارسال شد. لطفا برای تکمیل ثبت‌نام، ایمیل خود را چک کنید!');
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
    const editSubscription = () => {
        onEdit(freq);
    };

    return (
        <>
            <form ref={formRef} id="subscribe-form">
                {edit?
                    <>
                        <p id="form-header">از اینجا می‌توانید اشتراک خود را ویرایش کنید:</p>
                        <Input name="email" label="ایمیل" type="email" value={subscription.email} disabled />
                    </>:
                    <>
                        <p className="back-whole" onClick={close}><span className="icon back"></span>برگشت</p>
                        <p id="form-header">برای دریافت مقالات جدید در ایمیل خود، برای خبرنامه ثبت‌نام کنید</p>
                        <Input name="email" label="ایمیل" type="email" />
                    </>
                }
                <section id="frequency">
                    <p>با چه تناوب زمانی‌ای می‌خواهید مقالات جدید را دریافت کنید؟</p>
                    <FrequencyOption label="به محض انتشار(هفته‌ای دوبار)" select={freq==='a'} onClick={()=>select('a')} />
                    <FrequencyOption label="هفتگی" select={freq==='w'} onClick={()=>select('w')} />
                    <FrequencyOption label="ماهانه" select={freq==='m'} onClick={()=>select('m')} />
                </section>
                <SolaButton label="تکمیل ثبت‌نام خبرنامه" action={edit?editSubscription:subscribe} active={active} />
            </form>
            {edit?null:
                <dialog ref={msgRef}>
                    <p>{msg}</p>
                    <SolaButton action={closeMsg} label="باشه" />
                </dialog>
            }
        </>
    );
}

export default Subscribe;