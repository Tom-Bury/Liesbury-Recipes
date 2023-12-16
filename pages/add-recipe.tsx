import * as React from 'react'
import { NextPage } from 'next'
import { HorizontalCenterLayout } from 'layouts'
import { useEffect, useReducer, useState } from 'react'
import colors from 'public/colors'
import { useRouter } from 'next/router'
import { TRecipe } from 'backend/types/recipes.types'
import { addRecipeFormReducer, ERecipeKeys } from 'reducers/add-recipe.reducer'
import useFadeInStyle from 'hooks/useFadeInStyle'
import { PreviewImageApi } from 'api/preview-image/PreviewImage.api'
import { RecipesApi } from 'api/recipes/Recipes.api'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn.hook'
import Button from '~/components/atoms/Button/Button'
import Card from '~/components/Card/Card'
import ImageIcon from '~/components/icons/Image.icon'
import Input from '~/components/atoms/Input/Input'
import Loading from '~/components/Loading'
import MarkdownInputArea from '~/components/atoms/MarkdownInputArea/MarkdownInputArea.component'
import { getApiErrorCode } from '~/utils/error.utils'
import { RegularListInput } from '~/components/atoms/ListInput/RegularListInput.component'
import { PillButtonListInput } from '~/components/atoms/ListInput/PillButtonListInput.component'

const Separator: React.FC<{ label?: string }> = ({ label }) => (
  <span className="flex flex-row w-full items-center mt-4">
    {!!label && <h6 className="italic font-semibold mr-2 text-primary">{label}</h6>}
    <hr className="flex-1 my-4 border-t-4 border-primary border-dotted" />
  </span>
)

const AddRecipePage: NextPage = () => {
  const router = useRouter()
  const isLoggedIn = useIsLoggedIn()

  useEffect(() => {
    if (isLoggedIn === false) {
      router.replace('/login?redirectTo=add-recipe?prefilled=true')
    }
  }, [isLoggedIn, router])

  const [shouldUpdateRecipe, setShouldUpdateRecipe] = useState(!!router.query.prefilled)

  const [formState, dispatchFormAction] = useReducer(addRecipeFormReducer, {})
  const [recipeImgSrcUrl, setRecipeImgSrcUrl] = useState('')
  const [recipeImgPreviewError, setRecipeImgPreviewError] = useState(false)
  const [recipeImgLoading, setRecipeImgLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | undefined>()

  const [animateAway, setAnimateAway] = useState(false)
  const fadeInStyle = useFadeInStyle()

  useEffect(() => {
    if (shouldUpdateRecipe) {
      try {
        const recipe = JSON.parse(localStorage.getItem('recipe') || '') as TRecipe
        localStorage.removeItem('recipe')
        dispatchFormAction({
          type: 'full-recipe',
          recipe
        })
        setRecipeImgSrcUrl(recipe.imgUrl || '')
      } catch (error) {
        // Should not happen
        setShouldUpdateRecipe(false)
      }
    }
  }, [shouldUpdateRecipe])

  const [allAvailableCategories, setAllAvailableCategories] = useState<Set<string> | undefined>()

  useEffect(() => {
    ;(async () => {
      const categoryCounts = await RecipesApi.getCategoryCounts()
      setAllAvailableCategories(new Set(categoryCounts.map(category => category.categoryId)))
    })()
  }, [])

  if (!isLoggedIn) {
    return <></>
  }

  const isFormValid = !!formState.recipeTitle && !!recipeImgSrcUrl

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault()
    if (isFormValid) {
      setIsSubmitting(true)
      try {
        const formData = {
          title: formState.recipeTitle || '', // TODO: typing doesn't know isFormValid guarantees non empty values
          url: formState.recipeUrl,
          imgUrl: formState.imgFile ? undefined : recipeImgSrcUrl,
          previewImgFileData: formState.imgFile,
          instructions: formState.instructions,
          ingredients: formState.ingredients,
          categories: formState.categories,
          tips: formState.tips,
          isPreview: event.nativeEvent.submitter?.id === 'save-preview'
        }
        const result =
          shouldUpdateRecipe && formState.recipeId ? await RecipesApi.update(formState.recipeId, formData) : await RecipesApi.new(formData)

        if (result.id) {
          setAnimateAway(true)
          router.replace(`/recipe/${result.id}`)
        }
      } catch (error) {
        console.error('Error submitting recipe', error)
        const errorCode = getApiErrorCode(error)
        switch (errorCode) {
          case 401:
            localStorage.setItem(
              'recipe',
              JSON.stringify({
                title: formState.recipeTitle || '',
                url: formState.recipeUrl,
                imgUrl: recipeImgSrcUrl,
                instructions: formState.instructions,
                ingredients: formState.ingredients,
                categories: formState.categories,
                tips: formState.tips
              })
            )
            router.push('/login?redirectTo=add-recipe?prefilled=true')
            break
          case 413:
            setSubmitErrorMessage('Te groot om op te slaan. Let er op dat de afbeelding kleiner dan 5MB is.')
            break
          default:
            setSubmitErrorMessage(`Kon recept niet opslaan. (${errorCode})`)
            break
        }
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = async event => {
    const key = event.target.name as ERecipeKeys
    const { value } = event.target

    dispatchFormAction({
      type: 'simple',
      key: key as any, // TODO: enforce typing to be part of enum?
      value
    })

    setSubmitErrorMessage(undefined)

    if (event.target.name === ERecipeKeys.recipeUrl || event.target.name === ERecipeKeys.imgUrl) {
      setRecipeImgPreviewError(false)
      setRecipeImgLoading(false)
    }
  }

  const handleFileInputChange: React.ChangeEventHandler<HTMLInputElement> = async event => {
    if (event.target.files && event.target.files?.length > 0) {
      const file = event.target.files?.[0]
      const fileReader = new FileReader()
      fileReader.onload = () => {
        const fileLocalUrl = URL.createObjectURL(file)
        setRecipeImgPreviewError(false)
        setRecipeImgSrcUrl(fileLocalUrl)
        dispatchFormAction({
          type: 'simple',
          key: ERecipeKeys.imgFile,
          value: fileReader.result as string
        })
      }
      fileReader.onerror = _ => {
        setRecipeImgPreviewError(true)
      }
      fileReader.readAsDataURL(file)
    }
  }

  const handleTextAreaChange = (key: ERecipeKeys.instructions | ERecipeKeys.tips) => {
    return (markdownInput: string) => {
      dispatchFormAction({
        type: 'simple',
        key,
        value: markdownInput
      })
    }
  }

  const setImageSource = async () => {
    if (formState.recipeUrl && !formState.imgUrl) {
      try {
        setRecipeImgLoading(true)
        if (formState.recipeUrl !== recipeImgSrcUrl) {
          const previewImgUrl = await PreviewImageApi.scrape(formState.recipeUrl)
          setRecipeImgSrcUrl(previewImgUrl)
          setRecipeImgPreviewError(false)
        }
      } catch (error) {
        console.error('Error fetching preview image', error)
        setRecipeImgSrcUrl('')
        setRecipeImgPreviewError(true)
      } finally {
        setRecipeImgLoading(false)
      }
    } else if (formState.imgUrl) {
      setRecipeImgSrcUrl(formState.imgUrl)
      setRecipeImgLoading(false)
    }
  }

  const handleRecipePreviewImgError = () => {
    setRecipeImgSrcUrl('')
    setRecipeImgPreviewError(true)
  }

  const handleAddListItem = (key: ERecipeKeys.ingredients) => (value: string) => {
    dispatchFormAction({
      type: 'list-add',
      key,
      value
    })
  }

  const handleRemoveListItem = (key: ERecipeKeys.ingredients) => (index: number) => {
    dispatchFormAction({
      type: 'list-remove',
      key,
      index
    })
  }

  const handleAddSetItem = (key: ERecipeKeys.categories) => (value: string) => {
    dispatchFormAction({
      type: 'set-add',
      key,
      value
    })
  }

  const handleRemoveSetItem = (key: ERecipeKeys.categories) => (value: string) => {
    dispatchFormAction({
      type: 'set-remove',
      key,
      value
    })
  }

  return (
    <HorizontalCenterLayout className={`flex md:justify-center items-center p-2 md:p-4 ${fadeInStyle}`}>
      <Card
        className={`mt-4 mb-16 p-4 md:p-8 w-full lg:w-11/12 lg:max-w-6xl transition-opacity duration-500 ${animateAway ? 'opacity-0' : ''}`}
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <fieldset>
            <div className="flex flex-col md:flex-row items-stretch">
              <div className="flex-1">
                <div className="grid grid-rows-1 gap-y-3">
                  <Input label="Naam" id={ERecipeKeys.recipeTitle} onChange={handleInputChange} value={formState.recipeTitle || ''} />
                  <Separator label="Afbeelding" />
                  <Input
                    label="Link naar het recept"
                    id={ERecipeKeys.recipeUrl}
                    onChange={handleInputChange}
                    value={formState.recipeUrl || ''}
                    onBlur={setImageSource}
                  />
                  <Input
                    label="Link naar een afbeelding"
                    id={ERecipeKeys.imgUrl}
                    value={formState.imgUrl || ''}
                    onChange={handleInputChange}
                    onBlur={setImageSource}
                  />
                  <span className="flex flex-row w-full items-center">
                    <p className="mr-2 whitespace-nowrap font-semibold">Of upload:</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full text-sm text-dark hover:text-darkest"
                      onChange={handleFileInputChange}
                    />
                  </span>
                </div>
              </div>

              <span className="h-1 w-auto md:h-auto md:w-1 my-4 md:my-0 mx-0 md:mx-4 bg-primary" />

              <div className="flex-1 flex flex-col items-center justify-center">
                {recipeImgSrcUrl && <img alt="Recipe preview" src={recipeImgSrcUrl} onError={handleRecipePreviewImgError} />}
                {!recipeImgSrcUrl && (
                  <span className="py-16">
                    <ImageIcon className={recipeImgLoading ? 'animate-bounce' : ''} width={48} height={48} fill={colors.dark} />
                  </span>
                )}
                {recipeImgPreviewError && <p className="mt-2 italic bold text-primary text-center">Preview kan niet geladen worden</p>}
              </div>
            </div>
          </fieldset>
          <fieldset className="mt-4">
            <RegularListInput
              label="Ingrediënten"
              id={ERecipeKeys.ingredients}
              items={formState.ingredients}
              onAdd={handleAddListItem(ERecipeKeys.ingredients)}
              onRemove={handleRemoveListItem(ERecipeKeys.ingredients)}
            />
            <Separator />
            <PillButtonListInput
              label="Categorieën"
              id={ERecipeKeys.categories}
              enabledItems={formState.categories}
              extraItems={allAvailableCategories}
              onAdd={handleAddSetItem(ERecipeKeys.categories)}
              onRemove={handleRemoveSetItem(ERecipeKeys.categories)}
            />
            <Separator />
            <MarkdownInputArea
              label="Instructies"
              id={ERecipeKeys.instructions}
              textAreaValue={formState.instructions || ''}
              onChange={handleTextAreaChange(ERecipeKeys.instructions)}
            />
            <Separator />
            <MarkdownInputArea
              label="Lizzy's tips"
              id={ERecipeKeys.tips}
              textAreaValue={formState.tips || ''}
              onChange={handleTextAreaChange(ERecipeKeys.tips)}
            />
          </fieldset>
          {!isSubmitting && (
            <div className="flex flex-col md:flex-row gap-2 justify-center w-full">
              <Button disabled={!isFormValid} className="w-full md:w-1/2" type="submit" id="save">
                Opslaan
              </Button>
              <Button disabled={!isFormValid} className="w-full md:w-1/2" type="submit" id="save-preview">
                Als preview opslaan
              </Button>
            </div>
          )}
          {isSubmitting && <Loading className="justify-self-center" height={40} width={66} />}

          {submitErrorMessage && submitErrorMessage.length > 0 && (
            <h6 className="text-error font-bold text-center mt-2">{submitErrorMessage}</h6>
          )}
        </form>
      </Card>
    </HorizontalCenterLayout>
  )
}

export default AddRecipePage
