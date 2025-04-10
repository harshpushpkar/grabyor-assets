
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import CategorySidebar from "@/components/CategorySidebar";
import AssetCard from "@/components/AssetCard";
import { Asset } from "@/data/mockAssets";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch('https://yourdomain.com/categories.php');
        const data = await res.json();
        setCategories(data);
        
        // Set initial selected category after categories are loaded
        if (data.length > 0 && !selectedCategory) {
          setSelectedCategory(data[0]);
        }
      } catch (err) {
        console.error('Error loading categories', err);
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  // Fetch assets when selected category changes
  useEffect(() => {
    if (!selectedCategory) return;
    
    const fetchAssetsByCategory = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://yourdomain.com/api.php?category=${selectedCategory}`);
        const data = await res.json();
        setAssets(data);
        setFilteredAssets(data);
        setError(null);
      } catch (error) {
        console.error('Error loading assets:', error);
        setError('Failed to load assets.');
        setAssets([]);
        setFilteredAssets([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssetsByCategory();
  }, [selectedCategory]);

  // Filter assets based on search query
  useEffect(() => {
    if (assets.length === 0) return;
    
    if (searchQuery.trim() === "") {
      setFilteredAssets(assets);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = assets.filter(
      asset =>
        asset.name.toLowerCase().includes(query) ||
        asset.category.toLowerCase().includes(query)
    );
    
    setFilteredAssets(filtered);
  }, [searchQuery, assets]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <Hero />

      <div className="flex flex-1">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="animate-spin w-6 h-6 text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-destructive">{error}</h3>
              <p className="text-muted-foreground mt-2">Please try again later or check your connection.</p>
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No assets found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  {selectedCategory}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {filteredAssets.length} {filteredAssets.length === 1 ? "asset" : "assets"} found
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredAssets.map((asset) => (
                  <AssetCard
                    key={asset.id}
                    id={asset.id}
                    name={asset.name}
                    category={asset.category}
                    svg={asset.svg}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
