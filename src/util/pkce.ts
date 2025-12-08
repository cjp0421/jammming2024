// Base64URL encode utility (no +, /, or =)
function base64UrlEncode(buffer: ArrayBuffer | Uint8Array): string {
    const byteArray = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < byteArray.length; i++) {
        binary += String.fromCharCode(byteArray[i]);
    }
    // Standard base64
    const base64 = btoa(binary);
    // Convert to base64url
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}


// Generate a random code_verifier string (43–128 chars)
export function generateCodeVerifier(length = 64): string {
    const allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);

    let verifier = "";
    for (let i = 0; i < randomValues.length; i++) {
        verifier += allowed[randomValues[i] % allowed.length];
    }
    return verifier;
}

// Turn the verifier into a code_challenge using SHA-256
export async function generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return base64UrlEncode(digest);
}

// Convenience helper to get both at once
export async function generatePkcePair(): Promise<{ verifier: string; challenge: string }> {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    return { verifier, challenge };
}