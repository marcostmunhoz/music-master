import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

import "./App.css";
import Profile from "./Profile";
import Gallery from './Gallery';
import Bookmarks from "./Bookmarks";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: []
    }
  }

  search() {
    const ARTIST_URL = `https://api.spotify.com/v1/search?type=artist&limit=1&query=${this.state.query}`;
    const ALBUM_URL = "https://api.spotify.com/v1/artists";
    const TOKEN = "Bearer BQBz_qOKaHbMvfpSQ40eab3vljcQyJv0CXgcQm1DJJ7vlWpCTfxh-ARL50a3dqRlYz0ZZKwp462XCHKy5EQ9lK22kVxPlxbh6CxOWKxO9tXhyhzO97ccqIWz1DU16yZbvOTYuBNvrDI-daYy";
    fetch(ARTIST_URL, {
      method: "GET",
      headers: {
        Authorization: TOKEN
      }
    }).then((artistResponse) => artistResponse.json()).then((artistJson) => {
        const artist = artistJson.artists.items[0];
        this.setState({ artist: artist });
        if (artist !== undefined) {
          fetch(`${ALBUM_URL}/${artist.id}/top-tracks?country=br`, {
            method: "GET",
            headers: {
              Authorization: TOKEN
            }
          }).then((albumResponse) => albumResponse.json()).then((albumJson) => {
            const tracks = albumJson.tracks;
            this.setState({ tracks: tracks });
          });
        }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl 
              type="text" 
              placeholder="Buscar por um artista..." 
              value={this.state.query} 
              onChange={(evt) => this.setState({ query: evt.target.value })}
              onKeyPress={ (evt) => { if (evt.key === "Enter") this.search() } } />
            <InputGroup.Addon onClick={ () => this.search() }>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null ?
            <div>
              <Profile artist={this.state.artist} />
              <Gallery tracks={this.state.tracks} />
            </div>
          : <div>Pesquise um artista acima</div>
        }
      </div>
    );
  }
}

export default App;