import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dbService from "../appwrite/db";
function Postcard({ post }) {
  const { $id, title } = post;
  const [posturl, setposturl] = useState("");

  useEffect(() => {
    if (post) {
      dbService
        .getFileView(post.featuredImage)
        .then((url) => {
          setposturl(url);
        })
        .catch((err) => {
          console.error("Error fetching preview URL:", err);
              setposturl(null);
        });
    }
  }, [post]);

  return (
    <Link to={`/post/${$id}`} className="">
      <div className="w-full p-1 bg-gray-100 rounded-lg flex flex-col gap-1 hover:scale-105 transition duration-200">
        <div className="w-full justify-center ">
          <img
            className="rounded-xl"
            src={posturl}
            alt={title}
          />
        </div>
        <h2 className="text-xl font-bold text-center">{title}</h2>
      </div>
    </Link>
  );
}

export default Postcard;
