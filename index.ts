import { getP2POfferts } from "./src/lib"


class Main {
    private main_url = "/"

    get_offers_p2p(){
        return getP2POfferts()
    }
}

export const main = new Main()