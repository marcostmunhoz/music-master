import React, { Component } from "react";

import "./App.css";

class Profile extends Component {
  render() {
    let artist = this.props.artist;
    if (artist !== undefined) {
      return (
        <div>
          <img alt="Profile"
            className="Profile-img"
            src={artist.images[0].url} />
          <div className="Profile-info">
            <div className="Profile-name">{artist.name}</div>
            <div className="Profile-followers">{artist.followers.total} seguidores</div>
            <div className="Profile-genres">
              {
                artist.genres.length > 1 ? 
                artist.genres.map((genre, index) => {
                  genre = genre !== artist.genres[artist.genres.length - 1] ? genre + ", " : "& " + genre;
                  return (
                  <span key={index}>{genre}</span>
                  );
                }) :
                <span>{artist.genres[0]}</span>
              }
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>Desculpe, não foi possível localizar o artista pesquisado =(</div>
          <div>Verifique a grafia e tente novamente.</div>
        </div>
      );
    }
  }
}

export default Profile;