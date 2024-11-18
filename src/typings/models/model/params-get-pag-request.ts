export interface ParamsGetPagRequest {
  filters?: string
  limit?: number
  offset?: number
  sortField?: string
  sortType?: 'ASC' | 'DESC'
  noCache?: boolean
  acceptEncoding?: string
}
