import { TreeProps } from 'antd/lib'
import { makeAutoObservable, runInAction } from 'mobx'
import { ChangeEvent, Key } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { OtherModel } from '@models/other-model'

import { t } from '@utils/translations'

import { ICategory } from '@typings/models/others/category'
import { NullString } from '@typings/types/nullable-types'

import {
  CategoryTreeNode,
  CategoryValues,
  filterTreeNodesWithHighlight,
  findTreeKeys,
  transformDataToTree,
} from './categories.config'

export class CategoriesModel {
  categoriesNodes: CategoryTreeNode[] = []
  categoryToEdit?: CategoryValues
  title: string = ''
  showCategoryModal = false
  expandedKeys: Key[] = []
  searchValue: string = ''
  autoExpandParent: boolean = true

  get categories() {
    return filterTreeNodesWithHighlight(this.categoriesNodes, this.searchValue)
  }

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

  onCloseCategoryModal() {
    this.categoryToEdit = undefined
    this.onToggleCategoryModal()
  }

  onExpand(newExpandedKeys: Key[]) {
    this.expandedKeys = newExpandedKeys
    this.autoExpandParent = false
  }

  onChangeInputSearch(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    const newExpandedKeys = value ? findTreeKeys(this.categoriesNodes, value) : []
    this.expandedKeys = newExpandedKeys
    this.searchValue = value
    this.autoExpandParent = true
  }

  async getCategories() {
    try {
      const response = (await OtherModel.getCategories()) as unknown as ICategory[]

      runInAction(() => {
        this.categoriesNodes = transformDataToTree(response, this.onSelectCategoryToEdit, this.onRemoveCategory)
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

  async onEditCategory({ title, id, parentId }: CategoryValues, toggleModal?: boolean) {
    try {
      const data = {
        title,
        parentId: id === parentId ? undefined : parentId,
      }
      await AdministratorModel.editCategory(id, data)
      toast.success(t(TranslationKey['Category successfully saved']))
    } catch (error) {
      toast.error(t(TranslationKey['Category is not saved']))
    } finally {
      runInAction(() => {
        this.categoryToEdit = undefined
      })
      toggleModal && this.onToggleCategoryModal()
      this.getCategories()
    }
  }

  onSubmitCategoryModal(category: CategoryValues) {
    this.categoryToEdit ? this.onEditCategory(category, true) : this.onCreateCategory(category)
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
    const dropDragPos = info.dragNode.pos.split('-')
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
          loop(data[i].children, key, callback)
        }
      }
    }
    const data = [...this.categoriesNodes]
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
      this.categoriesNodes = data
    })

    const isTopLevel = dropPos.length === 2 && info.dropToGap && (dropDragPos.length === 2 || dropDragPos.length === 3)
    // @ts-ignore
    const title = info.dragNode.title?.props?.children?.[0]?.props?.children?.[2] // from a custom node (since we're using not a listItem, but a listItem with buttons)

    this.onEditCategory(
      {
        id: dragKey as string,
        parentId: (isTopLevel ? null : dropKey) as NullString,
        title,
      },
      false,
    )
  }
}
