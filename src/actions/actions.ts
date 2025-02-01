import CryptoJS from 'crypto-js';

export const generateSignature = (apiKey: string, uploadPreset: string, timestamp: number) => {
    const apiSecret = "1i3hCIL8oUgEhH7RXv6VeyuKWpM"; // Your Cloudinary API Secret
    const stringToSign = `timestamp=${timestamp}&upload_preset=${uploadPreset}`;
    console.log(stringToSign)
    // Generate HMAC-SHA1 signature in HEX format (NOT Base64)
    const signature = CryptoJS.HmacSHA1(stringToSign, apiSecret).toString(CryptoJS.enc.Hex);
    console.log(signature)
    return signature;
};
