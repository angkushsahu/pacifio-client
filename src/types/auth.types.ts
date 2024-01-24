import type { UserType } from "@root/validations";

export interface UserSession {
   user: UserType;
   token: string;
}
