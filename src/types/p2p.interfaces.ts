export interface P2PServiceInterface {
  get_p2ps(): GetP2PResponse;
  create_p2p(props: CreateP2PRequest): CreateP2PResponse;
  apply_p2p(uuid: string): GetP2PResponse;
}

/// Respuesta de la lista p2p
export type GetP2PResponse = {
  offers: P2P[];
};

/// p2p
export type P2P = {
  uuid: string;
  type_1: string;
  coin: string;
  amount: number;
  receive: number;
  status: string;
  only_kyc: number;
  only_vip: number;
  private: number;
  message: string;
  created_at: string;
  updated_at: string;
  User: UserP2P;
  Coin: CoinP2P;
};

export type UserP2P = {
  uuid: string;
  username: string;
  name: string;
  image: string;
  kyc: boolean;
  vip: boolean;
  golden_check: boolean;
};

/// Moneda del p2p
export type CoinP2P = {
  tic: string;
  name: string;
  logo: string;
};

export type CreateP2PRequest = {
  //	Tipo de oferta: buy o sell
  type_1: string;
  // | number	Tick de la moneda (ej: BANK_CUP) o ID numérico
  coin: string;
  //	Cantidad en QUSD (0.1 - 100,000)
  amount: number;
  //	Cantidad a recibir en la moneda seleccionada (0.1 - 1,000,000)
  receive: number;
  //	Datos de pago según los campos de la moneda (ej: cuenta bancaria)
  details: DetailsP2PRequest[];
  //		1 para restringir a usuarios con KYC verificado
  only_kyc: number;
  //		1 para restringir a usuarios VIP
  only_vip: number;
  //		1 para crear oferta privada (no se ica en Telegram)
  private: number;
  //	Mensaje público de la oferta (máx. 79 caracteres, URLs eliminadas)
  message: string;
  //	URL de webhook para notificaciones de estado
  webhook: string;
  //	Etiquetas para la oferta (máx. 10 tags)
  tags: string[];
};

export type CreateP2PResponse = {
  //	Tipo de oferta: buy o sell
  msg: string;
  p2p: P2P;
};

export type DetailsP2PRequest = {
  name: string;
  value: string;
};
