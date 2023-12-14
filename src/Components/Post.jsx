import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../Helper/helper";

const Post = ( { _id, title, summary, cover, content, createdAt, author}  ) => {

    // console.log(cover);
    const date = new Date(createdAt);
    // Options for formatting the date and time
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // timeZoneName: "short"
    };
    // Convert the date object to a formatted string
    const formattedDate = date.toLocaleDateString("en-US", options);

    // Function to slice the summary into the first 30 words
    const sliceInformation = (Information, len) => {
      const words = Information.split(' ');
      return words.slice(0, len).join(' ');
    };

    const shortSummary = sliceInformation(summary, 20);

  return (
    <div className="card">
    <div className="card-image">
      <Link to={`/post/${_id}`}>
        <img src={`${BASE_URL}/${cover}`} alt={title} />
      </Link>
    </div>
    <div className="card-text">
      <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
      </Link>
      <p className="info">
        <a className="author">Author: {author.username}</a>
      </p>
      <p className="info">
        <time>{formattedDate}</time>
      </p>
      <p className="summary">
        {shortSummary} ...
      </p>
    </div>
  </div>
  );
};

export default Post;
