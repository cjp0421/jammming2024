import { useEffect, useState } from 'react';
import SearchResults from "../components/SearchResults.tsx";
import Playlist from '../components/Playlist.tsx';
import SearchBar from '../components/SearchBar.tsx';
import { Track as TrackType } from '../components/Tracklist.tsx';
import { Spotify } from "../util/Spotify/Spotify.ts";
import { Box, Button, Grid } from '@mui/material';
import PageHeading from '../components/PageHeading.tsx';
import './App.css';
import Footer from '../components/Footer.tsx';

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
    <>
      <PageHeading />
      <Box
        sx={{
          mt: 7,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          width: "100%",
        }}
      >
        <Button
          type="button"
          onClick={handleLogin}
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            py: 1.5,
            backgroundColor: isLoggedIn ? '#9f21a3' : '#1e131c',
            mt: 7
          }}
        >
          {isLoggedIn ? "Connected to Spotify!" : "Click here to connect to Spotify"}
        </Button>

        <Box>
          <SearchBar onSearch={search} />
        </Box>
      </Box>

      <Grid>
        <Grid>
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
        </Grid>
        {currentSearchType === 'track' &&
          <Grid>
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
          </Grid>
        }
      </Grid>

      <Footer />
    </>
  )
}

export default App;
