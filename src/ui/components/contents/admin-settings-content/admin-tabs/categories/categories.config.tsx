import { TreeDataNode } from 'antd'
import { ReactNode } from 'react'
import { MdDeleteOutline, MdEdit } from 'react-icons/md'

import { CustomButton } from '@components/shared/custom-button'

import { ICategory } from '@typings/models/others/category'

export interface CategoryTreeNode extends TreeDataNode {
  value: string
  title: ReactNode
  children: CategoryTreeNode[]
}

export interface CategoryValues {
  title: string
  id: string
  parentId?: string
}

export const transformDataToTree = (
  data: ICategory[],
  onSelectCategoryToEdit: (category: CategoryValues) => void,
  onRemoveCategory: (id: string) => void,
): CategoryTreeNode[] => {
  const nodes = data.map(item => ({
    key: item._id,
    value: item._id,
    title: (
      <>
        {item.title}
        <span>
          <CustomButton
            ghost
            size="small"
            type="primary"
            icon={<MdEdit size={16} />}
            onClick={() => onSelectCategoryToEdit({ title: item.title, id: item._id, parentId: item._id })}
          />
          <CustomButton
            ghost
            danger
            size="small"
            confirmText="Are you sure you want to delete the category?"
            icon={<MdDeleteOutline size={16} />}
            onClick={() => onRemoveCategory(item._id)}
          />
        </span>
      </>
    ),
    children: transformDataToTree(item.subCategories, onSelectCategoryToEdit, onRemoveCategory),
  }))

  return nodes
}
