import { type RequestEvent, type RequestEventLoader } from "@builder.io/qwik-city";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

export const encodeInvitationId = (reqEv: RequestEvent | RequestEventLoader, id: number) => {
    const cryptoKey = reqEv.env.get("CRYPTO_KEY");
    const encrypted = AES.encrypt(id.toString(), cryptoKey!).toString();
    return encodeURIComponent(encrypted);
}
export const decodeInvitationId = (reqEv: RequestEvent | RequestEventLoader, id: string) => {
    const cryptoKey = reqEv.env.get("CRYPTO_KEY");
    const bytes = AES.decrypt(decodeURIComponent(id), cryptoKey!)
    const decoded = bytes.toString(Utf8)
    return decoded
}