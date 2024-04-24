import { IFields } from '../main-request-result-modal.type'

export const getFieldsAfterRework = (fields: IFields) => ({
  result: fields.result,
  publicationLinks: fields.publicationLinks,
  media: fields.media?.map(el => ({
    _id: el._id,
    fileLink: el.fileLink,
    commentByPerformer: el.commentByPerformer,
    index: el.index,
  })),
})
