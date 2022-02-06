import * as React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { HorizontalCenterLayout } from 'layouts'
import { useEffect, useReducer, useState } from 'react'
import colors from 'public/colors'
import getPreviewImage from 'api/getPreviewImage'
import { addRecipe, updateRecipe } from 'api/addRecipe'
import { useRouter } from 'next/router'
import remark from 'remark'
import html from 'remark-html'
import { TRecipe } from 'backend/types/recipes.types'
import Button from '~/components/atoms/Button/Button'
import Card from '~/components/Card/Card'
import ImageIcon from '~/components/icons/Image.icon'
import Input from '~/components/atoms/Input/Input'
import Loading from '~/components/Loading'
import MarkdownSnippet from '~/components/MarkdownSnippet/MarkdownSnippet'
import BackButton from '~/components/atoms/BackButton/BackButton'
import MarkdownInputArea from '~/components/atoms/MarkdownInputArea/MarkdownInputArea.component'

enum EFormKeys {
  recipeId = 'recipeId',
  recipeTitle = 'recipeTitle',
  recipeUrl = 'recipeUrl',
  imgUrl = 'imgUrl',
  instructions = 'instructions',
  ingredients = 'ingredients',
  tips = 'tips',
  imgFile = 'imgFile'
}

type TFormState = Partial<
  {
    [formKey in EFormKeys]: {
      value: string
      formattedValue: string
    }
  }
>

type TSimpleFormAction = {
  key: EFormKeys
  value: string
  formattedValue?: string
  simple: true
}

const createFormAction = (key: EFormKeys, value: string, formattedValue?: string): TSimpleFormAction => ({
  key,
  value,
  formattedValue,
  simple: true
})

type TPrefillFormAction = {
  recipe: TRecipe
  simple: false
}

type TFormAction = TSimpleFormAction | TPrefillFormAction

const formReducer = (state: TFormState, action: TFormAction): TFormState => {
  if (action.simple) {
    return {
      ...state,
      [action.key]: {
        value: action.value,
        formattedValue: action.formattedValue || action.value.trim()
      }
    }
  }
  const { id, url, title, instructions } = action.recipe
  return {
    [EFormKeys.recipeId]: {
      value: id,
      formattedValue: id
    },
    [EFormKeys.recipeTitle]: {
      value: title,
      formattedValue: title
    },
    [EFormKeys.recipeUrl]: {
      value: url,
      formattedValue: url
    },
    [EFormKeys.instructions]: {
      value: instructions,
      formattedValue: ''
    }
  }
}

const AddRecipePage: NextPage = () => {
  const router = useRouter()
  const [shouldUpdateRecipe, setShouldUpdateRecipe] = useState(!!router.query.prefilled)

  const [formState, dispatchFormAction] = useReducer(formReducer, {})
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
          recipe,
          simple: false
        })
        setRecipeImgSrcUrl(recipe.imgUrl)
      } catch (error) {
        // Should not happen
        setShouldUpdateRecipe(false)
      }
    }
  }, [])

  const isFormValid = (!!formState.recipeTitle?.formattedValue && !!formState.recipeUrl?.formattedValue) || true

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (isFormValid) {
      setIsSubmitting(true)
      try {
        const formData = {
          title: formState.recipeTitle?.formattedValue || '', // TODO: typing doesn't know isFormValid guarantees non empty values
          url: formState.recipeUrl?.formattedValue || '',
          imgUrl: recipeImgSrcUrl || '',
          previewImgFileData: formState.imgFile?.formattedValue || undefined,
          instructions: formState.instructions?.value || undefined
        }
        const result =
          shouldUpdateRecipe && formState.recipeId
            ? await updateRecipe(formData, formState.recipeId.formattedValue)
            : await addRecipe(formData)

        if (result.recipeId && result.title) {
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
    const key = event.target.name as EFormKeys
    const { value } = event.target

    dispatchFormAction(createFormAction(key, value))

    setIsSubmitOnError(false)

    if (event.target.name === EFormKeys.recipeUrl || event.target.name === EFormKeys.imgUrl) {
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
        dispatchFormAction(createFormAction(EFormKeys.imgFile, fileReader.result as string))
      }
      fileReader.onerror = _ => {
        setRecipeImgPreviewError(true)
      }
      fileReader.readAsDataURL(file)
    }
  }

  const handleTextAreaChange = (key: EFormKeys) => {
    return (textAreaValue: string, markdownValue: string) => {
      dispatchFormAction(createFormAction(key, textAreaValue, markdownValue))
    }
  }

  const setImageSource = async () => {
    if (formState.recipeUrl?.formattedValue && !formState.imgUrl?.formattedValue) {
      try {
        setRecipeImgLoading(true)
        if (formState.recipeUrl?.formattedValue !== recipeImgSrcUrl) {
          const previewImgUrl = await getPreviewImage(formState.recipeUrl?.formattedValue)
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
    } else if (formState.imgUrl?.formattedValue) {
      setRecipeImgSrcUrl(formState.imgUrl?.formattedValue)
      setRecipeImgLoading(false)
    }
  }

  const handleRecipePreviewImgError = () => {
    setRecipeImgSrcUrl('')
    setRecipeImgPreviewError(true)
  }

  return (
    <HorizontalCenterLayout className="h-screen flex md:justify-center items-center p-2 md:p-4">
      <Card className="p-4 md:p-8 w-full lg:w-11/12 lg:max-w-6xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <fieldset>
            <div className="flex flex-col md:flex-row items-stretch">
              <div className="flex-1">
                <div className="grid grid-rows-1 gap-y-3">
                  <Input label="Naam" id={EFormKeys.recipeTitle} onChange={handleInputChange} value={formState.recipeTitle?.value} />
                  <span className="flex flex-row w-full items-center mt-4">
                    <h6 className="italic font-semibold mr-2 text-primary">Optioneel</h6>
                    <hr className="flex-1 my-4 border-t-4 border-primary border-dotted" />
                  </span>
                  <Input
                    label="Link naar het recept"
                    id={EFormKeys.recipeUrl}
                    onChange={handleInputChange}
                    value={formState.recipeUrl?.value}
                    onBlur={setImageSource}
                  />

                  <Input label="Link naar een afbeelding" id={EFormKeys.imgUrl} onChange={handleInputChange} onBlur={setImageSource} />
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
            <MarkdownInputArea
              label="Instructies"
              id={EFormKeys.instructions}
              textAreaValue={formState.instructions?.value}
              markdownValue={formState.instructions?.formattedValue}
              onChange={handleTextAreaChange(EFormKeys.instructions)}
            />
            <span className="flex flex-row w-full items-center mt-4">
              <hr className="flex-1 my-4 border-t-4 border-primary border-dotted" />
            </span>
            <MarkdownInputArea
              label="Lizzy's tips"
              id={EFormKeys.tips}
              textAreaValue={formState.tips?.value}
              markdownValue={formState.tips?.formattedValue}
              onChange={handleTextAreaChange(EFormKeys.tips)}
            />
          </fieldset>
          <span className="flex flex-1 justify-center">
            {!isSubmitting && (
              <Button disabled={!isFormValid} className="w-full max-w-md" type="submit">
                Opslaan!
              </Button>
            )}
            {isSubmitting && <Loading />}
          </span>

          {isSubmitOnError && (
            <h6 className="text-error font-bold text-center mt-2">Kon recept niet opslaan. Is alles correct ingevuld?</h6>
          )}
        </form>
      </Card>

      <BackButton />
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
