import { HorizontalCenterLayout } from 'layouts'
import * as React from 'react'
import Banner from '~/components/Banner'
import { SearchBar } from '~/components/SearchBar/SearchBar'
import { PillButton, ErrorPillButton } from '~/components/atoms/PillButton/PillButton.component'
import { capitalize } from '~/utils/general.utils'

type RecipeFilterHeaderProps = BannerProps & SearchBarProps & CategoryTogglesProps & PreviewProps & UserProps

type BannerProps = { onBannerClick?: () => void }

type SearchBarProps = {
  searchBarValue: string | undefined
  totalNbOfRecipes: number
  onSearch: (newQuery: string) => void
  setSearchBarValue: (value: string | undefined) => void
}

type CategoryTogglesProps = {
  categorySelections: { [key: string]: boolean }
  onCategoryToggle: (category: string) => void
}

type PreviewProps = {
  showPreview: boolean
  onTogglePreview: () => void
}

type UserProps = {
  isLoggedIn: boolean
}

export const RecipeFilterHeader: React.FC<RecipeFilterHeaderProps> = ({
  onBannerClick,
  searchBarValue,
  totalNbOfRecipes,
  onSearch,
  setSearchBarValue,
  categorySelections,
  onCategoryToggle,
  showPreview,
  onTogglePreview,
  isLoggedIn
}) => {
  return (
    <div>
      <Banner onClick={onBannerClick} />
      <HorizontalCenterLayout className="mt-8">
        <div className="max-w-xl w-full">
          <SearchBar
            onSearch={onSearch}
            placeholder={`Zoeken in ${totalNbOfRecipes} recepten...`}
            value={searchBarValue}
            onChange={setSearchBarValue}
          />
        </div>
        <div className="flex flex-row justify-center flex-wrap my-4">
          {Object.entries(categorySelections).map(([category, enabled]) => {
            return (
              <PillButton key={category} className="mr-2 mt-2" toggleValue={enabled} onClick={() => onCategoryToggle(category)}>
                {capitalize(category)}
              </PillButton>
            )
          })}
          {isLoggedIn && (
            <ErrorPillButton toggleValue={showPreview} onClick={onTogglePreview} className="mx-2 mt-2">
              🫣 Preview
            </ErrorPillButton>
          )}
        </div>
      </HorizontalCenterLayout>
    </div>
  )
}
