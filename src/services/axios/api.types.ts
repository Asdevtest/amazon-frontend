export interface IPostAccessToken {
  refreshToken: string
}

export interface IGetAccessToken {
  data: { accessToken: string }
}
