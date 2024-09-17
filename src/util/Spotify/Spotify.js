let accessToken;

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
    }
}

export { Spotify }
