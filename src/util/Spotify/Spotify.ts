let accessToken: string | null = null;

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// const redirectURL = `http://localhost:5173`
const redirectURL = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || window.location.origin;

const spotifyBaseURL = `https://api.spotify.com`;

function parseTokenFromHash(): string | null {
    const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1)
        : window.location.hash;
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    const expiresIn = params.get("expires_in");

    if (!token || !expiresIn) return null;

    const expiryMs = Date.now() + Number(expiresIn) * 1000;

    sessionStorage.setItem("spotify_access_token", token);
    sessionStorage.setItem("spotify_access_expiry", String(expiryMs));

    window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
    return token;
}

function loadTokenFromStorage(): string | null {
    const token = sessionStorage.getItem("spotify_access_token");
    const expiry = Number(sessionStorage.getItem("spotify_access_expiry") || 0);
    if (!token || !expiry || Date.now() > expiry) return null;
    return token;
}

function initAuth() {
    accessToken = parseTokenFromHash() || loadTokenFromStorage();
}

function getAccessToken() {
    if (accessToken) return accessToken;
    accessToken = parseTokenFromHash() || loadTokenFromStorage();
    return accessToken;
}

function isAuthenticated() {
    return !!accessToken;
}

function beginLogin(scopes: string = "playlist-modify-public") {
    sessionStorage.setItem(
        "post_login_redirect",
        window.location.pathname + window.location.search
    );

    const url = new URL("https://accounts.spotify.com/authorize")

    url.searchParams.set("client_id", clientId);

    url.searchParams.set("response_type", "token");

    url.searchParams.set("redirect_uri", redirectURL);

    url.searchParams.set("scope", scopes);

    window.location.assign(url.toString())
}

const Spotify = {
    initAuth,
    isAuthenticated,
    beginLogin,
    getAccessToken,
    // getAccessToken() {
    //     if (accessToken) return accessToken;

    //     const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
    //     const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

    //     if (tokenInURL && expiryTime) {
    //         accessToken = tokenInURL[1];
    //         const expiresIn = Number(expiryTime[1])

    //         window.setTimeout(() => (accessToken = ""), expiresIn * 1000)
    //         window.history.pushState("Access token", null, "/")
    //         return accessToken
    //     }

    //     const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;

    //     window.location = redirect;
    // },

    async search(term: string, searchType: string) {
        // console.log(accessToken)
        // console.log(clientId)
        // console.log(redirectURL)
        // console.log("Recieved search type: ", searchType)

        // if (!accessToken) {
        //     this.getAccessToken();
        // }

        const query = encodeURIComponent(term)

        let apiSearchType;

        switch (searchType) {
            case "track":
                apiSearchType = "track";
                break;
            case "artist":
                apiSearchType = "artist";
                break;
            case "album":
                apiSearchType = "album";
                break;
            default:
                apiSearchType = "artist,album,track";
                break;
        }

        const response = await fetch(`${spotifyBaseURL}/v1/search?type=${apiSearchType}&q=${query}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        console.log(apiSearchType)
        const jsonResponse = await response.json();
        console.log(jsonResponse)

        if (!jsonResponse) {
            console.error("Response Error");
        }

        if (apiSearchType.includes("track") && jsonResponse.tracks?.items?.length > 0) {
            return jsonResponse.tracks?.items?.map(({id, name, artists, album, uri}:{id:string, name: string, artists: SpotifyArtist[], album: SpotifyAlbum, uri: string}) => ({
                id: id,
                name: name,
                artist: artists[0].name,
                artistId: artists[0].id,
                album: album.name,
                uri: uri,
                type: 'track',
                image: album.images[0].url
            }));
        } else if (apiSearchType.includes("artist") && jsonResponse.artists?.items?.length > 0) {
            return jsonResponse.artists?.items?.map(({id, name, genres, followers, uri, external_urls, images}:{id: string, name: string, genres: string[], followers: {total: number}, uri: string, external_urls: {spotify: string}, images: SpotifyImage[]}) => ({
                id: id,
                name: name,
                genres: genres,
                followers: followers.total || 0,
                uri: uri,
                external_url: external_urls?.spotify || "",
                type: 'artist',
                image: images[0]?.url || ""
            }))
        } else if (apiSearchType.includes("album") && jsonResponse.albums?.items?.length > 0) {
            return jsonResponse.albums?.items?.map(({id, name, artists, uri, images}:{id: string, name: string, artists: SpotifyArtist[], uri: string, images: SpotifyImage[]}) => ({
                id: id,
                name: name,
                artist: artists[0].name,
                artistId: artists[0].id,
                uri: uri,
                type: 'album',
                image: images[0]?.url,
            }));
        } else {
            console.error("No results found");
            return [];
        }

    },

    async getAlbumTracks(albumId: string) {
        try {
            const albumResponse = await fetch(`${spotifyBaseURL}/v1/albums/${albumId}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            const albumJSON = await albumResponse.json();

            if (!albumJSON) {
                console.error("Error fetching album details");
                return [];
            }

            const albumImage = albumJSON.images?.[0]?.url || "";
            const albumName = albumJSON.name;

            return albumJSON.tracks.items.map(({id, name, artists, uri}:{id: string, name: string, artists: SpotifyArtist[], uri: string}) => ({
                id: id,
                name: name,
                artist: artists[0].name,
                artistId: artists[0].id,
                uri: uri,
                type: 'track',
                image: albumImage,
                album: albumName,
            }));
        } catch (error) {
            console.error("Error fetching album tracks: ", error)
            return [];
        }
    },

    async getArtistAlbums(artistId: string) {
        try {
            const artistResponse = await fetch(`${spotifyBaseURL}/v1/artists/${artistId}/albums`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            const artistJSON = await artistResponse.json();

            if (!artistJSON) {
                console.error("Error fetching artist details");
                return [];
            }

            console.log(artistJSON)

            return artistJSON.items.map(({id, name, artists, uri, images }:{id: string, name: string, artists: SpotifyArtist[], uri: string, images: SpotifyImage[]}) => ({
                id: id,
                name: name,
                artist: artists[0].name,
                artistId: artists[0].id,
                uri: uri,
                type: 'album',
                image: images[0].url,
            }));
        } catch (error) {
            console.error("Error fetching album tracks: ", error)
            return [];
        }
    },

    savePlaylist(name: string, trackURIs: string[]) {
        if (!name || !trackURIs) return;
        const aToken = Spotify.getAccessToken();
        const header = { Authorization: `Bearer ${aToken}` };
        let userId;
        let playlistId;
        return fetch(`https://api.spotify.com/v1/me`, { headers: header })
            .then(response => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: header,
                    method: 'POST',
                    body: JSON.stringify({ name: name }),
                })
                    .then((response) => response.json())
                    .then((jsonResponse) => {
                        playlistId = jsonResponse.id
                        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                            headers: header,
                            method: 'POST',
                            body: JSON.stringify({ uris: trackURIs })
                        })
                    })
            })
    }
}

type SpotifyArtist = {
    id: string;
    name: string;
}

type SpotifyImage = {
    url: string;
    height?: number;
    width?: number;
}

type SpotifyAlbum = {
    name: string;
    images: SpotifyImage[]
}


export { Spotify }
