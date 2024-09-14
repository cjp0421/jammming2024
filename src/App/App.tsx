import { useState } from 'react';
import styles from './App.module.css'
import SearchResults from "../components/searchresults/SearchResults"
import Playlist from '../components/playlist/Playlist';
import SearchBar from '../components/searchbar/SearchBar';


function App() {
  const [searchResults, setSearchResults] = useState([{
    name: "example track name 1",
    artist: "example track artist 1",
    album: "example track album 1",
    id: 1,
  },
  {
    name: "example track name 2",
    artist: "example track artist 2",
    album: "example track album 2",
    id: 2,
  }
  ])

  const [playlistName, setPlaylistName] = useState("Example Playlist Name")

  const [playlistTracks, setPlaylistTracks] = useState([{
    name: "example Playlist track name 2",
    artist: "example Playlist track artist 2",
    album: "example Playlist track album 2",
    id: 21,
  }])

  const addTrack = (track) => {
    const existingTrack = playlistTracks.find(t => t.id === track.id)

    if (existingTrack) {
      console.log("Track already exists in playlist")
      return;
    }

    const newTrack = playlistTracks.concat(track)
    setPlaylistTracks(newTrack);
  }

  const removeTrack = (track) => {
    const updatedPlaylist = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(updatedPlaylist)
  }

  return (
    <div className={styles.App}>
      <header className='header'>
        <div className='row'>
          <div className='col-6'>

            <h1>Ja<span className={styles.highlight}>mmm</span>ing</h1>
          </div>
          <div className='col-6 text-end'>
            <div className={styles["header-links"]}>
              <a
                className={styles["header-link"]}
                target="_blank"
                referrerPolicy="no-referrer"
                href='https://github.com/cjp0421/jammming2024'>
                Github</a>
              <a
                className={styles["header-link"]}
                href='#'>Portfolio</a>
              <a
                className={styles["header-link"]}
                target="_blank" referrerPolicy="no-referrer" href='https://www.linkedin.com/in/carol-joy-pedersen'>LinkedIn</a>
            </div>

          </div>
        </div>
      </header>

      <SearchBar />

      <div className={styles['App-playlist']}>

        <div className='row'>
          <div className='col d-flex'>
            <SearchResults className='col-6' userSearchResults={searchResults} onAdd={addTrack} />
            <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} />
          </div>
        </div>

      </div>

      <footer>
        <div className='row'>
          <div className='col-6'>
            <a target="_blank" referrerPolicy="no-referrer" href='https://github.com/cjp0421/jammming2024/blob/main/README.md'>About</a>
          </div>
        </div>

      </footer>
    </div>
  )
}

export default App
