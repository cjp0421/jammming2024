import { useState } from 'react';
import styles from './App.module.css'
import SearchResults from "../components/searchresults/SearchResults"
import Playlist from '../components/playlist/Playlist';
import SearchBar from '../components/searchbar/SearchBar';
import { Track as TrackType } from '../components/tracklist/Tracklist';
// @ts-expect-error Types need to be created for this import
import { Spotify } from "../util/Spotify/Spotify.js";
import { Box, Container, Typography } from '@mui/material';

interface TrackInterface {
  name: string;
  artist: string;
  album: string;
  id: number;
}

function App() {
  const [searchResults, setSearchResults] = useState<TrackInterface[]>([])

  const [playlistName, setPlaylistName] = useState("Example Playlist Name")

  const [playlistTracks, setPlaylistTracks] = useState<TrackInterface[]>([])

  const addTrack = (track: TrackType) => {
    const existingTrack = playlistTracks.find(t => t.id === track.id)

    if (existingTrack) {
      console.log("Track already exists in playlist. Cannot be added again.")
      return;
    }

    const newTrack = playlistTracks.concat(track)
    setPlaylistTracks(newTrack);
  }

  const removeTrack = (track: TrackType) => {
    const nonexistingTrack = playlistTracks.filter((t) => t.id !== track.id);

    if (!nonexistingTrack) {
      console.log("Track does not exist in playlist. Cannot be deleted.")
      return
    }

    const updatedPlaylist = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(updatedPlaylist)
  }

  const updatePlaylistName = (name: string) => {
    setPlaylistName(name)
  }

  const savePlaylist = () => {
    console.log("Save clicked")
    const trackURIs = playlistTracks.map((t: TrackType) => t.uri)

    console.log(trackURIs);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist Name")
      setPlaylistTracks([])
    })
  }

  const search = (searchTerm: string) => {
    console.log(searchTerm);
    Spotify.search(searchTerm)
      .then((result: React.SetStateAction<{ name: string; artist: string; album: string; id: number; }[]>) => setSearchResults(result))

  }

  return (
    <Container sx={{
      width: "100%"
    }}>
      <Box display='flex' justifyContent="space-between" alignItems="center" width="100%">
        <Box sx={{
          justifyContent: 'flex-start',
        }}>
          <Typography variant='h1' sx={{
            fontSize: '48px',
            display: 'flex',
            alignItems: 'center'
          }}>
            Ja<span className={styles.highlight}>mmm</span>ing
          </Typography>
        </Box>
        <Box className={styles["header-links"]} sx={{
          display: 'flex',
          gap: 1,
          justifyContent: 'flex-end',

        }}>
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
            target="_blank"
            referrerPolicy="no-referrer"
            href='https://www.linkedin.com/in/carol-joy-pedersen'>
            LinkedIn</a>
        </Box>
      </Box>

      <Box display='flex' width='100%'>
        <Box sx={{ flex: 1 }}>
          <SearchBar onSearch={search} />
        </Box>
      </Box>
      <Box display="flex" width="100%" padding={2} gap={2} alignItems="stretch" sx={{ height: '500px' }}>
        <Box sx={{ flex: 1, height: '500px' }}>
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} isRemoval={false} onRemove={removeTrack} />
        </Box>
        <Box sx={{ flex: 1, height: '500px' }}>
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} onAdd={addTrack} isRemoval={false} onNameChange={updatePlaylistName} onSave={savePlaylist} />
        </Box>
      </Box>



      <footer>
        <a target="_blank" referrerPolicy="no-referrer" href='https://github.com/cjp0421/jammming2024/blob/main/README.md'>About</a>
      </footer>
    </Container >
  )
}

export default App;
