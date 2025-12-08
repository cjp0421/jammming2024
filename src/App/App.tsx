import { useEffect, useState } from 'react';
import styles from './App.module.css'
import SearchResults from "../components/searchresults/SearchResults"
import Playlist from '../components/playlist/Playlist';
import SearchBar from '../components/searchbar/SearchBar';
import { Track as TrackType } from '../components/tracklist/Tracklist';
import { Spotify } from "../util/Spotify/Spotify.ts";
import { Box, Button, Container, Typography } from '@mui/material';

interface TrackInterface {
  name: string;
  artist: string;
  album: string;
  id: number;
  image?: string;
  artistId: string;
  uri: string;
}

function App() {
  const [searchResults, setSearchResults] = useState<TrackInterface[]>([]);
  const [playlistName, setPlaylistName] = useState("Example Playlist Name");
  const [playlistTracks, setPlaylistTracks] = useState<TrackInterface[]>([]);
  const [currentSearchType, setCurrentSearchType] = useState<"track" | "artist" | "album">("track");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function load() {
      await Spotify.initAuth();
      const token = await Spotify.getAccessToken();
      setIsLoggedIn(!!token);
    }
    load();
  }, []);

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    Spotify.beginLogin();
  }

  const fetchAlbumTracks = async (albumId: string) => {
    try {
      const tracks = await Spotify.getAlbumTracks(albumId);
      setSearchResults(tracks);
      setCurrentSearchType('track');
    } catch (error) {
      console.error("Error fetching album tracks:", error);
    }
  };

  const fetchArtistAlbums = async (artistId: string) => {
    try {
      const albums = await Spotify.getArtistAlbums(artistId);
      setSearchResults(albums);
      setCurrentSearchType('album')
    } catch (error) {
      console.error("Error fetching artist albums", error)
    }
  }


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
    const token = Spotify.getAccessToken();
    if (!token) {
      alert("Sign in with Spotify to save playlists.")
    }
    const trackURIs = playlistTracks.map((t: TrackType) => t.uri)

    Spotify.savePlaylist(playlistName, trackURIs)?.then(() => {
      setPlaylistName("New Playlist Name")
      setPlaylistTracks([])
    })
  }

  const search = (searchTerm: string, searchType: "track" | "artist" | "album") => {
    console.log("App search term:" + searchTerm, "App search type" + searchType);

    if (!isLoggedIn) {
      alert("Please log in first.")
      return;
    }

    setCurrentSearchType(searchType);
    Spotify.search(searchTerm, searchType)
      .then((result: React.SetStateAction<{ name: string; artist: string; album: string; id: number; artistId: string, uri: string }[]>) => setSearchResults(result))

  }

  return (
    <Container sx={{
      width: "100%"
    }}>
      <Box display='flex' justifyContent="space-between" alignItems="center" >
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
            onClick={(e) => e.preventDefault()}
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
        <Button
          type="button"
          onClick={handleLogin}
          sx={{
            backgroundColor: 'white',
            fontSize: 'small',
            width: 'fit-content',
            height: 'fit-content'
          }}
        >
          {isLoggedIn ? "Connected to Spotify!" : "Click here to connect to Spotify"}
        </Button>
        <Box sx={{ flex: 1 }}>
          <SearchBar onSearch={search} />
        </Box>
      </Box>
      <Box display="flex" width="100%" gap={2} alignItems="stretch" sx={{ height: '500px' }}>
        <Box sx={{ flex: 1, height: '500px' }}>
          <SearchResults
            userSearchResults={searchResults}
            onAdd={addTrack}
            isRemoval={false}
            onRemove={removeTrack}
            onAlbumClick={fetchAlbumTracks}
            searchType={currentSearchType}
            onArtistClick={fetchArtistAlbums}
            isArtistClickable={true}
          />
        </Box>
        {currentSearchType === 'track' &&
          <Box sx={{ flex: 1, height: '500px' }}>
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onAdd={addTrack}
              isRemoval={false}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist}
              onArtistClick={fetchArtistAlbums}
              isArtistClickable={true}
            />
          </Box>
        }
      </Box>

      <footer>
        <a
          target="_blank"
          referrerPolicy="no-referrer"
          href='https://github.com/cjp0421/jammming2024/blob/main/README.md'
        >
          About
        </a>
      </footer>

    </Container >
  )
}

export default App;
