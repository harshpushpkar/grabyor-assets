
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategorySidebar = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}: CategorySidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <aside
      className={cn(
        "h-[calc(100vh-64px)] sticky top-16 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        "bg-secondary/30 backdrop-blur-sm border-r border-white/10"
      )}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <h2 className="text-lg font-medium">Categories</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-white/10 transition-colors"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <div className="space-y-1 px-2">
            {categories.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground p-4">
                Loading categories...
              </div>
            ) : (
              categories.map((category) => (
                <button
                  key={category}
                  className={cn(
                    "w-full flex items-center px-3 py-2 rounded-md transition-colors",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-white/10"
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {!collapsed ? (
                    <span>{category}</span>
                  ) : (
                    <span className="mx-auto text-xs">{category.substring(0, 1)}</span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;
