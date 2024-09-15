import React, { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { SolaButton } from "../components/basic";
import Subscribe from "../components/subscribe";

import { SettingsContext } from "../utils/context";

import '../../css/subscription.sass';


function Confirmation() {
  const { token } = useParams();
  const [ confirmed, setConfirmed ] = useState(false);
  const [ error, setError ] = useState(false);
  const theme = useContext(SettingsContext).theme;

  useEffect(()=>{
    fetch(`/api/cs${token}`).then((response)=>{
      return response.json();
    }).then((response)=>{
      console.log(response);
      if(response.status==404){
        setError(true);
      } else if(response.status==200){
        setConfirmed(true);
      }
    }).catch((error)=>{
      console.log(error);
    });
  },[token]);
  
  if(error){
    throw new Error();
  } else {
    return (
      <>
        <Helmet>
          <title>تایید ایمیل</title>
          <meta name="robots" content="noindex,nofollow" />;,
        </Helmet>
        <section className="subscription-body">
          {confirmed?
            <>
              <p>ایمیل شما با موفقیت تایید شد.</p>
              <SolaButton url={'/'} label="رفتن به وبلاگ" arrow />
            </>:
            <img src={`/assets/front/img/loader-${theme}.gif`} width={250} height={250} />
          }
        </section>
      </>
    );
  }
}

function Unsubscribe() {
  const { token } = useParams();
  const [ cancelled, setCancelled ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);
  const theme = useContext(SettingsContext).theme;

  const cancel = () => {
    setLoading(true);
    fetch(`/api/us${token}`).then((response)=>{
      return response.json();
    }).then((response)=>{
      if(response.status==404){
        setError(true);
      } else if(response.status==200){
        setCancelled(true);
        setLoading(false);
      }
    }).catch((error)=>{
      console.log(error);
    });
  };
  
  if(error){
    throw new Error();
  } else {
    return (
      <>
        <Helmet>
          <title>لغو اشتراک</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <section className="subscription-body">
          {loading?
            <img src={`/assets/front/img/loader-${theme}.gif`} width={250} height={250} />:
            (cancelled?
              <p>اشتراک شما با موفقیت لغو شد!</p>:
              <>
                <p>شما در حال لغو اشتراک خود در خبرنامه‌‌ی وبلاگ هستید. آیا می‌خواهید ادامه دهید؟</p>
                <SolaButton action={cancel} label="ادامه و لغو اشتراک" arrow />
              </>
            )
          }
        </section>
      </>
    );
  }
}

function Subscription() {
  const { token }= useParams();
  const [ edited, setEdited ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);
  const subscription = useRef({});

  useEffect(()=>{
    setLoading(true);
    fetch(`/api/gs${token}`).then((response)=>{
      return response.json();
    }).then((response)=>{
      if(response.status==404){
        setError(true);
      } else if(response.status==200){
        subscription.current = response.object;
        setLoading(false);
      }
    }).catch((error)=>{
      console.log(error);
    });
  },[token]);

  const edit = (newFrequency) => {
    if(newFrequency==subscription.current.frequency){
      setEdited(true);
    } else {
      setLoading(true);
      fetch(`/api/db/subscription/${subscription.current.id}`,{
        method: 'PUT',
        body: {
          token: token,
          frequency: newFrequency,
        }
      }).then((response)=>{
        if(response.ok){
          setLoading(false);
          setEdited(true);
        } else {
          throw new Error({
            msg: 'something wrong with the request',
            response: response
          });
        }
      }).catch((error)=>{
        console.log(error);
      });
    }
  };

  if(error){
    throw new Error();
  } else {
    return (
      <>
        <Helmet>
          <title>ویرایش اشتراک</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <section className="subscription-body">
          {loading?
            <img src={`/assets/front/img/loader-${theme}.gif`} width={250} height={250} />:
            (edited?
              <p>اشتراک شما با موفقیت ویرایش شد!</p>:
              <Subscribe edit onEdit={edit} subscription={{
                email: subscription.current.email,
                frequency: subscription.current.frequency
              }} />
            )
          }
        </section>
      </>
    );
  }
}

export { Confirmation, Unsubscribe, Subscription };