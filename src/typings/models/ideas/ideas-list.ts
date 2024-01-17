import { IIdeaListItem } from './idea-by-id'

export interface IIdeasList {
  count?: number
  rows?: Array<IIdeaListItem>
}
