import * as React from 'react'
import { GetStaticProps, NextPage } from 'next'
import { HorizontalCenterLayout } from 'layouts'
import useFadeInStyle from 'hooks/useFadeInStyle'
import { useState } from 'react'
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

type TProps = {
  categories: string[]
  totalNbOfRecipes: number
  initialRecipes?: TRecipe[]
}

const widthLimitClasses = 'w-full max-w-screen-md xl:max-w-screen-xl'

const IndexPage: NextPage<TProps> = ({ categories, totalNbOfRecipes, initialRecipes }) => {
  useVersion()
  const fadeInStyle = useFadeInStyle()
  const isLoggedIn = useIsLoggedIn()
  const router = useRouter()

  const [state, setState] = useIndexPageState(categories)
  const { categorySelections, recipes: currRecipes, searchQuery, showPreview, focusedRecipeId } = state
  const [searchBarValue, setSearchBarValue] = useState(searchQuery)
  const [ignoreFocusedRecipeId, setIgnoreFocusedRecipeId] = useState(false)

  const onSearch = (newQuery: string) => {
    setState({ searchQuery: newQuery, categorySelections: disableKeys(categorySelections), showPreview: false })
  }

  const onCategoryToggle = (category: string) => {
    const newCategorySelections = { ...categorySelections, [category]: !categorySelections[category] }
    setState({ categorySelections: newCategorySelections, searchQuery: undefined, showPreview: false })
    setSearchBarValue(undefined)
  }

  return (
    <div className={`${fadeInStyle} flex flex-col min-h-screen`}>
      <div className="mx-4 flex-1">
        <Banner onClick={() => router.push('add-recipe')} />
        <HorizontalCenterLayout className="my-8 md:mx-4">
          <div className="max-w-xl w-full">
            <SearchBar
              onSearch={onSearch}
              placeholder={`Zoeken in ${totalNbOfRecipes} recepten...`}
              value={searchBarValue}
              onChange={setSearchBarValue}
            />
          </div>
          <div className={`${widthLimitClasses} flex flex-row justify-center flex-wrap mt-4`}>
            {Object.entries(categorySelections).map(([category, enabled]) => {
              return (
                <PillButton key={category} className="mr-2 mt-2" toggleValue={enabled} onClick={() => onCategoryToggle(category)}>
                  {capitalize(category)}
                </PillButton>
              )
            })}
            {isLoggedIn && (
              <ErrorPillButton
                toggleValue={showPreview}
                onClick={() =>
                  setState({ searchQuery: undefined, categorySelections: disableKeys(categorySelections), showPreview: !showPreview })
                }
                className="mx-2 mt-2"
              >
                🫣 Preview
              </ErrorPillButton>
            )}
          </div>
        </HorizontalCenterLayout>
        <hr className="mb-8 border-t-4 border-primary" />
        <HorizontalCenterLayout className="md:mx-4">
          <div className={widthLimitClasses}>
            <RecipeList
              recipes={currRecipes || initialRecipes}
              scrollToRecipeWithId={ignoreFocusedRecipeId ? undefined : focusedRecipeId}
              skipAnimation={Boolean(focusedRecipeId)}
              refreshKey={state.filtersKey}
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
    if (index < 20) {
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
