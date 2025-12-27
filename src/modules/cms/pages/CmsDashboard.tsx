import { useState, useEffect } from 'react'
import { FileText, Plus, Search, Filter } from 'lucide-react'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { cmsApi } from '../services/cmsApi'
import type { Page, PageStatus } from '../types/cms.types'

const CmsDashboard = () => {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadPages()
  }, [])

  const loadPages = async () => {
    try {
      setLoading(true)
      const result = await cmsApi.getPages({ pageNumber: 1, pageSize: 10 })
      setPages(result.items)
    } catch (error) {
      console.error('Failed to load pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: PageStatus) => {
    const statusMap = {
      0: { label: 'پیش‌نویس', color: 'bg-gray-100 text-gray-700' },
      1: { label: 'منتشر شده', color: 'bg-emerald-100 text-emerald-700' },
      2: { label: 'آرشیو شده', color: 'bg-orange-100 text-orange-700' },
    }
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap[0]
    return (
      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    )
  }

  return (
    <div className="max-w-7xl mx-auto w-full space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">مدیریت محتوا</h1>
          <p className="text-gray-600">ایجاد و مدیریت صفحات و محتوای سایت</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          صفحه جدید
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-gray-200" dir="rtl">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="جستجوی صفحات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
                dir="rtl"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={18} />
              فیلتر
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pages List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">در حال بارگذاری...</p>
        </div>
      ) : pages.length === 0 ? (
        <Card className="border-gray-200" dir="rtl">
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">صفحه‌ای یافت نشد</h3>
            <p className="text-gray-500 mb-6">شروع کنید با ایجاد اولین صفحه</p>
            <Button>
              <Plus size={18} className="ml-2" />
              ایجاد صفحه جدید
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {pages.map((page) => (
            <Card key={page.id} className="border-gray-200 hover:shadow-lg transition-all" dir="rtl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{page.title}</h3>
                      {getStatusBadge(page.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">/{page.slug}</p>
                    {page.templateName && (
                      <p className="text-xs text-gray-500">قالب: {page.templateName}</p>
                    )}
                    <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                      <span>ایجاد شده: {new Date(page.createdAt).toLocaleDateString('fa-IR')}</span>
                      <span>به‌روزرسانی: {new Date(page.updatedAt).toLocaleDateString('fa-IR')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      ویرایش
                    </Button>
                    <Button variant="outline" size="sm">
                      مشاهده
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default CmsDashboard

