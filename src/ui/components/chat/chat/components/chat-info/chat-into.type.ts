export enum TabValue {
  GROUP_CHAT_USERS = 'GROUP_CHAT_USERS',
  MEDIA = 'MEDIA',
  LINKS = 'LINKS',
  PHOTOS = 'allImages',
  VIDEOS = 'allVideo',
  FILES = 'allFiles',
}

export interface ChatAttachmentsType {
  allFiles: FilesType[]
  allImages: ImagesType[]
  allVideo: VideoType[]
}

export interface ChatFileType {
  file: string
  _id: string
  isVideo?: boolean
}

export interface VideoType {
  video: string[]
  _id: string
}

export interface ImagesType {
  images: string[]
  _id: string
}

export interface FilesType {
  files: string[]
  _id: string
}
