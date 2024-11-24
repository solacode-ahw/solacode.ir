import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Converter, setFlavor } from "showdown";
import { Parser } from "html-to-react";
setFlavor('github');

import { SolaButton } from "../components/basic";
import Subscribe from "../components/subscribe";

import '../../css/post.sass';


function Post() {
  const { id } = useParams();
  const [article,setArticle] = useState(null);
  const [err, setErr] = useState(false);
  const subRef = useRef(null);
  const msgRef = useRef(null);

  useEffect(()=>{
    fetch(`/api/db/blog/${id}/`).then((response)=>{
      if(response.ok){
        return response.json();
      } else {
        throw new Error({
          msg: 'something wrong with the request',
          response: response
        });
      }
    }).then((resultJson)=>{
      setArticle(resultJson);
    }).catch((error)=>{
      console.log(error);
      setErr(true);
    });
  },[id]);

  const openSubscribe = () => {
    subRef.current.showModal();
  };
  const closeSubscribe = () => {
    subRef.current.close();
  };
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then((res)=>{
      msgRef.current.showModal();
    }).catch((error)=>{
      console.log('fail:',error);
    });
  };
  const closeMsg = () => {
    msgRef.current.close();
  };

  if(err){
    throw new Error();
  }
  if(article){
    return (
      <>
        <Helmet>
          <title>SolaCode - {article.title}</title>
          <meta name="keywords" content={article.keywords} />
          <meta name="description" content={article.summary} />
          <meta name="author" content="SolaCode" />
          <meta name="robots" content="index,follow" />
        </Helmet>
        <article id="blog-post">
          {article.image?
            <img src={article.image} id="blog-image" />
          :null}
          <h2>{article.title}</h2>
          <section id="blog-info">
            <p>{
              new Intl.DateTimeFormat('fa-IR',{
                month: 'long',
                calendar: 'persian'
              }).format(new Date(article.date)) + " " +
              new Intl.DateTimeFormat('fa-IR',{
                year: 'numeric',
                calendar: 'persian'
              }).format(new Date(article.date))
            }</p>
            <p>نویسنده: بهار پایدار</p>
          </section>
          <p id="blog-summary">{article.summary}</p>
          <section id="blog-body">{
            Parser().parse(new Converter().makeHtml(article.body))
          }</section>
          <section id="action-wrapper">
            <SolaButton icon="share" action={copyLink} />
            <SolaButton icon="bell" action={openSubscribe} />
          </section>
        </article>
        <dialog ref={subRef}>
          <Subscribe close={closeSubscribe} />
        </dialog>
        <dialog ref={msgRef}>
          <p>لینک این صفحه کپی شد!</p>
          <SolaButton action={closeMsg} label="باشه" />
        </dialog>
      </>
    );
  }
}

export default Post;