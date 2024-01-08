import type { IUser } from "@root/validations";
export type { IUser } from "@root/validations";

export interface UserSession {
   user: IUser;
   token: string;
}
