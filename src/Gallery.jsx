import React, { Component} from "react";

import "./App.css";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: "",
      audio: null,
      playing: false
    };
  }
  playAudio(previewUrl) {
    let audio = new Audio(previewUrl);
    audio.onended = () => {
      if (audio.currentSrc === this.state.playingUrl) {
        audio.pause();
        this.setState({
          playing: false
        });
      }
    }
    if (!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio: audio
      });
    } else {
      if (this.state.playingUrl === previewUrl) {
        this.state.audio.pause();
        this.setState({
          playing: false
        });
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio: audio
        });
      }
    }
  }
  render() {
    const tracks = this.props.tracks;
    if (tracks !== undefined) {
      return (
        <div>
          { 
            tracks.map((track, index) => {
              const trackImg = track.album.images[0].url;
              return (
                <div key={index} className="Track" 
                  onClick={ () => this.playAudio(track.preview_url) }>
                  <img src={trackImg}
                  className="Track-img"
                  alt="track" />
                  <div className="Track-play">
                    {
                      this.state.playingUrl === track.preview_url && this.state.playing ?
                      <span>| |</span> :
                      <span>&#9654;</span>
                    }
                  </div>
                  <p className="Track-text">
                    {track.name}
                  </p>
                </div>
              );
            })
          }
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Gallery;