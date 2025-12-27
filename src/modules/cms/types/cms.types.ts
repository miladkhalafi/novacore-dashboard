export enum PageStatus {
  Draft = 0,
  Published = 1,
  Archived = 2,
}

export enum BlockType {
  Text = 0,
  Image = 1,
  Video = 2,
  Form = 3,
  Gallery = 4,
  Code = 5,
}

export interface Page {
  id: number
  title: string
  slug: string
  content: string
  status: PageStatus
  templateId?: number
  templateName?: string
  createdAt: string
  updatedAt: string
  createdByUserId?: number
  blocks?: PageBlock[]
}

export interface PageBlock {
  id: number
  pageId: number
  blockType: BlockType
  configuration: string
  order: number
}

export interface PageTemplate {
  id: number
  name: string
  description?: string
  content: string
  isActive: boolean
}

export interface Media {
  id: number
  fileName: string
  filePath: string
  fileSize: number
  mimeType: string
  altText?: string
  uploadedAt: string
  uploadedByUserId?: number
}

export interface CmsMenu {
  id: number
  name: string
  description?: string
  menuStructure: CmsMenuItem[]
  isActive: boolean
}

export interface CmsMenuItem {
  id: number
  label: string
  url: string
  order: number
  parentId?: number
  children?: CmsMenuItem[]
}

export interface FormSubmission {
  id: number
  pageId: number
  pageBlockId: number
  formData: Record<string, any>
  submittedBy?: string
  ipAddress?: string
  userAgent?: string
  status: string
  submittedAt: string
}

export interface CmsUiData {
  pageStatuses: Array<{ value: number; name: string }>
  blockTypes: Array<{ value: number; name: string }>
  templates?: Array<{ id: number; name: string }>
}

export interface CreatePageRequest {
  title: string
  slug: string
  content: string
  templateId?: number
}

export interface UpdatePageRequest {
  title?: string
  slug?: string
  content?: string
  templateId?: number
}

export interface CreatePageTemplateRequest {
  name: string
  description?: string
  content: string
}

export interface UpdatePageTemplateRequest {
  name?: string
  description?: string
  content?: string
  isActive?: boolean
}

export interface AddPageBlockRequest {
  blockType: BlockType
  configuration: string
  order: number
}

export interface UpdatePageBlockRequest {
  blockType?: BlockType
  configuration?: string
  order?: number
}

export interface GetAllPagesParams {
  pageNumber?: number
  pageSize?: number
  status?: PageStatus
  templateId?: number
  createdByUserId?: number
  searchTerm?: string
}

export interface PagedResult<T> {
  items: T[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

