"use client";

import { useState } from "react";
import { 
  Home, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Package
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MenuItem = {
  id: string;
  label: string;
  icon: any;
  href: string;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/admin",
  },
  {
    id: "fooldal",
    label: "Főoldal",
    icon: FileText,
    href: "/admin",
    children: [
      { id: "hero", label: "Hero szekció", icon: FileText, href: "/admin/hero" },
      { id: "services", label: "Szolgáltatások", icon: ImageIcon, href: "/admin/services" },
      { id: "products", label: "Termekeink", icon: Package, href: "/admin/products" },
      { id: "process", label: "Hogyan dolgozunk?", icon: FileText, href: "/admin/process" },
      { id: "faq", label: "GYIK", icon: FileText, href: "/admin/faq" },
      { id: "contact", label: "Kapcsolat & Footer", icon: FileText, href: "/admin/contact" },
    ],
  },
  {
    id: "blog",
    label: "Blog",
    icon: FileText,
    href: "/admin/blog",
  },
  {
    id: "settings",
    label: "Beállítások",
    icon: Settings,
    href: "/admin/settings",
  },
];

export function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(["cms"]));

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-black font-bold text-sm">B</span>
              </div>
              <span className="font-semibold text-gray-900 text-sm">BARELLA Admin</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Menü bezárása"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-primary transition-colors">
                            <item.icon size={16} className="text-gray-600 group-hover:text-black transition-colors" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{item.label}</span>
                        </div>
                        {expandedItems.has(item.id) ? (
                          <ChevronDown size={16} className="text-gray-400" />
                        ) : (
                          <ChevronRight size={16} className="text-gray-400" />
                        )}
                      </button>
                      {expandedItems.has(item.id) && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors group"
                              >
                                <div className="p-1.5 rounded-lg bg-gray-50 group-hover:bg-primary/20 transition-colors">
                                  <child.icon size={14} className="text-gray-500 group-hover:text-primary transition-colors" />
                                </div>
                                <span className="text-sm text-gray-700 group-hover:text-gray-900">{child.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-primary transition-colors">
                        <item.icon size={16} className="text-gray-600 group-hover:text-black transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors">
                <LogOut size={16} className="text-red-600" />
              </div>
              <span className="text-sm font-medium text-red-600">Kijelentkezés</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
