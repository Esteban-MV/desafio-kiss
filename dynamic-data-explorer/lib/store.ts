import { create } from "zustand"

interface Filter {
  column: string
  value: string
}

interface Store {
  selectedColumns: string[]
  filters: Filter[]
  data: any[]
  loading: boolean
  error: string | null
  addColumnToGrid: (column: string) => void
  removeColumn: (column: string) => void
  addColumnToFilter: (column: string) => void
  removeFilter: (column: string) => void
  updateFilterValue: (column: string, value: string) => void
  fetchData: () => Promise<void>
}

export const useStore = create<Store>((set, get) => ({
  selectedColumns: [],
  filters: [],
  data: [],
  loading: false,
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
  fetchData: async () => {
    const state = get()
    if (state.selectedColumns.length === 0) {
      set({ data: [], loading: false })
      return
    }

    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          columns: state.selectedColumns,
          filters: state.filters.filter(f => f.value),
        }),
      })

      if (!response.ok) {
        throw new Error('Error fetching data')
      }

      const { data } = await response.json()
      set({ data, loading: false })
    } catch (error) {
      set({ error: 'Error fetching data', loading: false })
    }
  },
}))

