import { BarChart3, Users, Menu, Settings, Activity } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { cn } from '../lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  gradient: string
  trend?: {
    value: number
    isPositive: boolean
  }
  description?: string
}

function StatCard({ label, value, icon: Icon, gradient, trend, description }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group" dir="rtl">
      <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", gradient, "transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200")} />
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              {label}
            </p>
            <p className="text-3xl font-bold text-gray-900 tracking-tight mb-1">
              {value}
            </p>
            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}>
                  {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-gray-500">نسبت به ماه قبل</span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md flex-shrink-0",
            gradient
          )}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const Dashboard = () => {
  const stats = [
    {
      title: 'کل منوها',
      value: '12',
      icon: Menu,
      gradient: 'from-blue-500 to-cyan-500',
      trend: { value: 5.2, isPositive: true },
      description: 'منوهای فعال سیستم',
    },
    {
      title: 'تنظیمات فعال',
      value: '24',
      icon: Settings,
      gradient: 'from-purple-500 to-pink-500',
      trend: { value: 12.5, isPositive: true },
      description: 'تنظیمات پیکربندی شده',
    },
    {
      title: 'بازدید امروز',
      value: '1,234',
      icon: BarChart3,
      gradient: 'from-green-500 to-emerald-500',
      trend: { value: 8.1, isPositive: true },
      description: 'بازدیدکنندگان امروز',
    },
    {
      title: 'کاربران فعال',
      value: '89',
      icon: Users,
      gradient: 'from-orange-500 to-red-500',
      trend: { value: 3.2, isPositive: true },
      description: 'کاربران آنلاین',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto w-full space-y-6" dir="rtl">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            نمای کلی داشبورد
          </h1>
          <p className="text-gray-600">
            خوش آمدید! اینجا خلاصه‌ای از وضعیت سیستم شما است.
          </p>
        </div>
        <div className="text-left">
          <p className="text-sm text-gray-500 mb-1">آخرین به‌روزرسانی</p>
          <p className="text-sm font-semibold text-gray-900">
            {new Date().toLocaleDateString('fa-IR', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.title}
            value={stat.value}
            icon={stat.icon}
            gradient={stat.gradient}
            trend={stat.trend}
            description={stat.description}
          />
        ))}
      </div>

      {/* Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200" dir="rtl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">فعالیت‌های اخیر</h3>
              <Activity className="text-blue-600" size={20} />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                    <Menu className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">منوی جدید ایجاد شد</p>
                    <p className="text-xs text-gray-500 font-medium">2 ساعت پیش</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200" dir="rtl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">وضعیت سیستم</h3>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'سرور', status: 'آنلاین', color: 'emerald' },
                { label: 'پایگاه داده', status: 'متصل', color: 'emerald' },
                { label: 'API Gateway', status: 'فعال', color: 'emerald' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                  <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold shadow-sm">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
