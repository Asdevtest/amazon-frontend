import { IFields } from '../main-request-result-modal.type'

export const getFieldsToRework = (fields: IFields, timeUntilDeadlineInMinutes: number) => ({
  reason: fields.reason,
  timeLimitInMinutes: fields.timeLimitInMinutes ? fields.timeLimitInMinutes : timeUntilDeadlineInMinutes, // if the client didn't specify a deadline
  media: fields.media?.map(el => ({
    _id: el._id,
    fileLink: el.fileLink,
    commentByClient: el.commentByClient,
    index: el.index,
  })),
})
