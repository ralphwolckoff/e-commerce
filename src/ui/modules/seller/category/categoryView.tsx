import { CheckCircleIcon, EditIcon, Trash2Icon } from "@/components/icons";
import { Category } from "@/types/category";
import { Button } from "@/ui/design/button/button";
import { useState } from "react";

interface CategoriesViewProps {
  categories: Category[];
  handleUpdateCategory: (id: string, newName: string) => void;
  handleDeleteCategory: (id: string) => void;
  handleAddCategory: (name: string) => void;
} 

export const CategoriesView = ({
  categories,
  handleUpdateCategory,
  handleDeleteCategory,
  handleAddCategory,
}: CategoriesViewProps) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");

  const startEditCategory = (category: Category) => {
    setEditCategoryId(category.id);
    setEditCategoryName(category.name);
  };

  const saveEditCategory = () => {
    handleUpdateCategory(editCategoryId, editCategoryName);
    setEditCategoryId("");
  };

  const handleAddClick = () => {
    if (newCategoryName.trim()) {
      handleAddCategory(newCategoryName);
      setNewCategoryName("");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[600px]">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Gestion des catégories
      </h2>

      {/* Add new category */}
      <div className="flex mb-6 space-x-2">
        <input
          type="text"
          placeholder="Nom de la nouvelle catégorie"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          action={handleAddClick}
          size="small"
        >
          Ajouter
        </Button>
      </div>

      {/* Category List */}
      <ul className="max-w-md flex flex-col gap-10">
        {categories && categories.length > 0 ?  (categories.map((category) => (
          <li
            key={category.id}
            className="bg-gray-50 rounded-lg p-4 shadow-sm flex items-center justify-between "
          >
            {editCategoryId === category.id ? (
              <input
                type="text"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                className="flex-grow p-1 border rounded"
              />
            ) : (
              <span className="font-medium text-gray-700">{category.name}</span>
            )}

            <div className="flex space-x-2 ml-4">
              {editCategoryId === category.id ? (
                <button
                  onClick={saveEditCategory}
                  className="bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 transition-colors"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => startEditCategory(category)}
                  className="bg-yellow-500 text-white p-2 rounded-full shadow-md hover:bg-yellow-600 transition-colors"
                >
                  <EditIcon className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-colors"
              >
                <Trash2Icon className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))) : (
          <div className="col-span-1 text-center text-gray-500">
            Aucune catégorie trouvée.
          </div>
        )}
      </ul>
    </div>
  );
};
