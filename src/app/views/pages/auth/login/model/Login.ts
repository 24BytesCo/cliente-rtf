export interface RespuestaLogin {
  error: boolean;
  status: BigInteger;
  body: any;
}

export interface RespuestaGeneral<T> {
  error: boolean;
  status: BigInteger;
  body: T;
}
