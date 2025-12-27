import { apiClient } from '@/shared/services/apiClient'
import type {
  Page,
  PageTemplate,
  Media,
  CmsMenu,
  FormSubmission,
  CmsUiData,
  CreatePageRequest,
  UpdatePageRequest,
  CreatePageTemplateRequest,
  UpdatePageTemplateRequest,
  AddPageBlockRequest,
  UpdatePageBlockRequest,
  GetAllPagesParams,
  PagedResult,
} from '../types/cms.types'

const BASE_URL = '/api/v1/cms'

export const cmsApi = {
  // Pages
  getPages: async (params?: GetAllPagesParams): Promise<PagedResult<Page>> => {
    const response = await apiClient.get<PagedResult<Page>>(`${BASE_URL}/pages`, { params })
    return response.data
  },

  getPageById: async (id: number): Promise<Page> => {
    const response = await apiClient.get<Page>(`${BASE_URL}/pages/${id}`)
    return response.data
  },

  getPageBySlug: async (slug: string): Promise<Page> => {
    const response = await apiClient.get<Page>(`${BASE_URL}/pages/slug/${slug}`)
    return response.data
  },

  createPage: async (data: CreatePageRequest): Promise<Page> => {
    const response = await apiClient.post<Page>(`${BASE_URL}/pages`, data)
    return response.data
  },

  updatePage: async (id: number, data: UpdatePageRequest): Promise<void> => {
    await apiClient.put(`${BASE_URL}/pages/${id}`, data)
  },

  deletePage: async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/pages/${id}`)
  },

  publishPage: async (id: number): Promise<void> => {
    await apiClient.put(`${BASE_URL}/pages/${id}/publish`)
  },

  unpublishPage: async (id: number): Promise<void> => {
    await apiClient.put(`${BASE_URL}/pages/${id}/unpublish`)
  },

  archivePage: async (id: number): Promise<void> => {
    await apiClient.put(`${BASE_URL}/pages/${id}/archive`)
  },

  duplicatePage: async (id: number): Promise<Page> => {
    const response = await apiClient.post<Page>(`${BASE_URL}/pages/${id}/duplicate`)
    return response.data
  },

  // Page Blocks
  addPageBlock: async (pageId: number, data: AddPageBlockRequest): Promise<void> => {
    await apiClient.post(`${BASE_URL}/pages/${pageId}/blocks`, data)
  },

  updatePageBlock: async (blockId: number, data: UpdatePageBlockRequest): Promise<void> => {
    await apiClient.put(`${BASE_URL}/pages/blocks/${blockId}`, data)
  },

  deletePageBlock: async (blockId: number): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/pages/blocks/${blockId}`)
  },

  reorderPageBlocks: async (pageId: number, blockIds: number[]): Promise<void> => {
    await apiClient.put(`${BASE_URL}/pages/${pageId}/blocks/reorder`, { blockIds })
  },

  // Page Versions
  createPageVersion: async (pageId: number): Promise<void> => {
    await apiClient.post(`${BASE_URL}/pages/${pageId}/versions`)
  },

  getPageVersions: async (pageId: number): Promise<any[]> => {
    const response = await apiClient.get<any[]>(`${BASE_URL}/pages/${pageId}/versions`)
    return response.data
  },

  restorePageVersion: async (pageId: number, versionId: number): Promise<void> => {
    await apiClient.post(`${BASE_URL}/pages/${pageId}/versions/${versionId}/restore`)
  },

  // Templates
  getTemplates: async (): Promise<PageTemplate[]> => {
    const response = await apiClient.get<PageTemplate[]>(`${BASE_URL}/templates`)
    return response.data
  },

  getTemplateById: async (id: number): Promise<PageTemplate> => {
    const response = await apiClient.get<PageTemplate>(`${BASE_URL}/templates/${id}`)
    return response.data
  },

  createTemplate: async (data: CreatePageTemplateRequest): Promise<PageTemplate> => {
    const response = await apiClient.post<PageTemplate>(`${BASE_URL}/templates`, data)
    return response.data
  },

  updateTemplate: async (id: number, data: UpdatePageTemplateRequest): Promise<void> => {
    await apiClient.put(`${BASE_URL}/templates/${id}`, data)
  },

  deleteTemplate: async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/templates/${id}`)
  },

  // Media
  getMedia: async (params?: { pageNumber?: number; pageSize?: number }): Promise<PagedResult<Media>> => {
    const response = await apiClient.get<PagedResult<Media>>(`${BASE_URL}/media`, { params })
    return response.data
  },

  uploadMedia: async (file: File): Promise<Media> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await apiClient.post<Media>(`${BASE_URL}/media`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  deleteMedia: async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/media/${id}`)
  },

  // Menus
  getMenus: async (isActive?: boolean): Promise<CmsMenu[]> => {
    const params = isActive !== undefined ? { isActive } : {}
    const response = await apiClient.get<CmsMenu[]>(`${BASE_URL}/menus`, { params })
    return response.data
  },

  getMenuById: async (id: number): Promise<CmsMenu> => {
    const response = await apiClient.get<CmsMenu>(`${BASE_URL}/menus/${id}`)
    return response.data
  },

  getMenuByName: async (name: string): Promise<CmsMenu> => {
    const response = await apiClient.get<CmsMenu>(`${BASE_URL}/menus/${name}`)
    return response.data
  },

  createMenu: async (data: { name: string; description?: string; menuStructure?: any[] }): Promise<CmsMenu> => {
    const response = await apiClient.post<CmsMenu>(`${BASE_URL}/menus`, data)
    return response.data
  },

  updateMenu: async (id: number, data: { name?: string; description?: string; menuStructure?: any[] }): Promise<void> => {
    await apiClient.put(`${BASE_URL}/menus/${id}`, data)
  },

  deleteMenu: async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/menus/${id}`)
  },

  // Form Submissions
  getFormSubmissions: async (params?: { pageId?: number; pageNumber?: number; pageSize?: number }): Promise<PagedResult<FormSubmission>> => {
    const response = await apiClient.get<PagedResult<FormSubmission>>(`${BASE_URL}/form-submissions`, { params })
    return response.data
  },

  getFormSubmissionById: async (id: number): Promise<FormSubmission> => {
    const response = await apiClient.get<FormSubmission>(`${BASE_URL}/form-submissions/${id}`)
    return response.data
  },

  // UI Data
  getPageUiData: async (): Promise<CmsUiData> => {
    const response = await apiClient.get<CmsUiData>(`${BASE_URL}/pages/ui-data`)
    return response.data
  },
}

