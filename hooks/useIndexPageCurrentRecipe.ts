import create from 'zustand'

type TCurrentRecipeStore = {
  currentRecipeId?: string
  setRecipeIdToNavigateBackTo: (id: string) => void
  resetSavedRecipeToNavigateBackTo: () => void
}

const useCurrentRecipeStore = create<TCurrentRecipeStore>(set => ({
  setRecipeIdToNavigateBackTo: (recipeId: string) => set({ currentRecipeId: recipeId }),
  resetSavedRecipeToNavigateBackTo: () => set({ currentRecipeId: undefined })
}))

export const useIndexPageCurrentRecipe = (): TCurrentRecipeStore => {
  const { currentRecipeId, setRecipeIdToNavigateBackTo, resetSavedRecipeToNavigateBackTo } = useCurrentRecipeStore()
  return { currentRecipeId, setRecipeIdToNavigateBackTo, resetSavedRecipeToNavigateBackTo }
}
