import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";

import { SolaButton, Search } from "../components/basic";
import Subscribe from "../components/subscribe";

import '../../css/blog.sass';


function PostCard({article}){
  return (
    <article className="postcard">
      {article.image?
        <img src={article.image} />
      :null}
      <h3>{article.title}</h3>
      <p>{article.summary}</p>
      <SolaButton url={`/blog/post/${article.id}`} label="بیشتر بخوانید" arrow />
    </article>
  );
}
function Blog() {
  const subRef = useRef(null);
  const postsContainer = useRef(null);
  const articles = useRef([]);

  const [end,setEnd] = useState(false);
  const [searchFlag,setSearchFlag] = useState(false);
  const [loading,setLoading] = useState(false);
  const [page,setPage] = useState(1);
  const [col,setCol] = useState(1);

  const [load,setLoad] = useState(0);

  useEffect(()=>{
    // retrieve new pages, then setLoad(load+1)
    setLoading(true);
    fetch(`/api/db/blog/?page=${page}`).then((response) => {
      if(response.ok){
        return response.json();
      } else {
        throw new Error({
          msg: 'problem with request',
          response: response
        });
      }
    }).then((resultJson) => {
      articles.current.push(...resultJson.results);
      if(resultJson.results.length<5){
        setEnd(true);
      }
      setLoad(load+1);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    });
  },[page]);

  const reset = () => {
    setEnd(false);
    setSearchFlag(false);
    setPage(1);
    articles.current = [];
  };
  const search = (value) => {
    fetch(`/api/db/blog/?search=${value}`).then((response) => {
      if(response.ok){
        return response.json();
      } else {
        throw new Error({
          msg: 'problem with request',
          response: response,
        });
      }
    }).then((resultJson)=>{
      articles.current = resultJson.results;
      setPage(0);
      setSearchFlag(true);
      setLoad(load+1);
    }).catch((error) => {
      console.log(error);
    });
  };

  const layout = () => {
    if(postsContainer.current.clientWidth>2){
      setCol(2);
    }
  };

  const openSubscribe = () => {
    subRef.current.showModal();
  };
  const closeSubscribe = () => {
    subRef.current.close();
  };

  return (
    <>
      <Helmet>
        <title>وبلاگ SolaCode</title>
        <meta name="keywords" content="وبلاگ،برنامه نویسی،اپلیکیشن،وبسایت،تکنولوژی" />
        <meta name="description" content="من یک برنامه‌نویس هستم با تجربه در زمینه‌ی برنامه‌نویسی موبایل، برنامه‌ی تحت وب و ساخت وبسایت شخصی. در این وبلاگ نظرات خود را با شما به اشتراک می‌گذارم." />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="solacode" />
      </Helmet>
      <section id="header">
        <section>
          <h2 onClick={searchFlag?reset:null} className={searchFlag?'pointer':''}>وبلاگ</h2>
          <SolaButton action={openSubscribe} icon="bell" />
        </section>
        <Search label="عبارت مورد جستجو" placeholder="دنبال چیزی هستید؟" onSearch={search} />
      </section>
      <section ref={postsContainer} id="posts-view" onLoad={layout}>
        {col>1?
          [...Array(col).keys()].map(i=>
            <section className="posts-view-column" key={i}>
              {articles.current.map(article => {
                if(articles.current.indexOf(article)%2==i){
                  return (<PostCard article={article} key={article.id} />);
                }
              })}
            </section>
          ):
          <section className="posts-view-column">
            {articles.current.map(article =>
              <PostCard article={article} key={article.id} />
            )}
          </section>
        }
      </section>
      {end || searchFlag || loading ? null :
        <section id="more-wrapper">
          <SolaButton action={()=>setPage(page+1)} icon="down" />
        </section>
      }
      <dialog ref={subRef}>
        <Subscribe close={closeSubscribe} />
      </dialog>
    </>
  );
}

export default Blog;