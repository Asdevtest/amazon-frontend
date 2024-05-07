import { ITagList } from '@typings/models/generals/tag-list'

export type IHandleUpdateRow = (rowsToUpdate: handleUpdateRowParams[]) => void

interface handleUpdateRowParams {
  _id: string
  tags: ITagList[]
}
