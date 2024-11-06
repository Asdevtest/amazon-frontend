import { TreeDataNode } from 'antd'
import { TreeProps } from 'antd/lib'
import { makeAutoObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { OtherModel } from '@models/other-model'

import { t } from '@utils/translations'

import { ICategory } from '@typings/models/others/category'

export class AdminSettingsCategoriesModel {
  categories: TreeDataNode[] = []
  title: string = ''

  constructor() {
    this.getCategories()
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.title = e.target.value
  }

  async getCategories() {
    try {
      const response = (await OtherModel.getCategories()) as unknown as ICategory[]

      runInAction(() => {
        this.categories = this.transformDataToTree(response)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onCreateCategory(title: string) {
    try {
      await AdministratorModel.addCategory({ title })
      toast.success(t(TranslationKey['Category successfully saved']))
      this.getCategories()
    } catch (error) {
      toast.error(t(TranslationKey['Category is not saved']))
    }
  }

  async onEditCategory(id: string, title: string) {
    try {
      await AdministratorModel.editCategory(id, { title })
      toast.success(t(TranslationKey['Category successfully saved']))
      this.getCategories()
    } catch (error) {
      toast.error(t(TranslationKey['Category is not saved']))
    }
  }

  async onRemoveCategory(id: string) {
    try {
      await AdministratorModel.removeCategory(id)
      this.getCategories()
    } catch (error) {
      console.error(error)
    }
  }

  transformDataToTree(data: ICategory[]): TreeDataNode[] {
    return data.map(item => {
      const transformedNode: TreeDataNode = {
        key: item._id,
        title: item.title,
        children: item.subCategories ? this.transformDataToTree(item.subCategories) : undefined,
      }

      return transformedNode
    })
  }

  onDrop: TreeProps['onDrop'] = info => {
    const dropKey = info.node.key
    const dragKey = info.dragNode.key
    const dropPos = info.node.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (
      data: TreeDataNode[],
      key: React.Key,
      callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void,
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
    let dragObj: TreeDataNode

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
      let ar: TreeDataNode[] = []
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
