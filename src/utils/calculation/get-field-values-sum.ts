/* eslint-disable @typescript-eslint/no-explicit-any */

export const getFieldValuesSum = (items: any[], fieldName: string): number => {
  return items.reduce((sum: number, item: any) => sum + item[fieldName], 0)
}
