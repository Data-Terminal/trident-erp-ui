import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"
import type { ProductionOrder } from "@/types/production"

interface ProgressHistoryEntry {
  timestamp: string
  units: number
  totalUnits: number
  progressPercentage: number
}

interface ProductionData {
  sku: string
  pendingOrders: number
  inProduction: number
  availableStock: number
  deficit: number
  status: "deficit" | "sufficient"
}

interface ProductionStore {
  productionData: ProductionData[]
  productionOrders: ProductionOrder[]
  progressHistory: Record<string, ProgressHistoryEntry[]>
  selectedSku: string | null
  selectedDeficit: number | null

  setSelectedSku: (sku: string | null) => void
  setSelectedDeficit: (deficit: number | null) => void
  createProductionOrder: (order: Omit<ProductionOrder, "id" | "startDate" | "progress">) => void
  updateOrderProgress: (orderId: string, progress: number) => void
  updateOrderStatus: (orderId: string, status: string, progress: number) => void
  getOrderById: (orderId: string) => ProductionOrder | undefined
  getProgressHistory: (orderId: string) => ProgressHistoryEntry[]
}

export const useProductionStore = create<ProductionStore>((set, get) => ({
  productionData: [
    {
      sku: "500ml",
      pendingOrders: 4000,
      inProduction: 2000,
      availableStock: 500,
      deficit: 1500,
      status: "deficit",
    },
    {
      sku: "750ml",
      pendingOrders: 2500,
      inProduction: 1500,
      availableStock: 1200,
      deficit: 0,
      status: "sufficient",
    },
    {
      sku: "1000ml",
      pendingOrders: 3000,
      inProduction: 1000,
      availableStock: 200,
      deficit: 1800,
      status: "deficit",
    },
    {
      sku: "2000ml",
      pendingOrders: 1500,
      inProduction: 500,
      availableStock: 1000,
      deficit: 0,
      status: "sufficient",
    },
    {
      sku: "Custom-A",
      pendingOrders: 800,
      inProduction: 0,
      availableStock: 0,
      deficit: 800,
      status: "deficit",
    },
  ],
  productionOrders: [
    {
      id: "prod-1",
      sku: "500ml",
      quantity: 1500,
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      assignedTo: "John D.",
      progress: 50,
    },
    {
      id: "prod-2",
      sku: "Custom-A",
      quantity: 800,
      startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      assignedTo: "Sarah M.",
      progress: 0,
    },
    {
      id: "prod-3",
      sku: "1000ml",
      quantity: 1000,
      startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      assignedTo: "Mike T.",
      progress: 70,
    },
    {
      id: "prod-4",
      sku: "750ml",
      quantity: 1200,
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      assignedTo: "Lisa R.",
      progress: 100,
    },
  ],
  progressHistory: {
    "prod-1": [
      {
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        units: 0,
        totalUnits: 1500,
        progressPercentage: 0,
      },
      {
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        units: 300,
        totalUnits: 1500,
        progressPercentage: 20,
      },
      {
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        units: 750,
        totalUnits: 1500,
        progressPercentage: 50,
      },
    ],
    "prod-2": [
      {
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        units: 0,
        totalUnits: 800,
        progressPercentage: 0,
      },
    ],
    "prod-3": [
      {
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        units: 0,
        totalUnits: 1000,
        progressPercentage: 0,
      },
      {
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        units: 300,
        totalUnits: 1000,
        progressPercentage: 30,
      },
      {
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        units: 700,
        totalUnits: 1000,
        progressPercentage: 70,
      },
    ],
    "prod-4": [
      {
        timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        units: 0,
        totalUnits: 1200,
        progressPercentage: 0,
      },
      {
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        units: 600,
        totalUnits: 1200,
        progressPercentage: 50,
      },
      {
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        units: 1200,
        totalUnits: 1200,
        progressPercentage: 100,
      },
    ],
  },
  selectedSku: null,
  selectedDeficit: null,

  setSelectedSku: (sku) => set({ selectedSku: sku }),
  setSelectedDeficit: (deficit) => set({ selectedDeficit: deficit }),

  createProductionOrder: (order) => {
    const newOrder: ProductionOrder = {
      ...order,
      id: uuidv4(),
      startDate: new Date().toISOString(),
      progress: 0,
    }

    set((state) => {
      // Create initial progress history entry
      const initialHistoryEntry: ProgressHistoryEntry = {
        timestamp: new Date().toISOString(),
        units: 0,
        totalUnits: order.quantity,
        progressPercentage: 0,
      }

      return {
        productionOrders: [...state.productionOrders, newOrder],
        // Update the production data to reflect the new order
        productionData: state.productionData.map((item) => {
          if (item.sku === order.sku) {
            return {
              ...item,
              inProduction: item.inProduction + order.quantity,
              deficit: Math.max(0, item.deficit - order.quantity),
              status: item.deficit - order.quantity <= 0 ? "sufficient" : "deficit",
            }
          }
          return item
        }),
        // Add initial progress history entry
        progressHistory: {
          ...state.progressHistory,
          [newOrder.id]: [initialHistoryEntry],
        },
      }
    })
  },

  updateOrderProgress: (orderId, progress) => {
    set((state) => {
      const order = state.productionOrders.find((o) => o.id === orderId)

      if (!order) return state

      // Only update if progress is increasing
      if (progress < order.progress) {
        return state
      }

      // Calculate units based on progress percentage
      const units = Math.round((progress / 100) * order.quantity)

      // Create new history entry
      const historyEntry: ProgressHistoryEntry = {
        timestamp: new Date().toISOString(),
        units,
        totalUnits: order.quantity,
        progressPercentage: progress,
      }

      return {
        productionOrders: state.productionOrders.map((order) => {
          if (order.id === orderId) {
            return { ...order, progress }
          }
          return order
        }),
        // Add to progress history
        progressHistory: {
          ...state.progressHistory,
          [orderId]: [...(state.progressHistory[orderId] || []), historyEntry],
        },
      }
    })
  },

  updateOrderStatus: (orderId, status, progress) => {
    set((state) => ({
      productionOrders: state.productionOrders.map((order) => {
        if (order.id === orderId) {
          return { ...order, progress }
        }
        return order
      }),
    }))
  },

  getOrderById: (orderId) => {
    return get().productionOrders.find((order) => order.id === orderId)
  },

  getProgressHistory: (orderId) => {
    return get().progressHistory[orderId] || []
  },
}))

