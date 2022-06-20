import { IError } from "@/api/errors/IError";

export class GenericError extends Error implements IError {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
