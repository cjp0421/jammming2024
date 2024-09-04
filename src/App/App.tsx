import { useState } from 'react';
import styles from './App.module.css'
import SearchResults from "../components/searchresults/SearchResults"
import Playlist from '../components/playlist/Playlist';


function App() {
  const [searchResults, setSearchResults] = useState([{
    name: "example track name 1",
    artist: "example track artist 1",
    album: "example track album 1",
  },
  {
    name: "example track name 2",
    artist: "example track artist 2",
    album: "example track album 2",
  }
  ])

  const [playlistName, setPlaylistName] = useState([{
    name: "Playlist Track Name 1",
    artist: "Playlist Track Artist 1",
    album: "Playlist Track Album 1",
  },
  {
    name: "Playlist Track Name 2",
    artist: "Playlist Track Artist 2",
    album: "Playlist Track Album 2",
  }])

  const [playlistTracks, setPlaylistTracks] = useState([{
    name: "example Playlist track name 2",
    artist: "example Playlist track artist 2",
    album: "example Playlist track album 2",
  }])

  const addTrack = (track: object) => {

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


      <div className={styles['App-playlist']}>

        <div className='row'>
          <div className='col d-flex'>
            <SearchResults className='col-6' userSearchResults={searchResults} />
            <Playlist className='col-6' playlistName={playlistName} playlistTracks={playlistTracks} />
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
