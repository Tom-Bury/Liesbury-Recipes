import * as React from 'react'
import { NextPage } from 'next'
import { HorizontalCenterLayout } from 'layouts'
import { useReducer, useState } from 'react'
import colors from 'public/colors'
import getPreviewImage from 'api/getPreviewImage'
import addRecipe from 'api/addRecipe'
import { useRouter } from 'next/router'
import Button from '~/components/atoms/Button/Button'
import Card from '~/components/Card/Card'
import ImageIcon from '~/components/icons/Image.icon'
import Input from '~/components/atoms/Input/Input'
import Loading from '~/components/Loading'

enum EFormKeys {
  recipeTitle = 'recipeTitle',
  recipeUrl = 'recipeUrl',
  imgUrl = 'imgUrl'
}

type TFormState = Partial<
  {
    [formKey in EFormKeys]: string
  }
>

type TFormAction = {
  key: EFormKeys
  value: string
}

const formReducer = (state: TFormState, action: TFormAction): TFormState => {
  return {
    ...state,
    [action.key]: action.value
  }
}

const AddRecipePage: NextPage = () => {
  const router = useRouter()

  const [formState, dispatchFormAction] = useReducer(formReducer, {})
  const [recipeImgSrcUrl, setRecipeImgSrcUrl] = useState('')
  const [recipeImgPreviewError, setRecipeImgPreviewError] = useState(false)
  const [recipeImgLoading, setRecipeImgLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitOnError, setIsSubmitOnError] = useState(false)

  const isFormValid = !!formState.recipeTitle && !!formState.recipeUrl

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (isFormValid) {
      setIsSubmitting(true)
      try {
        const result = await addRecipe({
          title: formState.recipeTitle || '', // TODO: typing doesn't know isFormValid guarantees non empty values
          url: formState.recipeUrl || '',
          imgUrl: recipeImgSrcUrl
        })

        if (result.recipeId && result.title) {
          router.push(`/recipe/${result.recipeId}`)
        }
      } catch (error) {
        console.error('Error submitting recipe', error)
        setIsSubmitOnError(true)
      } finally {
        setIsSubmitting(false)
      }
    }
    console.log(formState)
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    dispatchFormAction({
      key: event.target.name as EFormKeys,
      value: event.target.value
    })

    setIsSubmitOnError(false)

    if (event.target.name === EFormKeys.recipeUrl || event.target.name === EFormKeys.imgUrl) {
      setRecipeImgPreviewError(false)
      setRecipeImgLoading(false)
    }
  }

  const setImageSource = async () => {
    setRecipeImgLoading(true)
    if (formState.recipeUrl && !formState.imgUrl) {
      try {
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

  return (
    <HorizontalCenterLayout className="h-screen flex md:justify-center items-center p-4">
      <Card className="p-8 w-full lg:w-11/12 lg:max-w-6xl">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <fieldset>
            <div className="flex flex-col md:flex-row items-stretch">
              <div className="flex-1">
                <div className="grid grid-rows-1 gap-y-3">
                  <Input label="Naam" id={EFormKeys.recipeTitle} onChange={handleInputChange} />
                  <Input label="Link naar het recept" id={EFormKeys.recipeUrl} onChange={handleInputChange} onBlur={setImageSource} />

                  <span className="flex flex-row w-full items-center mt-4">
                    <h6 className="italic font-semibold mr-2 text-primary">Optioneel</h6>
                    <hr className="flex-1 my-4 border-t-4 border-primary border-dotted" />
                  </span>
                  <Input label="Link naar een afbeelding" id={EFormKeys.imgUrl} onChange={handleInputChange} onBlur={setImageSource} />
                  <span className="flex flex-row w-full items-center opacity-25 cursor-not-allowed">
                    <p className="mr-2 whitespace-nowrap italic">Of upload (TODO):</p>
                    <input disabled type="file" className="w-full text-sm text-dark hover:text-darkest" />
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
          {!isSubmitting && (
            <Button disabled={!isFormValid} className="mt-4 w-full max-w-md self-center" type="submit">
              Opslaan!
            </Button>
          )}
          {isSubmitting && (
            <span className="self-center mt-8">
              <Loading />
            </span>
          )}
          {isSubmitOnError && (
            <h6 className="text-error font-bold self-center mt-2">Kon recept niet opslaan. Is alles correct ingevuld?</h6>
          )}
        </form>
      </Card>
    </HorizontalCenterLayout>
  )
}

export default AddRecipePage
