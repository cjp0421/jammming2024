import { generatePkcePair } from "../pkce";

let accessToken: string | null = null;

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";


const redirectURL = isLocal
    ? import.meta.env.VITE_SPOTIFY_DEV_REDIRECT_URI
    : import.meta.env.VITE_SPOTIFY_PROD_REDIRECT_URI;

const spotifyBaseURL = `https://api.spotify.com`;

async function handleRedirectCallback(): Promise<boolean> {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) return false;

    const verifier = localStorage.getItem('pkce_verifier');
    if (!verifier) {
        console.error("Missing PKCE code verifier");
        return false;
    }

    try {
        const body = new URLSearchParams({
            client_id: clientId,
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectURL,
            code_verifier: verifier
        });

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body
        })

        const tokenData = await response.json();

        if (tokenData.error) {
            console.error("Token exchange failed:", tokenData);
            return false;
        }

        accessToken = tokenData.access_token;
        sessionStorage.setItem("spotify_access_token", accessToken ?? "");

        const expiryMs = Date.now() + tokenData.expires_in * 1000;
        sessionStorage.setItem("spotify_access_expiry", String(expiryMs));

        if (tokenData.refresh_token) {
            sessionStorage.setItem("spotify_refresh_token", tokenData.refresh_token);
        }

        window.history.replaceState({}, document.title, "/");
        return true;
    } catch (err) {
        console.error("PKCE redirect handler failed:", err);
        return false;
    }
}

async function initAuth(): Promise<void> {
    const handled = await handleRedirectCallback();

    if (handled && accessToken) return;

    const stored = sessionStorage.getItem("spotify_access_token") || null;
    if (stored) accessToken = stored;
}

async function getAccessToken() {
    if (accessToken) {
        const expiryString = sessionStorage.getItem("spotify_access_expiry");
        if (!expiryString) return null;

        const expiry = Number(expiryString);
        if (Date.now() < expiry) {
            return accessToken;
        }
    }

    const refreshToken = sessionStorage.getItem("spotify_refresh_token");
    if (!refreshToken) {
        console.warn("No refresh token available.");
        return null;
    }

    console.log("Refreshing Spotify token...");

    const body = new URLSearchParams({
        client_id: clientId,
        grant_type: "refresh_token",
        refresh_token: refreshToken
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body
    });

    const tokenData = await response.json();

    if (tokenData.error) {
        console.error("Refresh failed:", tokenData);
        return null;
    }

    accessToken = tokenData.access_token;
    sessionStorage.setItem("spotify_access_token", accessToken ?? "")

    const expiryMs = Date.now() + tokenData.expires_in * 1000;
    sessionStorage.setItem("spotify_access_expiry", String(expiryMs));

    if (tokenData.refresh_token) {
        sessionStorage.setItem("spotify_refresh_token", tokenData.refresh_token ?? "");
    }

    return accessToken;
}

function isAuthenticated() {
    return !!accessToken;
}

async function beginLogin(scopes: string = "playlist-modify-public") {
    sessionStorage.setItem(
        "post_login_redirect",
        window.location.pathname + window.location.search
    );

    const { verifier, challenge } = await generatePkcePair();

    localStorage.setItem("pkce_verifier", verifier);

    const authParams = new URLSearchParams({
        client_id: clientId,
        response_type: "code",
        redirect_uri: redirectURL,
        code_challenge_method: "S256",
        code_challenge: challenge,
        scope: scopes
    });

    window.location.assign(
        `https://accounts.spotify.com/authorize?${authParams.toString()}`
    )
}

const Spotify = {
    initAuth,
    isAuthenticated,
    beginLogin,
    getAccessToken,

    async search(term: string, searchType: string) {

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

        const token = await Spotify.getAccessToken();

        if (!token) {
            console.error("No access token available for search");
            return [];
        }


        // const response = await fetch(`${spotifyBaseURL}/v1/search?type=${apiSearchType}&q=${query}`, {
        //     method: 'GET',
        //     headers: { Authorization: `Bearer ${accessToken}` }
        // });

        const response = await fetch(
            `${spotifyBaseURL}/v1/search?type=${apiSearchType}&q=${query}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        // console.log(apiSearchType)
        const jsonResponse = await response.json();
        // console.log(jsonResponse)

        if (jsonResponse.error) {
            console.error("Spotify API error:", jsonResponse.error);
            return [];
        }

        if (apiSearchType.includes("track") && jsonResponse.tracks?.items?.length > 0) {
            return jsonResponse.tracks?.items?.map(({ id, name, artists, album, uri }: { id: string, name: string, artists: SpotifyArtist[], album: SpotifyAlbum, uri: string }) => ({
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
            return jsonResponse.artists?.items?.map(({ id, name, genres, followers, uri, external_urls, images }: { id: string, name: string, genres: string[], followers: { total: number }, uri: string, external_urls: { spotify: string }, images: SpotifyImage[] }) => ({
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
            return jsonResponse.albums?.items?.map(({ id, name, artists, uri, images }: { id: string, name: string, artists: SpotifyArtist[], uri: string, images: SpotifyImage[] }) => ({
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

            return albumJSON.tracks.items.map(({ id, name, artists, uri }: { id: string, name: string, artists: SpotifyArtist[], uri: string }) => ({
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

            return artistJSON.items.map(({ id, name, artists, uri, images }: { id: string, name: string, artists: SpotifyArtist[], uri: string, images: SpotifyImage[] }) => ({
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

    async savePlaylist(name: string, trackURIs: string[]) {
        if (!name || !trackURIs) return;
        const aToken = await Spotify.getAccessToken();
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
