import './App.css';
import React,{useEffect}  from "react";
import Login from "./Login.js"
import {getTokenFromResponse as getTokenFromUrl} from "./spotify.js"
import SpotifyWebApi from "spotify-web-api-js"
import Player from './Player.js'
import {useDataLayerValue} from "./DataLayer" 

const spotify=new SpotifyWebApi();

function App() {

 
  const [{user,token,playlists},dispatch]=useDataLayerValue();

  useEffect(()=>{
    const hash=getTokenFromUrl();
    window.location.hash="";
    let _token=hash.access_token;
    if(_token){

      spotify.setAccessToken(_token);

      dispatch({
        type:"SET_TOKEN",
        token:_token
      })

      spotify.getMe((err,user)=>{
        if(err){
          console.log("Error in fetching User "+err);
        }else{
          dispatch({
            type:"SET_USER",
            user:user
          })
          console.log("User ",user)
        }
      })

      spotify.getUserPlaylists((err,data)=>{
        if(err){
          console.log("Error in fetching Playlists "+err);
        }else{
          dispatch({
            type:"SET_PLAYLISTS",
            playlists:data
          })
        }
      })

      spotify.getPlaylist('37i9dQZF1DZ06evO4029Pj',(err,data)=>{
        dispatch({
          type:"SET_DISCOVER_WEEKLY",
          discover_weekly:data
        })
      })

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
    }

  },[token,playlists]);
  return (
    <div className="app">
      {
        token ? (
          <Player spotify={spotify}/>
        ):<Login/>
      }
    </div>
  );
}

export default App;
