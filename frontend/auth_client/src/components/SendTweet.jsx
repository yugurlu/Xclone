import React, { useState } from "react";
import "../SendTweet.css";
import axios from "axios";

function SendTweet({ setNewTweet }) {
  const [tweet, setTweet] = useState("");
  const [media, setMedia] = useState(null);
  const [isHovered, setHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setMedia(file);
    }
  };

  return (
    <div className="twitter-clone">
      <div className="twitter-clone__input">
        <i className="fab fa-twitter"></i>
        <input
          type="text"
          placeholder="Neler Oluyor?"
          className="twitter-clone__text-input"
          value={tweet}
          onChange={(e) => {
            setTweet(e.target.value);
          }}
        />
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="imageInput"
        />
        <label htmlFor="imageInput" style={{ cursor: "pointer" }}>
          <img
            src={require("../images/media-button.png")}
            alt="Media"
            className="media-input"
            width={20}
          ></img>
        </label>
        <img
          src={require("../images/send-button.png")}
          alt="Gonder"
          className="twitter-clone__send-icon"
          onClick={send}
          style={{
            transform: isHovered ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.3s ease-in-out",
          }}
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
          }}
        />
        {selectedImage && (
          <div>
            <img
              src={selectedImage}
              alt="Seçilen Resim"
              style={{ maxWidth: "100%" }}
              className="image"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SendTweet;
