import { Checkbox, Empty } from 'antd'
import { CheckboxGroupProps } from 'antd/es/checkbox'
import { ReactNode, forwardRef } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'

import { CustomCheckbox } from '../custom-checkbox'

interface DynamicVirtualListProps<T> {
  data: T[]
  itemContent: (props: { item: T }) => ReactNode
  onScrollEnd: () => void
  listClassName?: string
  checkboxes?: boolean
  onChangeCheckbox?: (values: string[]) => void
}

export const DynamicVirtualList = <T,>(props: DynamicVirtualListProps<T>) => {
  const { data, itemContent, onScrollEnd, listClassName, checkboxes, onChangeCheckbox } = props

  return (
    <>
      {data?.length ? (
        <VirtuosoGrid
          data={data}
          totalCount={data.length}
          components={{
            List: forwardRef<HTMLDivElement, CheckboxGroupProps>(({ children, ...listProps }, ref) => (
              <Checkbox.Group {...listProps} ref={ref} className={listClassName} onChange={onChangeCheckbox}>
                {children}
              </Checkbox.Group>
            )),
            Item: ({ children, ...itemProps }) => {
              // @ts-ignore
              const itemId = children?.props?.product?._id

              return (
                <div style={{ position: 'relative' }} {...itemProps}>
                  {children}
                  {checkboxes ? (
                    <CustomCheckbox value={itemId} style={{ position: 'absolute', top: 10, right: 10 }} />
                  ) : null}
                </div>
              )
            },
          }}
          itemContent={(_, item) => itemContent({ item })}
          endReached={onScrollEnd}
        />
      ) : (
        <Empty
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        />
      )}
    </>
  )
}
