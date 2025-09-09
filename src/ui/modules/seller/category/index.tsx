import { useEffect, useState } from "react";
import { CategoriesView } from "./categoryView";
import { Category } from "@/types/category";
import { categoryService } from "@/services/categoryService";
import { useAuth } from "@/context/AuthContext";
import { useStoreStore } from "@/store/storeStore";

export const CategoryIndex = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useAuth();
  const {store} = useStoreStore()

  const fetchCategories = async () => {
    setIsLoading(true);
    if (!authUser) {
        throw new Error
    }
    const storeId = store?.id;
    if (storeId) {
      
      const categories = await categoryService.getCategoriesByStoreId(storeId);
      setCategories(categories);
    }
    setIsLoading(false);
  };

  useEffect(()=>{
    fetchCategories()
  },[authUser])

  const handleUpdateCategory =  (id: string, newName: string) => {
    setIsLoading(true);
    setTimeout(async () => {
      if (categories.length > 0) {
        const updateCategory = await categoryService.updateCategory(id, {
          name: newName,
        });
        setCategories((prev) => ({...prev, updateCategory}));
      }else{
        const StoreId= store?.id;
        if (StoreId) {
          
          const newCategory = await categoryService.createCategory({
            storeId: StoreId,
            name: newName,
          });
          setCategories((prev) => ({...prev, newCategory}));
        }
      }
      setIsLoading(false);
    }, 500);
  };

  const handleDeleteCategory = (id: string) => {
    setIsLoading(true);
    setTimeout(async() => {
      await categoryService.deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      setIsLoading(false);
    }, 500);
  };

  const handleAddCategory = (name: string) => {
    setIsLoading(true);
    setTimeout(async() => {
        const StoreId = store?.id;
        console.log({StoreId});
        if (StoreId) { 
          const newCategory = await categoryService.createCategory({
            storeId: StoreId,
            name: name,
          });
          setCategories((prev) => ({ ...prev, newCategory }));
        }
      setIsLoading(false);
    }, 500);
  };


  if (isLoading) {
    
  }

  return (
    <div>
      <CategoriesView
        categories={categories}
        handleUpdateCategory={handleUpdateCategory}
        handleDeleteCategory={handleDeleteCategory}
        handleAddCategory={handleAddCategory}
      />
    </div>
  );
};
