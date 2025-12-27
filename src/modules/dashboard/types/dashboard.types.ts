export interface DashboardMenu {
  id: number
  name: string
  description: string
  isActive: boolean
  items: number
  color?: string
}

export interface DashboardMenuItem {
  id: number
  menuId: number
  label: string
  url: string
  icon?: string
  order: number
  isVisible: boolean
  parentId?: number
  children?: DashboardMenuItem[]
}

export interface DashboardSetting {
  key: string
  value: string
  dataType: 'Text' | 'Boolean' | 'Color' | 'ImageUrl' | 'MenuReference'
  description?: string
}

export interface DashboardUiData {
  dataTypes: Array<{ value: string; label: string }>
  menuStatuses: Array<{ value: string; label: string }>
}

export interface CreateMenuRequest {
  name: string
  description?: string
  menuStructure?: DashboardMenuItem[]
}

export interface UpdateMenuRequest {
  name?: string
  description?: string
  menuStructure?: DashboardMenuItem[]
}

export interface CreateMenuItemRequest {
  label: string
  url: string
  icon?: string
  order: number
  parentId?: number
}

export interface UpdateMenuItemRequest {
  label?: string
  url?: string
  icon?: string
  order?: number
  parentId?: number
}

export interface ReorderMenuItemsRequest {
  itemIds: number[]
}

