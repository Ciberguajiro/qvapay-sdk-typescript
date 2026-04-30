import type { P2PServiceInterface } from "../types/p2p.interfaces";

class P2PService implements P2PServiceInterface {
  get_p2ps(): string {
    throw new Error("Method not implemented.");
  }
  create_p2p(): string {
    throw new Error("Method not implemented.");
  }
  apply_p2p(): string {
    throw new Error("Method not implemented.");
  }
}
