import { create } from "zustand"

interface Filter {
  column: string
  value: string
}

interface Store {
  selectedColumns: string[]
  filters: Filter[]
  data: any[]
  isLoading: boolean
  error: string | null
  addColumnToGrid: (column: string) => void
  removeColumn: (column: string) => void
  addColumnToFilter: (column: string) => void
  removeFilter: (column: string) => void
  updateFilterValue: (column: string, value: string) => void
  setData: (data: any[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useStore = create<Store>((set) => ({
  selectedColumns: [],
  filters: [],
  data: [],
  isLoading: false,
  error: null,
  addColumnToGrid: (column) =>
    set((state) => ({
      selectedColumns: [...new Set([...state.selectedColumns, column])],
    })),
  removeColumn: (column) =>
    set((state) => ({
      selectedColumns: state.selectedColumns.filter((c) => c !== column),
    })),
  addColumnToFilter: (column) =>
    set((state) => ({
      filters: [...state.filters, { column, value: "" }],
    })),
  removeFilter: (column) =>
    set((state) => ({
      filters: state.filters.filter((f) => f.column !== column),
    })),
  updateFilterValue: (column, value) =>
    set((state) => ({
      filters: state.filters.map((f) =>
        f.column === column ? { ...f, value } : f
      ),
    })),
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}))

