
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import CategorySidebar from "@/components/CategorySidebar";
import AssetCard from "@/components/AssetCard";
import { fetchAssets, categories, Asset } from "@/data/mockAssets";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load assets on component mount
  useEffect(() => {
    const loadAssets = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAssets();
        setAssets(data);
        setFilteredAssets(data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssets();
  }, []);

  // Filter assets based on category and search query
  useEffect(() => {
    let filtered = assets;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(asset => asset.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        asset =>
          asset.name.toLowerCase().includes(query) ||
          asset.category.toLowerCase().includes(query)
      );
    }

    setFilteredAssets(filtered);
  }, [selectedCategory, searchQuery, assets]);

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
          ) : filteredAssets.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No assets found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  {selectedCategory === "All" ? "All Assets" : selectedCategory}
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
