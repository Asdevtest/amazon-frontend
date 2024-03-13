/* eslint-disable @typescript-eslint/no-explicit-any */
import { IItem } from '@hooks/use-select'

export const getSelectData = (columnModel: any[]): IItem[] =>
  columnModel?.reduce((acc, el) => {
    if (!el?.disableCustomSort) {
      acc.push({
        name: el.headerName(),
        _id: el.field,
      })
    }

    return acc
  }, [])
