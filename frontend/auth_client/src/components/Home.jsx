import React, { useState } from 'react';
import '../Home.css';
import axios from 'axios';
import { useEffect } from 'react';
import  SendTweet from './SendTweet'
import Tweet from './Tweet';
import * as moment from 'moment';
import 'moment/locale/pt-br';

function App() {
  const [tweets, setTweets] = useState(null)
  const [newTweet, setNewTweet] = useState(null)
  const [isHovered, setHovered] = useState(false)
  const [headerText, setHeaderText] = useState("")
  const [selectedTweetId, setSelectedTweetId] = useState(null);
  
  const userProfilePicture = localStorage.getItem("loggedInUserProfilePicture")
  
  useEffect(() => {
    async function getTweets() {
      const response = await axios.get("http://localhost:3001/tweets", { withCredentials: true })
      if (response) {
        setTweets(response.data)
      }
    }
    getTweets()
  }, [])
  
  useEffect(() => {
    if (newTweet) {
      tweets.reverse().push(newTweet)
      tweets.reverse()
      setTweets(tweets);
      setNewTweet(null)
    }
  }, [newTweet, tweets]);

  useEffect(() => {
    moment.locale("tr")
    const time = parseInt(moment().format('LT').substring(0, 2))
    if (6 < time && time < 12)
      setHeaderText("Good Morning!")
    else if (12 <= time && time <= 18)
      setHeaderText("Good Afternoon!")
    else
      setHeaderText("Good Evening!")
  })
  

  return (
    <div className="home">
      <header className="header">
        <img
          src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0-1.jpg"
          alt='Twitter'
          className="logo"
          />
        <img
          src={userProfilePicture}
          alt='Profile'
          className="profile"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s ease-in-out'
          }}
          onMouseEnter={ () => { setHovered(true) }}
          onMouseLeave={ () => { setHovered(false) }}
        />
        <h1 className="headerText">{headerText}</h1>
       </header>
       <div>
        <SendTweet setNewTweet={setNewTweet}/>
       </div>
      <main className="main">
        {tweets == null ? (
            <p>No tweets avaiable...</p>
          ) : (
            <div className="tweet-list">
              {tweets.map((tweets, index) => (
                <Tweet
                key={index}
                id={tweets._id}
                username={tweets.sharedBy}
                profilePicture={tweets.profilePicture}
                content={tweets.content}
                likes={tweets.Actions.likes}
                comments={tweets.Actions.comments}
                isSelected={tweets._id === selectedTweetId}
                media='https://pbs.twimg.com/media/F6gA5aTXUAASx5Z?format=jpg&name=large'
                />
              ))}
            </div>
        )}
      </main>
  </div>
  );
}

export default App;
