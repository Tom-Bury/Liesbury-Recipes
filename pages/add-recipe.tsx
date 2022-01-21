import * as React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { HorizontalCenterLayout } from 'layouts'
import { useReducer, useState } from 'react'
import colors from 'public/colors'
import getPreviewImage from 'api/getPreviewImage'
import addRecipe from 'api/addRecipe'
import { useRouter } from 'next/router'
import remark from 'remark'
import html from 'remark-html'
import Button from '~/components/atoms/Button/Button'
import Card from '~/components/Card/Card'
import ImageIcon from '~/components/icons/Image.icon'
import Input from '~/components/atoms/Input/Input'
import Loading from '~/components/Loading'
import MarkdownSnippet from '~/components/MarkdownSnippet/MarkdownSnippet'

enum EFormKeys {
  recipeTitle = 'recipeTitle',
  recipeUrl = 'recipeUrl',
  imgUrl = 'imgUrl',
  instructions = 'instructions'
}

type TFormState = Partial<
  {
    [formKey in EFormKeys]: {
      value: string
      formattedValue: string
    }
  }
>

type TFormAction = {
  key: EFormKeys
  value: string
  formattedValue?: string
}

const formReducer = (state: TFormState, action: TFormAction): TFormState => {
  return {
    ...state,
    [action.key]: {
      value: action.value,
      formattedValue: action.formattedValue || action.value.trim()
    }
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

  const isFormValid = (!!formState.recipeTitle?.formattedValue && !!formState.recipeUrl?.formattedValue) || true

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (isFormValid) {
      setIsSubmitting(true)
      try {
        const result = await addRecipe({
          title: formState.recipeTitle?.formattedValue || '', // TODO: typing doesn't know isFormValid guarantees non empty values
          url: formState.recipeUrl?.formattedValue || '',
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
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = async event => {
    const key = event.target.name as EFormKeys
    const { value } = event.target

    dispatchFormAction({
      key,
      value
    })

    setIsSubmitOnError(false)

    if (event.target.name === EFormKeys.recipeUrl || event.target.name === EFormKeys.imgUrl) {
      setRecipeImgPreviewError(false)
      setRecipeImgLoading(false)
    }
  }

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = async event => {
    const key = event.target.name as EFormKeys
    const { value } = event.target
    const processed = await remark().use(html).process(value)
    const formattedValue = processed ? processed.toString() : 'Syntax error'

    dispatchFormAction({
      key,
      value,
      formattedValue
    })
  }

  const setImageSource = async () => {
    setRecipeImgLoading(true)
    if (formState.recipeUrl?.formattedValue && !formState.imgUrl?.formattedValue) {
      try {
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
          {/* <fieldset>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1">
                <textarea
                  id={EFormKeys.instructions}
                  name={EFormKeys.instructions}
                  className="w-full min-h-full p-2 rounded-sm bg-lightest focus:outline-none focus:border-primary focus:ring-primary focus:ring-2 resize-y"
                  onChange={handleTextAreaChange}
                  rows={4}
                />
              </div>
              <span className="h-1 w-auto md:h-auto md:w-1 my-4 md:my-0 mx-0 md:mx-4 bg-primary" />
              <div className="flex-1 overflow-auto rounded-sm border-primary border-2">
                <MarkdownSnippet instructionsHtml={formState.instructions?.formattedValue || ''} className="p-2 text-darkest" />
              </div>
            </div>
          </fieldset> */}
          {!isSubmitting && (
            <span className="flex flex-1 justify-center">
              <Button disabled={!isFormValid} className="w-full max-w-md" type="submit">
                Opslaan!
              </Button>
            </span>
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

export const getServerSideProps: GetServerSideProps = async context => {
  const { cookies } = context.req

  if (!cookies.authToken) {
    return {
      redirect: {
        destination: '/login?redirectTo=add-recipe',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default AddRecipePage
