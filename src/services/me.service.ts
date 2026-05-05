import type { AxiosInstance } from "axios";
import type { RawUser, User } from "../types.ts";

function mapUser(raw: RawUser): User {
  return {
    uuid: raw.uuid,
    name: raw.name,
    username: raw.username,
    email: raw.email,
    photo: raw.photo,
    balance: raw.balance,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

export class MeService {
  constructor(private readonly http: AxiosInstance) {}

  async getProfile(): Promise<User> {
    const { data } = await this.http.get<RawUser>("/me");
    return mapUser(data);
  }
}
