import type { CreateP2PRequest, CreateP2PResponse, GetP2PResponse, P2PServiceInterface } from "../types/p2p.interfaces";

class P2PService implements P2PServiceInterface {
  get_p2ps(): GetP2PResponse {
    throw new Error("Method not implemented.");
  }
  create_p2p(props: CreateP2PRequest): CreateP2PResponse {
    throw new Error("Method not implemented.");
  }
  apply_p2p(uuid: string): GetP2PResponse {
    throw new Error("Method not implemented.");
  }
}
