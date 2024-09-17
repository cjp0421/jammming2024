let accessToken;

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectURI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

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

        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
}

export { Spotify }
