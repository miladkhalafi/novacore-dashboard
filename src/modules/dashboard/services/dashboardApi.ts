import { apiClient } from '@/shared/services/apiClient'
import type {
  DashboardMenu,
  DashboardMenuItem,
  DashboardSetting,
  DashboardUiData,
  CreateMenuRequest,
  UpdateMenuRequest,
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
  ReorderMenuItemsRequest,
} from '../types/dashboard.types'

const BASE_URL = '/api/v1/dashboard'

export const dashboardApi = {
  // Settings
  getSettings: async (): Promise<DashboardSetting[]> => {
    const response = await apiClient.get<DashboardSetting[]>(`${BASE_URL}/settings`)
    return response.data
  },

  updateSettings: async (settings: Partial<DashboardSetting>[]): Promise<void> => {
    await apiClient.put(`${BASE_URL}/settings`, settings)
  },

  // Menus
  getMenus: async (isActive?: boolean): Promise<DashboardMenu[]> => {
    const params = isActive !== undefined ? { isActive } : {}
    const response = await apiClient.get<DashboardMenu[]>(`${BASE_URL}/menus`, { params })
    return response.data
  },

  getMenuById: async (id: number): Promise<DashboardMenu & { items: DashboardMenuItem[] }> => {
    const response = await apiClient.get<DashboardMenu & { items: DashboardMenuItem[] }>(
      `${BASE_URL}/menus/${id}`
    )
    return response.data
  },

  createMenu: async (data: CreateMenuRequest): Promise<DashboardMenu> => {
    const response = await apiClient.post<DashboardMenu>(`${BASE_URL}/menus`, data)
    return response.data
  },

  updateMenu: async (id: number, data: UpdateMenuRequest): Promise<void> => {
    await apiClient.put(`${BASE_URL}/menus/${id}`, data)
  },

  deleteMenu: async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/menus/${id}`)
  },

  toggleMenuActive: async (id: number): Promise<void> => {
    await apiClient.put(`${BASE_URL}/menus/${id}/active`)
  },

  // Menu Items
  addMenuItem: async (menuId: number, data: CreateMenuItemRequest): Promise<DashboardMenuItem> => {
    const response = await apiClient.post<DashboardMenuItem>(
      `${BASE_URL}/menus/${menuId}/items`,
      data
    )
    return response.data
  },

  updateMenuItem: async (itemId: number, data: UpdateMenuItemRequest): Promise<void> => {
    await apiClient.put(`${BASE_URL}/menus/items/${itemId}`, data)
  },

  deleteMenuItem: async (itemId: number): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/menus/items/${itemId}`)
  },

  toggleMenuItemVisibility: async (itemId: number): Promise<void> => {
    await apiClient.put(`${BASE_URL}/menus/items/${itemId}/visibility`)
  },

  reorderMenuItems: async (menuId: number, data: ReorderMenuItemsRequest): Promise<void> => {
    await apiClient.put(`${BASE_URL}/menus/${menuId}/items/reorder`, data)
  },

  // UI Data
  getUiData: async (): Promise<DashboardUiData> => {
    const response = await apiClient.get<DashboardUiData>(`${BASE_URL}/ui-data`)
    return response.data
  },
}

