import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { ICreatedBy } from '@typings/shared/created-by'
import { UploadFileType } from '@typings/shared/upload-file'

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
  public files?: UploadFileType[]
  @IsOptional()
  @IsBoolean()
  public is_draft?: boolean

  @IsOptional()
  public replyMessageId?: string | null

  @IsOptional()
  public user?: Omit<ICreatedBy, 'rating'>

  @IsOptional()
  @IsString()
  public crmItemId?: string
}
