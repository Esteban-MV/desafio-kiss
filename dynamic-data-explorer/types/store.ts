export interface Filter {
  column: string
  value: string
}

export interface StoreState {
  selectedColumns: string[]
  filters: Filter[]
  data: Record<string, any>[]
  loading: boolean
  error: string | null
}

export interface StoreActions {
  addColumnToGrid: (column: string) => void
  removeColumn: (column: string) => void
  addColumnToFilter: (column: string) => void
  removeFilter: (column: string) => void
  updateFilterValue: (column: string, value: string) => void
  fetchData: () => Promise<void>
}

export type Store = StoreState & StoreActions

