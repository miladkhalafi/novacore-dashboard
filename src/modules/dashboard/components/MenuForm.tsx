import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Card, CardContent } from '@/shared/components/ui/card'
import type { CreateMenuRequest, UpdateMenuRequest } from '../types/dashboard.types'

interface MenuFormProps {
  initialData?: { id: number; name: string; description: string }
  onSubmit: (data: CreateMenuRequest | UpdateMenuRequest) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

const MenuForm = ({ initialData, onSubmit, onCancel, loading = false }: MenuFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name.trim()) {
      setError('نام منو الزامی است')
      return
    }

    try {
      await onSubmit(formData)
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در ذخیره منو')
    }
  }

  return (
    <Card className="border-gray-200" dir="rtl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {initialData ? 'ویرایش منو' : 'ایجاد منوی جدید'}
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
              نام منو <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="مثال: منوی اصلی"
              dir="rtl"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              توضیحات
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              placeholder="توضیحات منو (اختیاری)"
              dir="rtl"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              انصراف
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'در حال ذخیره...' : initialData ? 'ذخیره تغییرات' : 'ایجاد منو'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default MenuForm

