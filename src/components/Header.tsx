
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header = ({ searchQuery, setSearchQuery }: HeaderProps) => {
  return (
    <header className="border-b border-white/10 py-4">
      <div className="container flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-pink-600 flex items-center justify-center overflow-hidden">
            <img 
              src="/lovable-uploads/fcf5e18e-e290-4757-9c31-94d11508822c.png" 
              alt="Grabyor Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-extrabold leading-tight">Grabyor</h1>
            <span className="text-sm font-medium -mt-1">Assets</span>
          </div>
        </div>
        <div className="relative w-full sm:w-64 md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search assets..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
