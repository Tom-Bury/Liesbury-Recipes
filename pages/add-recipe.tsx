import * as React from 'react'
import { NextPage } from 'next'
import { HorizontalCenterLayout } from 'layouts'
import { useReducer, useState } from 'react'
import colors from 'public/colors'
import Button from '~/components/atoms/Button/Button'
import Card from '~/components/Card/Card'
import ImageIcon from '~/components/icons/Image.icon'

type TInputProps = {
  name: string
  id: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

const LabeledInput = ({ name, id, onChange, onBlur }: TInputProps) => (
  <label htmlFor="title">
    <p>{name}</p>
    <input
      className="px-2 w-full py-1 bg-lightest rounded-sm focus:outline-none focus:border-primary focus:ring-primary focus:ring-2"
      id={id}
      name={id}
      onChange={onChange}
      onBlur={onBlur}
    />
  </label>
)

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

const AddRecipePage: NextPage = _ => {
  const [formData, setFormData] = useReducer(formReducer, {})
  const [recipeImgSrcUrl, setRecipeImgSrcUrl] = useState<string>('')

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    console.log(formData)
  }

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setFormData({
      name: event.target.name,
      value: event.target.value
    })
  }

  const setImageSource = (__: any) => {
    setRecipeImgSrcUrl(formData.recipeUrl)
  }

  return (
    <HorizontalCenterLayout className="h-screen flex justify-center items-center p-4">
      <Card className="p-8 w-full md:w-11/12 md:max-w-4xl">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 pb-4 md:py-2 md:pr-4 grid grid-rows-1 gap-y-3 border-b-2 md:border-b-0 md:border-r-2 border-primary">
                <LabeledInput name="Naam" id="recipeTitle" onChange={handleChange} />
                <LabeledInput name="Link naar het recept" id="recipeUrl" onChange={handleChange} onBlur={setImageSource} />
                <span className="flex flex-row w-full items-center">
                  <h6 className="italic font-semibold mr-2 text-primary">Optioneel</h6>
                  <hr className="flex-1 my-4 border-t-4 border-primary border-dotted" />
                </span>
                <LabeledInput name="Link naar een afbeelding" id="recipeUrl" onChange={handleChange} onBlur={setImageSource} />
                <span className="flex flex-row w-full items-center">
                  <p className="mr-2 whitespace-nowrap italic">Of upload:</p>
                  <input type="file" className="w-full text-sm text-dark hover:text-darkest" />
                </span>
              </div>
              <div className="flex mt-4 md:mt-0 md:ml-4 flex-1 justify-center items-center">
                {recipeImgSrcUrl && <img className="w-full md:w-auto md:max-h-full" alt="Recipe preview" src={recipeImgSrcUrl} />}
                {!recipeImgSrcUrl && <ImageIcon width={48} height={48} fill={colors.dark} />}
              </div>
            </div>
          </fieldset>
          <Button className="mt-4" type="submit">
            Save!
          </Button>
        </form>
      </Card>
    </HorizontalCenterLayout>
  )
}

export default AddRecipePage
