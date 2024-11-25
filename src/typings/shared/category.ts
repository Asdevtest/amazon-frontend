export interface ICategory {
  _id: string
  title: string
  path: string
  parentId: string
  subCategories: ICategory[]
}
