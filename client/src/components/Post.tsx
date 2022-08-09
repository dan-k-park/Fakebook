import React, { useEffect, useState } from "react";

export const Post = (props: any) => {
  const publicFolder = process.env.PUBLIC_URL;
  const [like, setLike] = useState(props.post.likes.length);
  const [user, setUser] = useState({});
  const [isLiked, setIsLiked] = useState(false);

  return <div>Hi</div>;
};
