import { IFields } from '../main-request-result-modal.type'

export const getFieldsToRework = (fields: IFields) => ({
  reason: fields.reason,
  timeLimitInMinutes: fields.timeLimitInMinutes,
  media: fields.media?.map(el => ({
    _id: el._id,
    fileLink: el.fileLink,
    commentByClient: el.commentByClient,
    index: el.index,
  })),
})
