import { useState, useEffect } from 'react'
import { Save, RefreshCw, X } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Card, CardContent } from '@/shared/components/ui/card'
import { dashboardApi } from '../services/dashboardApi'
import type { DashboardSetting, DashboardUiData } from '../types/dashboard.types'

interface SettingsFormProps {
  onClose?: () => void
}

const SettingsForm = ({ onClose }: SettingsFormProps) => {
  const [settings, setSettings] = useState<DashboardSetting[]>([])
  const [uiData, setUiData] = useState<DashboardUiData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [settingsData, uiDataResponse] = await Promise.all([
        dashboardApi.getSettings(),
        dashboardApi.getUiData(),
      ])
      setSettings(settingsData)
      setUiData(uiDataResponse)
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در بارگذاری تنظیمات')
    } finally {
      setLoading(false)
    }
  }

  const handleSettingChange = (index: number, value: string) => {
    const updated = [...settings]
    updated[index] = { ...updated[index], value }
    setSettings(updated)
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)
      await dashboardApi.updateSettings(settings)
      alert('تنظیمات با موفقیت ذخیره شد')
      if (onClose) onClose()
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در ذخیره تنظیمات')
    } finally {
      setSaving(false)
    }
  }

  const getInputType = (dataType: string) => {
    switch (dataType) {
      case 'Boolean':
        return 'checkbox'
      case 'Color':
        return 'color'
      case 'ImageUrl':
        return 'url'
      default:
        return 'text'
    }
  }

  const renderSettingInput = (setting: DashboardSetting, index: number) => {
    const inputType = getInputType(setting.dataType)

    if (setting.dataType === 'Boolean') {
      return (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={setting.value === 'true'}
            onChange={(e) => handleSettingChange(index, e.target.checked.toString())}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            {setting.value === 'true' ? 'فعال' : 'غیرفعال'}
          </span>
        </div>
      )
    }

    if (setting.dataType === 'Color') {
      return (
        <div className="flex gap-3">
          <input
            type="color"
            value={setting.value}
            onChange={(e) => handleSettingChange(index, e.target.value)}
            className="w-16 h-12 border-2 border-gray-200 rounded-lg cursor-pointer"
          />
          <Input
            type="text"
            value={setting.value}
            onChange={(e) => handleSettingChange(index, e.target.value)}
            className="flex-1 font-mono"
            dir="ltr"
          />
        </div>
      )
    }

    if (setting.dataType === 'MenuReference') {
      // This would need menu data from API
      return (
        <Input
          type="text"
          value={setting.value}
          onChange={(e) => handleSettingChange(index, e.target.value)}
          placeholder="شناسه منو"
          dir="rtl"
        />
      )
    }

    return (
      <Input
        type={inputType}
        value={setting.value}
        onChange={(e) => handleSettingChange(index, e.target.value)}
        dir={inputType === 'url' ? 'ltr' : 'rtl'}
        placeholder={setting.description}
      />
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">در حال بارگذاری...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6" dir="rtl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">تنظیمات داشبورد</h2>
          <p className="text-gray-600 mt-1">مدیریت و پیکربندی تنظیمات سیستم</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={loadData} disabled={loading}>
            <RefreshCw size={18} className="ml-2" />
            بازنشانی
          </Button>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              <X size={18} className="ml-2" />
              بستن
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settings.map((setting, index) => (
          <Card key={setting.key} className="border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {setting.key}
                  </label>
                  {setting.description && (
                    <p className="text-xs text-gray-500 mb-3">{setting.description}</p>
                  )}
                  <div className="mb-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {uiData?.dataTypes.find((dt) => dt.value === setting.dataType)?.label ||
                        setting.dataType}
                    </span>
                  </div>
                </div>
                {renderSettingInput(setting, index)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {settings.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="p-12 text-center">
            <p className="text-gray-500">هیچ تنظیماتی یافت نشد</p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
          <Save size={18} />
          {saving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
        </Button>
      </div>
    </div>
  )
}

export default SettingsForm

