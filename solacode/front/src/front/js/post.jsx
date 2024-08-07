import React from "react";
import { useParams } from "react-router-dom";

function Post() {

  const { id } = useParams();

  return (
    <h2>Post page: {id}</h2>
  );
}

export default Post;