export interface IPostAccessToken {
  refreshToken: string
}

export interface IGetAccessToken {
  data: { accessToken: string }
}

export interface AxiosErrorData {
  statusCode: number
  error: string
  message: string
}
