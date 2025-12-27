import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Menu as MenuIcon } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { cn } from '../lib/utils'

const Menus = () => {
  const [menus] = useState([
    {
      id: 1,
      name: 'منوی اصلی',
      description: 'منوی اصلی سایت که در هدر نمایش داده می‌شود',
      isActive: true,
      items: 5,
      color: 'blue',
    },
    {
      id: 2,
      name: 'منوی فوتر',
      description: 'منوی پایین صفحه برای لینک‌های مهم',
      isActive: true,
      items: 3,
      color: 'emerald',
    },
    {
      id: 3,
      name: 'منوی موبایل',
      description: 'منوی مخصوص نمایش در دستگاه‌های موبایل',
      isActive: false,
      items: 4,
      color: 'purple',
    },
  ])

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-500 to-cyan-500',
      emerald: 'from-green-500 to-emerald-500',
      purple: 'from-purple-500 to-pink-500',
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="max-w-7xl mx-auto w-full space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">مدیریت منوها</h1>
          <p className="text-gray-600">ایجاد و مدیریت منوهای سیستم</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          منوی جدید
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu) => (
          <Card key={menu.id} className="relative border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group" dir="rtl">
            <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", getColorClasses(menu.color), "transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200")} />
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-start gap-4 flex-1">
                  <div className={cn("w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md flex-shrink-0", getColorClasses(menu.color))}>
                    <MenuIcon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1.5">{menu.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{menu.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-5 p-4 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">تعداد آیتم‌ها:</span>
                  <span className="text-lg font-bold text-gray-900">{menu.items}</span>
                </div>
                <span
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm",
                    menu.isActive
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  )}
                >
                  {menu.isActive ? 'فعال' : 'غیرفعال'}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-5 border-t border-gray-100">
                <Button variant="outline" className="flex-1 text-sm flex items-center justify-center gap-2">
                  <Edit size={16} />
                  ویرایش
                </Button>
                <Button variant="outline" size="icon" className="px-4">
                  {menu.isActive ? <EyeOff size={16} className="text-gray-600" /> : <Eye size={16} className="text-gray-600" />}
                </Button>
                <Button variant="destructive" size="icon" className="px-4">
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Menus
