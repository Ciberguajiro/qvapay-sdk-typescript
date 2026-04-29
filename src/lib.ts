import { get_request } from "./utils";

export function getP2POfferts(){
    return get_request("/p2p")
}