import * as React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { HorizontalCenterLayout } from 'layouts'
import { useEffect, useReducer, useState } from 'react'
import colors from 'public/colors'
import getPreviewImage from 'api/getPreviewImage'
import { addRecipe, updateRecipe } from 'api/addRecipe'
import { useRouter } from 'next/router'
import { TRecipe } from 'backend/types/recipes.types'
import { addRecipeFormReducer, ERecipeKeys } from 'reducers/add-recipe.reducer'
import Button from '~/components/atoms/Button/Button'
import Card from '~/components/Card/Card'
import ImageIcon from '~/components/icons/Image.icon'
import Input from '~/components/atoms/Input/Input'
import Loading from '~/components/Loading'
import BackButton from '~/components/atoms/BackButton/BackButton'
import MarkdownInputArea from '~/components/atoms/MarkdownInputArea/MarkdownInputArea.component'
import ListInput from '~/components/atoms/ListInput/ListInput.component'

const Separator: React.FC<{ label?: string }> = ({ label }) => (
  <span className="flex flex-row w-full items-center mt-4">
    {!!label && <h6 className="italic font-semibold mr-2 text-primary">{label}</h6>}
    <hr className="flex-1 my-4 border-t-4 border-primary border-dotted" />
  </span>
)

const AddRecipePage: NextPage = () => {
  const router = useRouter()
  const [shouldUpdateRecipe, setShouldUpdateRecipe] = useState(!!router.query.prefilled)

  const [formState, dispatchFormAction] = useReducer(addRecipeFormReducer, {})
  const [recipeImgSrcUrl, setRecipeImgSrcUrl] = useState('')
  const [recipeImgPreviewError, setRecipeImgPreviewError] = useState(false)
  const [recipeImgLoading, setRecipeImgLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitOnError, setIsSubmitOnError] = useState(false)

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
  }, [])

  const isFormValid = !!formState.recipeTitle && !!formState.recipeUrl

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (isFormValid) {
      setIsSubmitting(true)
      try {
        const formData = {
          title: formState.recipeTitle || '', // TODO: typing doesn't know isFormValid guarantees non empty values
          url: formState.recipeUrl,
          imgUrl: recipeImgSrcUrl,
          previewImgFileData: formState.imgFile,
          instructions: formState.instructions,
          tips: formState.tips
        }
        const result =
          shouldUpdateRecipe && formState.recipeId ? await updateRecipe(formData, formState.recipeId) : await addRecipe(formData)

        if (result.recipeId && result.title) {
          // TODO: fix wait for recipe to be ready in BE
          setTimeout(() => {
            router.push(`/recipe/${result.recipeId}`)
          }, 1000)
        }
      } catch (error) {
        console.error('Error submitting recipe', error)
        setIsSubmitOnError(true)
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

    setIsSubmitOnError(false)

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
        // const size = new TextEncoder().encode(fileReader.result as string).length
        // if (size > 1000000) {
        //   // TODO
        //   alert('File too big (> 1MB)')
        //   return
        // }

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
          const previewImgUrl = await getPreviewImage(formState.recipeUrl)
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

  // const handleAddIngredient = (ingr: string) => {
  //   dispatchFormAction(createFormAction(EFormKeys.ingredients, ingr.trim()))
  // }

  // const handleRemoveIngredient = (index: number) => {
  //   dispatchFormAction()
  // }

  return (
    <HorizontalCenterLayout className="flex md:justify-center items-center p-2 md:p-4">
      <Card className="mt-4 mb-16 p-4 md:p-8 w-full lg:w-11/12 lg:max-w-6xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <fieldset>
            <div className="flex flex-col md:flex-row items-stretch">
              <div className="flex-1">
                <div className="grid grid-rows-1 gap-y-3">
                  <Input label="Naam" id={ERecipeKeys.recipeTitle} onChange={handleInputChange} value={formState.recipeTitle || ''} />
                  <Separator label="Optioneel" />
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
                    <p className="mr-2 whitespace-nowrap italic">Of upload:</p>
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
            {/* <ListInput
              label="Ingrediënten"
              id={EFormKeys.ingredients}
              items={['een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien']}
              onAdd={newItem}
            />
            <Separator /> */}

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
          <span className="flex flex-1 justify-center">
            {!isSubmitting && (
              <Button disabled={!isFormValid} className="w-full max-w-md" type="submit">
                Opslaan!
              </Button>
            )}
            {isSubmitting && <Loading height={40} width={66} />}
          </span>

          {isSubmitOnError && (
            <h6 className="text-error font-bold text-center mt-2">Kon recept niet opslaan. Is alles correct ingevuld?</h6>
          )}
        </form>
      </Card>
      <span className="fab-container">
        <BackButton />
      </span>
    </HorizontalCenterLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { cookies } = context.req

  if (!cookies.authToken) {
    return {
      redirect: {
        destination: '/login?redirectTo=add-recipe?prefilled=true',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default AddRecipePage