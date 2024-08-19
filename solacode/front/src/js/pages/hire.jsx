import React, { useContext, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";

import { Input, SolaButton } from "../components/basic";

import { hire } from "../utils/translations";
import { SettingsContext } from "../utils/context";

import '../../css/hire.sass';


function Hire() {
  const settings = useContext(SettingsContext);
  const msgRef = useRef(null);
  const loadRef = useRef(null);
  const formRef = useRef(null);
  const errRef = useRef(null);
  const [msg,setMsg] = useState('');

  const check = () => {
    const valid = (name) => {
      const elem = document.getElementsByName(name)[0];
      if(elem.value===''){
        elem.classList.add('error');
        return false;
      } else {
        elem.classList.remove('error');
        return true;
      }
    };
    if(valid('name') && valid('email') && valid('summary')){
      errRef.current.innerHTML = '';
      submit();
    } else {
      errRef.current.innerHTML = hire.error[settings.lang];
    }
  };

  const submit = () => {
    loadRef.current.showModal();
    fetch('/api/db/hire/',{
      method: 'POST',
      body: new FormData(formRef.current),
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      mode: 'same-origin'
    }).then((response) => {
      if(response.ok){
        loadRef.current.close();
        setMsg(hire.success[settings.lang]);
        msgRef.current.showModal();
        Object.values(document.getElementsByTagName('input')).forEach(inp=>{
          inp.value='';
        });
        Object.values(document.getElementsByTagName('textarea')).forEach(inp=>{
          inp.value='';
        })
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    }).catch((error) => {
      console.log(error);
      loadRef.current.close();
      setMsg(hire.fail[settings.lang]);
      msgRef.current.showModal();
    });
  };
  const closeMsg = () => {
    msgRef.current.close();
  };

  return (
    <>
      <Helmet>
        <title>SolaCode</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <form ref={formRef}>
        <h2>{hire.title[settings.lang]}</h2>
        <Input name="name" label={hire.name[settings.lang]} />
        <Input name="email" label={hire.email[settings.lang]} type="email" />
        <Input name="budget" label={hire.budget[settings.lang]} required={false} />
        <Input name="summary" label={hire.summary[settings.lang]} type="textarea" />
        <SolaButton action={check} label={hire.submit[settings.lang]} />
        <p ref={errRef}></p>
      </form>
      <dialog ref={loadRef} className="loader-wrapper">
        <img src={`/assets/front/img/loader-${settings.theme}.gif`} className="loader" />
      </dialog>
      <dialog ref={msgRef}>
        <p>{msg}</p>
        <SolaButton action={closeMsg} label={hire.ok[settings.lang]} />
      </dialog>
    </>
  );
}

export default Hire;