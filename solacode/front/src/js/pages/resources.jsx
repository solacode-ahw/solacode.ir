import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";

import { SolaButton, BackToTop, Search } from "../components/basic";

import '../../css/resources.sass';


function ResourceItem({name,description,link}){

  return (
    <article className="resource-item">
      <section className="resource-header">
        <h3 className="resource-title">{name}</h3>
        <SolaButton url={link} icon="download" />
      </section>
      <p className="resource-description">{description}</p>
    </article>
  );
}
function Resources() {
  const resources = useRef([]);
  const searchResults = useRef([]);
  const updateValue = useRef(1);
  const resourceContainer = useRef(null);

  const [update, setUpdate] = useState(0);
  const [col, setCol] = useState(1);
  const [searchFlag,setSearchFlag] = useState(false);

  useEffect(()=>{
    const getItems = async(url) => {
      fetch(url).then((response) => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error({
            msg: 'problem with request',
            response: response
          });
        }
      }).then((resultJson) => {
        resources.current.push(...resultJson.results);
        setUpdate(updateValue.current);
        updateValue.current+=1;
        if(resultJson.next){
          getItems(resultJson.next);
        }
      }).catch((error) => {
        console.log(error);
      });
    };
    window.addEventListener('load',layout);
    resources.current = [];
    getItems('/api/db/resource/?page=1');
  },[]);

  const search = (value) => {
    if(value){
      setSearchFlag(true);
      searchResults.current = resources.current.filter((item)=>{
        return (item.description.includes(value) || item.name.includes(value));
      });
      setUpdate(update+1);
    } else {
      setSearchFlag(false);
    }
  };

  const layout = () => {
    setCol(Math.floor(resourceContainer.current.clientWidth/332));
  };

  return (
    <>
      <Helmet>
        <title>SolaCode - دانلودها</title>
        <meta name="keywords" content="solacode,برنامه نویسی,وبسایت,اپلیکیشن,دانلود" />
        <meta name="description" content="فایل‌هایی را که به نظرم آمده می‌توانند مفید باشند، در وبسایت آپلود کرده‌ام. شما می‌توانید این فایل‌ها را در این صفحه مرور کرده و آنچه را نیاز دارید، دانلود کنید." />
        <meta name="author" content="solacode" />
        <meta name="robots" content="index,follow" />
      </Helmet>
      <section id="header">
        <h2>دانلودها</h2>
        <Search label='عبارت مورد جستجو' placeholder='به دنبال مورد خاصی هستید؟' onSearch={search} onChange />
      </section>
      <section ref={resourceContainer} id="resource-view">
        {[...Array(col).keys()].map(i=>
          <section className="resource-view-column" key={i}>
            {searchFlag?
              searchResults.current.map((item,index) => {
                if(index%col==i){
                  return (<ResourceItem name={item.name} description={item.description} link={item.file} key={item.id} />);
                }
              }):
              resources.current.map((item,index) => {
                if(index%col==i){
                  return (<ResourceItem name={item.name} description={item.description} link={item.file} key={item.id} />);
                }
              })
            }
          </section>
        )}
      </section>
      <BackToTop lang='fa' />
    </>
  );
}

export default Resources;