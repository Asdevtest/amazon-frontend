export interface IChatMedia {
  allImages?: Array<IImages>

  allFiles?: Array<IFiles>
}

export interface IImages {
  _id?: string
  images?: Array<string>
}

export interface IFiles {
  _id?: string
  files?: Array<string>
}
