
import { Asset } from "@/data/mockAssets";

/**
 * Fetch assets from a category
 * @param category The category to fetch assets for
 */
export async function fetchAssetsByCategory(category: string): Promise<Asset[]> {
  try {
    const response = await fetch(`https://assets.grabyor.design/api.php?category=${category}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw error;
  }
}

/**
 * Fetch all available categories
 */
export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch('https://assets.grabyor.design/categories.php');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}
