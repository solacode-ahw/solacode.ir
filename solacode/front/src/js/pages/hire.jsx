import React, { useContext, useRef, useState } from "react";
import { Helmet } from "react-helmet";

import { Input, SolaButton } from "../components/basic";

import { hire } from "../utils/translations";
import { SettingsContext } from "../utils/context";

import '../../css/hire.sass';


function Hire() {
  const settings = useContext(SettingsContext);
  const msgRef = useRef(null);
  const loadRef = useRef(null);
  const [msg,setMsg] = useState('');

  const submit = () => {
    loadRef.current.showModal();
    const form = document.getElementById('hire-form');
    fetch('url',{
      method: 'POST',
      body: new FormData(form),
    }).then((response) => {
      console.log(response);
      if(response.ok){
        loadRef.current.close();
        setMsg(hire.success[settings.lang]);
        msgRef.current.showModal();
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
      <form id="hire-form">
        <h2>{hire.title[settings.lang]}</h2>
        <Input name="name" label={hire.name[settings.lang]} />
        <Input name="email" label={hire.email[settings.lang]} />
        <Input name="budget" label={hire.budget[settings.lang]} required={false} />
        <Input name="summary" label={hire.summary[settings.lang]} type="textarea" />
        <SolaButton action={submit} label={hire.submit[settings.lang]} />
      </form>
      <dialog ref={loadRef}>
        <p>Loading...</p>
      </dialog>
      <dialog ref={msgRef}>
        <p id="message">{msg}</p>
        <SolaButton action={closeMsg} label={hire.ok[settings.lang]} />
      </dialog>
    </>
  );
}

export default Hire;