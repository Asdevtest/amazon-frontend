import { IFields } from '../main-request-result-modal.type'

export const getFieldsAfterRework = (fields: IFields) => ({
  result: fields.result?.trim(),
  publicationLinks: fields.publicationLinks?.filter(link => link.trim().length > 0),
  media: fields.media
    ?.filter(el => el.fileLink)
    .map(el => ({
      _id: el._id,
      fileLink: el.fileLink,
      commentByPerformer: el.commentByPerformer,
      index: el.index,
    })),
})
