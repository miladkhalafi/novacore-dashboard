import { useState } from 'react'
import { Save, RefreshCw, Palette, Image, Type, Moon } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

const Settings = () => {
  const [settings, setSettings] = useState({
    applicationName: 'NovaCore',
    logoUrl: '/assets/logo.png',
    primaryColor: '#2563eb',
    secondaryColor: '#ffffff',
    darkMode: false,
    footerText: '© 2024 NovaCore. All rights reserved.',
  })

  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    // TODO: Implement API call
    setTimeout(() => {
      setLoading(false)
      alert('تنظیمات با موفقیت ذخیره شد')
    }, 1000)
  }

  return (
    <div className="max-w-7xl mx-auto w-full space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">تنظیمات داشبورد</h1>
          <p className="text-gray-600">مدیریت تنظیمات و پیکربندی سیستم</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw size={18} />
            بازنشانی
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Save size={18} />
            {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branding Settings */}
        <Card className="border-gray-200" dir="rtl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Image className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">برندینگ</h3>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                  نام برنامه
                </label>
                <Input
                  type="text"
                  value={settings.applicationName}
                  onChange={(e) => setSettings({ ...settings, applicationName: e.target.value })}
                  placeholder="نام برنامه را وارد کنید"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                  آدرس لوگو
                </label>
                <Input
                  type="text"
                  value={settings.logoUrl}
                  onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                  placeholder="/assets/logo.png"
                  dir="rtl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card className="border-gray-200" dir="rtl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Palette className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">تم و رنگ‌بندی</h3>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                  رنگ اصلی
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                    className="w-16 h-12 border-2 border-gray-200 rounded-lg cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                    className="flex-1 font-mono"
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                  رنگ ثانویه
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                    className="w-16 h-12 border-2 border-gray-200 rounded-lg cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                    className="flex-1 font-mono"
                    dir="ltr"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-3">
                  <Moon className="text-gray-600" size={20} />
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block">حالت تاریک</label>
                    <p className="text-xs text-gray-500">فعال‌سازی تم تاریک</p>
                  </div>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                  className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                    settings.darkMode 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 right-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                      settings.darkMode ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Settings */}
        <Card className="lg:col-span-2 border-gray-200" dir="rtl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                <Type className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">متن فوتر</h3>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                متن نمایش داده شده در فوتر
              </label>
              <textarea
                value={settings.footerText}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                placeholder="متن فوتر را وارد کنید..."
                dir="rtl"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Settings
