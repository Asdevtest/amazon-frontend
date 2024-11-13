import { TreeDataNode } from 'antd'
import { Key, ReactNode } from 'react'
import { MdDeleteOutline, MdEdit } from 'react-icons/md'

import { CustomButton } from '@components/shared/custom-button'

import { ICategory } from '@typings/models/others/category'
import { NullString } from '@typings/types/nullable-types'

export interface CategoryTreeNode extends TreeDataNode {
  key: string
  value: string
  title: ReactNode
  children: CategoryTreeNode[]
}

export interface CategoryValues {
  title: string
  id: string
  parentId?: NullString
}

/**
 * Transforms a flat list of categories into a tree structure suitable for rendering with a tree component.
 *
 * @param data - The list of categories to transform, each containing an id, title, and optional parentId.
 * @param onSelectCategoryToEdit - Callback function invoked with a category's values when the edit button is clicked.
 * @param onRemoveCategory - Callback function invoked with a category id when the remove button is clicked.
 * @returns An array of CategoryTreeNode objects representing the hierarchical structure of categories.
 */
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
            onClick={() => onSelectCategoryToEdit({ title: item.title, id: item._id, parentId: item.parentId })}
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

/**
 * Search for keys in the tree by value. If the value is found in the node's title, the key is added to the result array.
 * @param tree - the tree to search in
 * @param value - the value to search for
 * @returns an array of keys where the value is found
 */
export const findTreeKeys = (tree: CategoryTreeNode[], value: string): Key[] => {
  const keys: Key[] = []

  const searchTree = (nodes: CategoryTreeNode[]) => {
    for (const item of nodes) {
      // @ts-ignore
      const childText = item.title?.props?.children?.[0]

      if (childText.includes(value)) {
        keys.push(item.key)
      }

      if (item.children) {
        searchTree(item.children)
      }
    }
  }
  searchTree(tree)

  return keys
}

/**
 * Filters and highlights nodes in a tree structure based on a search value.
 *
 * This function traverses a tree of nodes, searching for a specific value within each node's title.
 * If the value is found, it highlights the matching part of the title and retains the node in the result.
 * Nodes with matching children are also retained, even if the node itself does not match the search value.
 *
 * @param data - An array of TreeDataNode objects representing the tree structure to filter.
 * @param searchValue - The string value to search for and highlight within each node's title.
 * @returns A new array of TreeDataNode objects, each with the search value highlighted, representing the filtered tree.
 */
export const filterTreeNodesWithHighlight = (data: TreeDataNode[], searchValue: string): TreeDataNode[] =>
  data.flatMap(item => {
    // @ts-ignore
    const strTitle = item.title?.props?.children?.[0]
    // @ts-ignore
    const buttons = item.title?.props?.children?.[1]

    const index = strTitle.indexOf(searchValue)
    const beforeStr = strTitle.substring(0, index)
    const afterStr = strTitle.slice(index + searchValue.length)
    const title =
      index > -1 ? (
        <>
          <span>
            {beforeStr}
            <span className="highlight-text">{searchValue}</span>
            {afterStr}
          </span>
          {buttons}
        </>
      ) : (
        item.title
      )

    const children = item.children ? filterTreeNodesWithHighlight(item.children, searchValue) : undefined

    if (index > -1 || (children && children.length > 0)) {
      return [
        {
          ...item,
          title,
          children,
        },
      ]
    }

    return []
  })
