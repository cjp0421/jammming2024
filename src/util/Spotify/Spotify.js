let accessToken;

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectURL = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
// const redirectURL = `http://localhost:5173`

const spotifyBaseURL = `https://api.spotify.com`;
const searchType = `artist,album,track`

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

    async search(term) {
        console.log(accessToken)
        console.log(clientId)
        console.log(redirectURL)
        if (!accessToken) {
            this.getAccessToken();
        }
        const response = await fetch(`${spotifyBaseURL}/v1/search?type=${searchType}&q=${term}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        if (!jsonResponse) {
            console.error("Response Error");
        }
        return jsonResponse.tracks.items.map(t => ({
            id: t.id,
            name: t.name,
            artist: t.artists[0].name,
            album: t.album.name,
            uri: t.uri,
        }));
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
