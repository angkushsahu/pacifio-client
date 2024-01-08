import { AxiosError } from "axios";
import { IUser } from ".";

export interface QueryFunctionArgs {
   queryKey: string[];
   signal: AbortSignal;
   meta: Record<string, unknown> | undefined;
}

export interface UseMutationArgs {
   onSuccess: (data: any) => unknown;
   onError: (error: AxiosError) => unknown;
}

export interface ResponseData {
   message: string;
   success: boolean;
   statusCode: number;
}

export interface AuthenticateUser extends ResponseData {
   data: {
      user: IUser;
      token: string;
   };
}
