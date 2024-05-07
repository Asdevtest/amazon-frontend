/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DefaultModelParams {
  getMainDataMethod: (...args: any) => any
  defaultGetCurrentDataOptions?: { [key: string]: any }
}
