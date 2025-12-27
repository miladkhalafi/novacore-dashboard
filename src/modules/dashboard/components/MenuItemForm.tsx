import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Card, CardContent } from '@/shared/components/ui/card'
import type {
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
  DashboardMenuItem,
} from '../types/dashboard.types'

interface MenuItemFormProps {
  initialData?: DashboardMenuItem
  parentItems?: DashboardMenuItem[]
  onSubmit: (data: CreateMenuItemRequest | UpdateMenuItemRequest) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

const MenuItemForm = ({
  initialData,
  parentItems = [],
  onSubmit,
  onCancel,
  loading = false,
}: MenuItemFormProps) => {
  const [formData, setFormData] = useState({
    label: initialData?.label || '',
    url: initialData?.url || '',
    icon: initialData?.icon || '',
    order: initialData?.order || 0,
    parentId: initialData?.parentId || undefined,
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.label.trim()) {
      setError('برچسب آیتم الزامی است')
      return
    }

    if (!formData.url.trim()) {
      setError('آدرس URL الزامی است')
      return
    }

    try {
      const submitData = { ...formData }
      if (!submitData.parentId) {
        delete submitData.parentId
      }
      await onSubmit(submitData)
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در ذخیره آیتم منو')
    }
  }

  return (
    <Card className="border-gray-200" dir="rtl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {initialData ? 'ویرایش آیتم منو' : 'افزودن آیتم جدید'}
          </h3>
          <Button variant="outline" size="icon" onClick={onCancel}>
            <X size={18} />
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              برچسب <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="مثال: صفحه اصلی"
              dir="rtl"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              آدرس URL <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="/home"
              dir="ltr"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              آیکون (اختیاری)
            </label>
            <Input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="مثال: Home"
              dir="ltr"
            />
            <p className="text-xs text-gray-500 mt-1">نام آیکون از کتابخانه lucide-react</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ترتیب
            </label>
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              min="0"
              dir="ltr"
            />
          </div>

          {parentItems.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                منوی والد (اختیاری)
              </label>
              <select
                value={formData.parentId || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    parentId: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                dir="rtl"
              >
                <option value="">بدون والد</option>
                {parentItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              انصراف
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'در حال ذخیره...' : initialData ? 'ذخیره تغییرات' : 'افزودن آیتم'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default MenuItemForm

