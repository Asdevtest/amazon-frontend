import { Empty } from 'antd'
import { PropsWithChildren, ReactNode } from 'react'
import { Virtuoso } from 'react-virtuoso'

interface InfiniteScrollProps<T> extends PropsWithChildren {
  data: T[]
  itemContent: (props: { item: T }) => ReactNode
  onScrollEnd: () => void
  className?: string
}

export const InfiniteScroll = <T,>(props: InfiniteScrollProps<T>) => {
  const { data, itemContent, onScrollEnd, className, children } = props

  return (
    <>
      {data?.length ? (
        <Virtuoso
          totalCount={data.length}
          data={data}
          className={className}
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
      {children}
    </>
  )
}
