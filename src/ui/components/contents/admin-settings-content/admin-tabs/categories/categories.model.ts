import { TreeProps } from 'antd/lib'
import { makeAutoObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { OtherModel } from '@models/other-model'

import { t } from '@utils/translations'

import { ICategory } from '@typings/models/others/category'

import { CategoryTreeNode, CategoryValues, transformDataToTree } from './categories.config'

export class CategoriesModel {
  categories: CategoryTreeNode[] = []
  categoryToEdit?: CategoryValues
  title: string = ''
  showCategoryModal = false

  constructor() {
    this.getCategories()
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.title = e.target.value
  }

  onToggleCategoryModal() {
    this.showCategoryModal = !this.showCategoryModal
  }

  async getCategories() {
    try {
      const response = (await OtherModel.getCategories()) as unknown as ICategory[]

      runInAction(() => {
        this.categories = transformDataToTree(response, this.onSelectCategoryToEdit, this.onRemoveCategory)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onCreateCategory({ title, parentId }: CategoryValues) {
    try {
      await AdministratorModel.addCategory({ title, parentId })
      toast.success(t(TranslationKey['Category successfully saved']))
    } catch (error) {
      toast.error(t(TranslationKey['Category is not saved']))
    } finally {
      this.onToggleCategoryModal()
      this.getCategories()
    }
  }

  onSelectCategoryToEdit(category: CategoryValues) {
    this.categoryToEdit = category
    this.onToggleCategoryModal()
  }

  async onEditCategory({ title, id, parentId }: CategoryValues) {
    try {
      await AdministratorModel.editCategory(id, { title, parentId })
      toast.success(t(TranslationKey['Category successfully saved']))
    } catch (error) {
      toast.error(t(TranslationKey['Category is not saved']))
    } finally {
      runInAction(() => {
        this.categoryToEdit = undefined
      })
      this.onToggleCategoryModal()
      this.getCategories()
    }
  }

  onSubmitCategoryModal(category: CategoryValues) {
    this.categoryToEdit ? this.onEditCategory(category) : this.onCreateCategory(category)
  }

  async onRemoveCategory(id: string) {
    try {
      await AdministratorModel.removeCategory(id)
      this.getCategories()
    } catch (error) {
      console.error(error)
    }
  }

  onDrop: TreeProps['onDrop'] = info => {
    const dropKey = info.node.key
    const dragKey = info.dragNode.key
    const dropPos = info.node.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (
      data: CategoryTreeNode[],
      key: React.Key,
      callback: (node: CategoryTreeNode, i: number, data: CategoryTreeNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data)
        }

        if (data[i].children) {
          loop(data[i].children!, key, callback)
        }
      }
    }
    const data = [...this.categories]
    let dragObj: CategoryTreeNode

    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!info.dropToGap) {
      loop(data, dropKey, item => {
        item.children = item.children || []
        item.children.unshift(dragObj)
      })
    } else {
      let ar: CategoryTreeNode[] = []
      let i: number

      loop(data, dropKey, (_item, index, arr) => {
        ar = arr
        i = index
      })

      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!)
      } else {
        ar.splice(i! + 1, 0, dragObj!)
      }
    }

    runInAction(() => {
      this.categories = data
    })
  }

  onDragEnter: TreeProps['onDragEnter'] = info => {
    console.log(info)
  }
}
