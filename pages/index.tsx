import * as React from 'react'
import { GetStaticProps, NextPage } from 'next'
import { HorizontalCenterLayout } from 'layouts'
import useFadeInStyle from 'hooks/useFadeInStyle'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { RecipesApi } from 'api/recipes/Recipes.api'
import { useVersion } from 'hooks/useVersion.hook'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn.hook'
import { useIndexPageState } from 'pages-state/index/state'
import { TRecipe } from 'backend/types/recipes.types'
import { SearchBar } from '~/components/SearchBar/SearchBar'
import RecipeList from '~/components/RecipeList'
import Banner from '~/components/Banner'
import { ErrorPillButton, PillButton } from '~/components/atoms/PillButton/PillButton.component'
import { VersionDisclaimerFooter } from '~/components/VersionDisclaimerFooter'
import { capitalize, disableKeys } from '~/utils/general.utils'
import { RecipeFilterHeader } from '~/components/molecules/RecipeFilterHeader/RecipeFilterHeader'

type TProps = {
  categories: string[]
  totalNbOfRecipes: number
  initialRecipes?: TRecipe[]
}

const widthLimitClasses = 'w-full max-w-screen-md xl:max-w-screen-xl'

const useHydratedRecipes = (loadedRecipes: TRecipe[] | undefined) => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (!hydrated && loadedRecipes) {
      setHydrated(true)
    }
  }, [hydrated, loadedRecipes])

  return hydrated
}

const IndexPage: NextPage<TProps> = ({ categories, totalNbOfRecipes, initialRecipes }) => {
  useVersion()
  const fadeInStyle = useFadeInStyle()
  const isLoggedIn = useIsLoggedIn()
  const router = useRouter()

  const [state, setState] = useIndexPageState(categories)
  const { categorySelections, recipes: currRecipes, searchQuery, showPreview, focusedRecipeId } = state
  const [searchBarValue, setSearchBarValue] = useState(searchQuery)
  const [ignoreFocusedRecipeId, setIgnoreFocusedRecipeId] = useState(false)
  const hydrated = useHydratedRecipes(currRecipes)

  const onSearch = (newQuery: string) => {
    setState({ searchQuery: newQuery, categorySelections: disableKeys(categorySelections), showPreview: false })
  }

  const onCategoryToggle = (category: string) => {
    const newCategorySelections = { ...categorySelections, [category]: !categorySelections[category] }
    setState({ categorySelections: newCategorySelections, searchQuery: undefined, showPreview: false })
    setSearchBarValue(undefined)
  }

  const onTogglePreview = () => {
    setState({ searchQuery: undefined, categorySelections: disableKeys(categorySelections), showPreview: !showPreview })
  }

  return (
    <div className={`${fadeInStyle} flex flex-col min-h-screen`}>
      <div className="mx-4 flex-1">
        <RecipeFilterHeader
          onBannerClick={() => router.push('add-recipe')}
          totalNbOfRecipes={totalNbOfRecipes}
          searchBarValue={searchBarValue}
          setSearchBarValue={setSearchBarValue}
          onSearch={onSearch}
          categorySelections={categorySelections}
          onCategoryToggle={onCategoryToggle}
          isLoggedIn={Boolean(isLoggedIn)}
          showPreview={showPreview}
          onTogglePreview={onTogglePreview}
        />
        <hr className="mb-8 border-t-4 border-primary" />
        <HorizontalCenterLayout className="md:mx-4">
          <div className={widthLimitClasses}>
            <RecipeList
              recipes={hydrated ? currRecipes : initialRecipes}
              scrollToRecipeWithId={ignoreFocusedRecipeId ? undefined : focusedRecipeId}
              onRecipeClick={recipeId => {
                setIgnoreFocusedRecipeId(true)
                setState({ ...state, focusedRecipeId: recipeId })
              }}
            />
            {currRecipes && currRecipes.length === 0 && (
              <HorizontalCenterLayout>
                <h2 className="text-darkest my-8">Geen recepten gevonden 😭</h2>
                <h3 className="text-primary">Misschien kan je iets anders proberen zoeken?</h3>
              </HorizontalCenterLayout>
            )}
          </div>
        </HorizontalCenterLayout>
      </div>
      <VersionDisclaimerFooter />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const totalNbOfRecipes = await RecipesApi.totalNumberOfRecipes()
  const categories = new Set((await RecipesApi.getCategoryCounts()).map(c => c.categoryId))
  const initialRecipes = (await RecipesApi.all()).map(({ id, title, blurHash, imgUrl }, index) => {
    if (index < 12) {
      return { id, title, blurHash, imgUrl }
    }
    return { id, title }
  })
  const props: TProps = {
    categories: Array.from(categories),
    totalNbOfRecipes,
    initialRecipes
  }
  return {
    props,
    revalidate: 60
  }
}

export default IndexPage
