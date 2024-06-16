import { HorizontalCenterLayout } from 'layouts'
import * as React from 'react'
import { PropsWithChildren, forwardRef, useImperativeHandle, useRef } from 'react'
import { useScrollPosition } from 'hooks/useScrollPosition'
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

export type RecipeFilterHeaderRef = {
  scrollWindowToStickyTop: () => void
  isCollapsed: () => boolean
}

const FRONT_IMAGE_DIMENSIONS = {
  width: 375,
  height: 240
}

const SCROLL_BANNER_IMAGE_RESIZE_THRESHOLD = 100

const PAGE_TITLE = `Liesbury's receptenlijst`

export const RecipeFilterHeader = forwardRef<RecipeFilterHeaderRef, PropsWithChildren<RecipeFilterHeaderProps>>(
  (
    {
      onBannerClick,
      searchBarValue,
      totalNbOfRecipes,
      onSearch,
      setSearchBarValue,
      categorySelections,
      onCategoryToggle,
      showPreview,
      onTogglePreview,
      isLoggedIn,
      children
    },
    ref
  ) => {
    const imgBannerRef = useRef<HTMLDivElement>(null)
    const { scrollY } = useScrollPosition()

    const diff = Math.floor(scrollY / 3)
    const imgHeight = Math.max(FRONT_IMAGE_DIMENSIONS.height - diff, SCROLL_BANNER_IMAGE_RESIZE_THRESHOLD)
    const dummyHeight = Math.min(diff, SCROLL_BANNER_IMAGE_RESIZE_THRESHOLD)

    useImperativeHandle(
      ref,
      () => ({
        scrollWindowToStickyTop: () => {
          if (imgBannerRef.current) {
            window.scrollTo(0, imgBannerRef.current.offsetHeight + 6)
          }
        },
        isCollapsed: () => {
          if (imgBannerRef.current) {
            return window.scrollY > imgBannerRef.current.offsetHeight
          }
          return false
        }
      }),
      [imgBannerRef]
    )

    return (
      <div>
        <HorizontalCenterLayout ref={imgBannerRef} className="bg-lightest px-4">
          <div
            className="w-full"
            style={{
              marginTop: dummyHeight
            }}
          />
          <div onClick={onBannerClick} onKeyPress={onBannerClick} tabIndex={0} role="button">
            <img
              src="/images/liesbury-recipes-banner.webp"
              alt={PAGE_TITLE}
              className="cursor-pointer w-auto object-contain"
              style={{
                height: imgHeight
              }}
            />
          </div>
          <h1 className="my-4 text-darkest text-center z-20">{PAGE_TITLE}</h1>
        </HorizontalCenterLayout>
        <HorizontalCenterLayout className="pt-4 sticky top-0 bg-lightest z-10 border-b-4 border-primary shadow-bottom">
          <div className="px-4 max-w-xl w-full">
            <SearchBar
              onSearch={onSearch}
              placeholder={`Zoeken in ${totalNbOfRecipes} recepten...`}
              value={searchBarValue}
              onChange={setSearchBarValue}
            />
          </div>
          <div className="flex flex-row justify-center flex-wrap mt-2 mb-4 px-4">
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
        {children}
      </div>
    )
  }
)
