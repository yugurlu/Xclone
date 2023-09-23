import React, { useState } from "react";
import "../Home.css";
import axios from "axios";
import { useEffect } from "react";
import SendComment from "./SendComment";

function Tweet({
  username,
  profilePicture,
  content,
  likes,
  media,
  comments,
  retweett,
  id,
  key,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [isHovered2, setHovered2] = useState(false);
  const [isHovered3, setHovered3] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isImage, setIsImage] = useState(null);

  const user = localStorage.getItem("loggedInUser");
  const userId = localStorage.getItem("loggedInUserId");

  const likeDislike = async (tweetId) => {
    try {
      axios.patch(
        "http://localhost:3001/tweets/like-dislike/" + tweetId,
        {
          tweetId: tweetId,
          username: user,
        },
        { withCredentials: true }
      );
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setIsSelected(!isSelected); // Tweet'e tıklandığında isSelected state'ini tersine çevirin
    setIsImage("asd");
  };

  useEffect(() => {
    if (likes && likes.includes(userId)) setIsLiked(true);
    else setIsLiked(false);
  }, []);

  const comment = (tweetId) => {};

  const retweet = (tweetId) => {};

  const tweetData = [
    {
      id: 1,
      username: "user1",
      profilePicture: profilePicture,
      content: "This is the first tweet.",
      likes: likes,
    },
    {
      id: 2,
      username: "user2",
      profilePicture: profilePicture,
      content: "This is the second tweet.",
      likes: likes,
    },
    {
      id: 3,
      username: "user3",
      profilePicture: profilePicture,
      content:
        'Random rap facts that might SHOCK you 😳🔥 • Ice Spice has more Spotify monthly listeners than J. Cole • Nicki Minaj songs have charted for more weeks on Billboard than the next 3 most popular female rappers songs have combined • Drake song "In My Feelings" has more streams than EVERY Pusha T song combined • Eminem’s “Curtain Call” has charted for longer than EVERY Jay Z album has combined',
      likes: likes,
    },
    {
      id: 4,
      username: "user4",
      profilePicture: profilePicture,
      content: "This is the fourth tweet.",
      likes: likes,
    },
    {
      id: 5,
      username: "user5",
      profilePicture: profilePicture,
      content: "This is the fifth tweet.",
      likes: likes,
    },
  ];

  return (
    <div
      className={`tweet ${
        isSelected ? "grow-tweet" : "re-grow-tweet"
      } ${comments}`}
    >
      <img
        src={profilePicture}
        alt={`${username}'s profile`}
        className="profile-img"
      />
      <div className={`main-content${comments}`}>
        <div className={`tweet-content-${comments}`}>
          <h4 className="username">{username}</h4>
          <p onClick={handleClick}> {content} </p>
          {key == 1 ? (
            <img src="https://pbs.twimg.com/media/F6gA5aTXUAASx5Z?format=jpg&name=large"></img>
          ) : null}
          <div className="tweet-actions">
            {isLiked === false ? (
              <svg
                width="24"
                height="24"
                aria-hidden="true"
                class="like-button"
                onClick={() => likeDislike(id)}
                onMouseEnter={() => {
                  setHovered(true);
                }}
                onMouseLeave={() => {
                  setHovered(false);
                }}
                style={{
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <g>
                  <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                </g>
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                aria-hidden="true"
                class="red-like-button"
                onClick={() => likeDislike(id)}
                onMouseEnter={() => {
                  setHovered(true);
                }}
                onMouseLeave={() => {
                  setHovered(false);
                }}
                style={{
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <g>
                  <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                </g>
              </svg>
            )}
            <svg
              width="24"
              height="24"
              aria-hidden="true"
              class="comment-button"
              onClick={() => setIsSelected(true)}
              onMouseEnter={() => {
                setHovered2(true);
              }}
              onMouseLeave={() => {
                setHovered2(false);
              }}
              style={{
                transform: isHovered2 ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <g>
                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
              </g>
            </svg>
            <svg
              width="24"
              height="24"
              aria-hidden="true"
              class="rte-button"
              onClick={() => retweet(id)}
              onMouseEnter={() => {
                setHovered3(true);
              }}
              onMouseLeave={() => {
                setHovered3(false);
              }}
              style={{
                transform: isHovered3 ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <g>
                <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
              </g>
            </svg>
          </div>
        </div>
        {isSelected === true ? (
          <div className="tweet-list2">
            <SendComment></SendComment>
            {tweetData == null ? (
              <p>No comments avaiable...</p>
            ) : (
              <div className="comments-list">
                {tweetData.map((tweets, index) => (
                  <Tweet
                    key={index}
                    id={tweets._id}
                    username={"tweetData.username"}
                    profilePicture={tweets.profilePicture}
                    content={tweets.content}
                    likes={null}
                    comments={"comments"}
                  />
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Tweet;
