import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { IShortUser } from '@typings/master-user'
import { IUploadFile } from '@typings/upload-file'

export class SendMessageRequestParamsContract {
  @IsNotEmpty()
  @IsString()
  public chatId!: string
  @IsOptional()
  @IsString()
  public text!: string
  @IsOptional()
  @IsString({ each: true })
  public images?: string[]
  @IsOptional()
  // @IsString({each: true})
  public files?: IUploadFile[]
  @IsOptional()
  @IsBoolean()
  public is_draft?: boolean

  @IsOptional()
  public replyMessageId?: string | null

  @IsOptional()
  public user?: Omit<IShortUser, 'rating'>

  @IsOptional()
  @IsString()
  public crmItemId?: string
}
