import React, { useState } from "react";
import "../SendComment.css";
import axios from "axios";

function SendComment({ setNewTweet }) {
  const [tweet, setTweet] = useState("");
  const [isHovered, setHovered] = useState(false);

  const user = localStorage.getItem("loggedInUser");

  var send = async () => {
    try {
      if (tweet.length > 0) {
        const response = await axios.post(
          "http://localhost:3001/tweets",
          {
            username: user,
            content: tweet,
          },
          { withCredentials: true }
        );
        setTweet("");
        setNewTweet(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comment-area">
      <input
        type="text"
        placeholder="Yorum Yap!"
        className="comment-text-area"
        value={tweet}
        onChange={(e) => {
          setTweet(e.target.value);
        }}
      />
      <p
        alt="Gonder"
        className="yanitla"
        onClick={send}
        style={{
          transform: isHovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.3s ease-in-out",
          fontWeight: "bold",
        }}
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
      >
        {" "}
        Yanıtla
      </p>
    </div>
  );
}

export default SendComment;
