let accessToken;

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// const redirectURL = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const redirectURL = `http://localhost:5173`

const spotifyBaseURL = `https://api.spotify.com`;

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURL && expiryTime) {
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1])

            window.setTimeout(() => (accessToken = ""), expiresIn * 1000)
            window.history.pushState("Access token", null, "/")
            return accessToken
        }

        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;

        window.location = redirect;
    },

    async search(term, searchType) {
        // console.log(accessToken)
        // console.log(clientId)
        // console.log(redirectURL)
        console.log("Recieved search type: ", searchType)

        if (!accessToken) {
            this.getAccessToken();
        }

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
            return jsonResponse.tracks?.items?.map(t => ({
                id: t.id,
                name: t.name,
                artist: t.artists[0].name,
                album: t.album.name,
                uri: t.uri,
                type: 'track',
                image: t.album.images[2].url
            }));
        } else if (apiSearchType.includes("artist") && jsonResponse.artists?.items?.length > 0) {
            return jsonResponse.artists?.items?.map(a => ({
                id: a.id,
                name: a.name,
                genre: a.grenres?.[0] || "Unknown",
                followers: a.followers.total || 0,
                uri: a.uri,
                external_url: a.external_urls?.spotify || "",
                type: 'artist',
                image: a.images[0]?.url || ""
            }))
        } else if (apiSearchType.includes("album") && jsonResponse.albums?.items?.length > 0) {
            return jsonResponse.albums?.items?.map(al => ({
                id: al.id,
                name: al.name,
                artist: al.artists[0].name,
                uri: al.uri,
                type: 'album',
                image: al.images[0]?.url,
            }));
        } else {
            console.error("No results found");
            return [];
        }

    },

    savePlaylist(name, trackURIs) {
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

export { Spotify }
