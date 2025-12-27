import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Menu as MenuIcon, ChevronRight, X } from 'lucide-react'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/utils/utils'
import { dashboardApi } from '../services/dashboardApi'
import type { DashboardMenu, DashboardMenuItem } from '../types/dashboard.types'
import MenuForm from '../components/MenuForm'
import MenuItemForm from '../components/MenuItemForm'

const Menus = () => {
  const [menus, setMenus] = useState<DashboardMenu[]>([])
  const [selectedMenu, setSelectedMenu] = useState<DashboardMenu & { items: DashboardMenuItem[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showMenuForm, setShowMenuForm] = useState(false)
  const [showMenuItemForm, setShowMenuItemForm] = useState(false)
  const [editingMenu, setEditingMenu] = useState<DashboardMenu | null>(null)
  const [editingMenuItem, setEditingMenuItem] = useState<DashboardMenuItem | null>(null)
  const [filterActive, setFilterActive] = useState<boolean | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadMenus()
  }, [filterActive])

  const loadMenus = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await dashboardApi.getMenus(filterActive ?? undefined)
      setMenus(data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در بارگذاری منوها')
    } finally {
      setLoading(false)
    }
  }

  const loadMenuDetails = async (id: number) => {
    try {
      const menu = await dashboardApi.getMenuById(id)
      setSelectedMenu(menu)
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در بارگذاری جزئیات منو')
    }
  }

  const handleCreateMenu = async (data: any) => {
    try {
      await dashboardApi.createMenu(data)
      await loadMenus()
      setShowMenuForm(false)
      setEditingMenu(null)
    } catch (err: any) {
      throw err
    }
  }

  const handleUpdateMenu = async (data: any) => {
    if (!editingMenu) return
    try {
      await dashboardApi.updateMenu(editingMenu.id, data)
      await loadMenus()
      if (selectedMenu?.id === editingMenu.id) {
        await loadMenuDetails(editingMenu.id)
      }
      setShowMenuForm(false)
      setEditingMenu(null)
    } catch (err: any) {
      throw err
    }
  }

  const handleDeleteMenu = async (id: number) => {
    if (!confirm('آیا از حذف این منو اطمینان دارید؟')) return
    try {
      await dashboardApi.deleteMenu(id)
      await loadMenus()
      if (selectedMenu?.id === id) {
        setSelectedMenu(null)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در حذف منو')
    }
  }

  const handleToggleMenuActive = async (id: number) => {
    try {
      await dashboardApi.toggleMenuActive(id)
      await loadMenus()
      if (selectedMenu?.id === id) {
        await loadMenuDetails(id)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در تغییر وضعیت منو')
    }
  }

  const handleAddMenuItem = async (data: any) => {
    if (!selectedMenu) return
    try {
      await dashboardApi.addMenuItem(selectedMenu.id, data)
      await loadMenuDetails(selectedMenu.id)
      setShowMenuItemForm(false)
      setEditingMenuItem(null)
    } catch (err: any) {
      throw err
    }
  }

  const handleUpdateMenuItem = async (data: any) => {
    if (!editingMenuItem || !selectedMenu) return
    try {
      await dashboardApi.updateMenuItem(editingMenuItem.id, data)
      await loadMenuDetails(selectedMenu.id)
      setShowMenuItemForm(false)
      setEditingMenuItem(null)
    } catch (err: any) {
      throw err
    }
  }

  const handleDeleteMenuItem = async (itemId: number) => {
    if (!confirm('آیا از حذف این آیتم اطمینان دارید؟')) return
    if (!selectedMenu) return
    try {
      await dashboardApi.deleteMenuItem(itemId)
      await loadMenuDetails(selectedMenu.id)
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در حذف آیتم')
    }
  }

  const handleToggleMenuItemVisibility = async (itemId: number) => {
    if (!selectedMenu) return
    try {
      await dashboardApi.toggleMenuItemVisibility(itemId)
      await loadMenuDetails(selectedMenu.id)
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در تغییر وضعیت آیتم')
    }
  }

  // Reorder functionality can be added later with drag-and-drop
  // const handleReorderItems = async (itemIds: number[]) => {
  //   if (!selectedMenu) return
  //   try {
  //     await dashboardApi.reorderMenuItems(selectedMenu.id, { itemIds })
  //     await loadMenuDetails(selectedMenu.id)
  //   } catch (err: any) {
  //     setError(err.response?.data?.message || 'خطا در تغییر ترتیب آیتم‌ها')
  //   }
  // }

  const getColorClasses = (color?: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-500 to-cyan-500',
      emerald: 'from-green-500 to-emerald-500',
      purple: 'from-purple-500 to-pink-500',
    }
    return colors[color || 'blue'] || colors.blue
  }

  const renderMenuItem = (item: DashboardMenuItem, level = 0) => {
    return (
      <div key={item.id} className="mb-2" style={{ marginRight: `${level * 24}px` }}>
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-3 flex-1">
            <ChevronRight className="text-gray-400" size={16} />
            <span className="font-medium text-gray-900">{item.label}</span>
            <span className="text-xs text-gray-500">({item.url})</span>
            <span className={cn(
              "px-2 py-1 rounded text-xs font-medium",
              item.isVisible
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-100 text-gray-600"
            )}>
              {item.isVisible ? 'قابل مشاهده' : 'مخفی'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleToggleMenuItemVisibility(item.id)}
            >
              {item.isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingMenuItem(item)
                setShowMenuItemForm(true)
              }}
            >
              <Edit size={16} />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteMenuItem(item.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
        {item.children && item.children.map((child) => renderMenuItem(child, level + 1))}
      </div>
    )
  }

  const filteredMenus = menus.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    menu.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto w-full space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">مدیریت منوها</h1>
          <p className="text-gray-600">ایجاد و مدیریت منوهای سیستم</p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={() => {
            setEditingMenu(null)
            setShowMenuForm(true)
          }}
        >
          <Plus size={20} />
          منوی جدید
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Filters */}
      <Card className="border-gray-200" dir="rtl">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="جستجوی منوها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                dir="rtl"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={filterActive === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterActive(null)}
              >
                همه
              </Button>
              <Button
                variant={filterActive === true ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterActive(true)}
              >
                فعال
              </Button>
              <Button
                variant={filterActive === false ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterActive(false)}
              >
                غیرفعال
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Form */}
      {showMenuForm && (
        <MenuForm
          initialData={editingMenu || undefined}
          onSubmit={editingMenu ? handleUpdateMenu : handleCreateMenu}
          onCancel={() => {
            setShowMenuForm(false)
            setEditingMenu(null)
          }}
        />
      )}

      {/* Menu Item Form */}
      {showMenuItemForm && selectedMenu && (
        <MenuItemForm
          initialData={editingMenuItem || undefined}
          parentItems={selectedMenu.items || []}
          onSubmit={editingMenuItem ? handleUpdateMenuItem : handleAddMenuItem}
          onCancel={() => {
            setShowMenuItemForm(false)
            setEditingMenuItem(null)
          }}
        />
      )}

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menus List */}
        <div className={cn("space-y-4", selectedMenu ? "lg:col-span-1" : "lg:col-span-3")}>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">در حال بارگذاری...</p>
            </div>
          ) : filteredMenus.length === 0 ? (
            <Card className="border-gray-200">
              <CardContent className="p-12 text-center">
                <MenuIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">منویی یافت نشد</h3>
                <p className="text-gray-500 mb-6">شروع کنید با ایجاد اولین منو</p>
                <Button onClick={() => setShowMenuForm(true)}>
                  <Plus size={18} className="ml-2" />
                  ایجاد منوی جدید
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredMenus.map((menu) => (
              <Card
                key={menu.id}
                className={cn(
                  "relative border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group cursor-pointer",
                  selectedMenu?.id === menu.id && "ring-2 ring-blue-500"
                )}
                onClick={() => loadMenuDetails(menu.id)}
                dir="rtl"
              >
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
                    getColorClasses(menu.color),
                    "transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                  )}
                />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md flex-shrink-0",
                          getColorClasses(menu.color)
                        )}
                      >
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
                    <Button
                      variant="outline"
                      className="flex-1 text-sm flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingMenu(menu)
                        setShowMenuForm(true)
                      }}
                    >
                      <Edit size={16} />
                      ویرایش
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="px-4"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleMenuActive(menu.id)
                      }}
                    >
                      {menu.isActive ? (
                        <EyeOff size={16} className="text-gray-600" />
                      ) : (
                        <Eye size={16} className="text-gray-600" />
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="px-4"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteMenu(menu.id)
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Menu Details */}
        {selectedMenu && (
          <div className="lg:col-span-2">
            <Card className="border-gray-200" dir="rtl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMenu.name}</h2>
                    <p className="text-gray-600 mt-1">{selectedMenu.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelectedMenu(null)}
                  >
                    <X size={18} />
                  </Button>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">آیتم‌های منو</h3>
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditingMenuItem(null)
                      setShowMenuItemForm(true)
                    }}
                  >
                    <Plus size={16} className="ml-2" />
                    افزودن آیتم
                  </Button>
                </div>

                {selectedMenu.items && selectedMenu.items.length > 0 ? (
                  <div className="space-y-2">
                    {selectedMenu.items
                      .filter((item) => !item.parentId)
                      .map((item) => renderMenuItem(item))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>هیچ آیتمی در این منو وجود ندارد</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default Menus
