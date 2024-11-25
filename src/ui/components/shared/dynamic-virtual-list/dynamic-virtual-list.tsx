import { Empty } from 'antd'
import { CSSProperties, HTMLAttributes, ReactNode, forwardRef } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'

interface DynamicVirtualListProps<T> {
  data: T[]
  itemContent: (props: { item: T }) => ReactNode
  onScrollEnd: () => void
  listStyles?: CSSProperties
  listClassName?: string
}

export const DynamicVirtualList = <T,>(props: DynamicVirtualListProps<T>) => {
  const { data, itemContent, onScrollEnd, listStyles, listClassName } = props

  return (
    <>
      {data?.length ? (
        <VirtuosoGrid
          data={data}
          totalCount={data.length}
          components={{
            List: forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
              ({ style, children, ...restListProps }, ref) => (
                <div
                  {...restListProps}
                  ref={ref}
                  style={{
                    ...listStyles,
                    ...style,
                  }}
                  className={listClassName}
                >
                  {children}
                </div>
              ),
            ),
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
