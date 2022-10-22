import { TRecipe } from 'backend/types/recipes.types'
import * as React from 'react'
import Image from 'next/image'
import LinkCard from '../LinkCard/LinkCard'
import MarkdownSnippet from '../MarkdownSnippet/MarkdownSnippet'
import styles from './RecipeData.module.css'

type TRecipeDataProps = {
  recipe: TRecipe
}

const Instructions: React.FC<{ markdownInstructions: string }> = ({ markdownInstructions }) => {
  return (
    <div className={`flex flex-col items-start bg-light rounded ${styles['recipe-instructions']}`}>
      <h3 className="text-darkest m-4">Recept</h3>
      <MarkdownSnippet markdownContent={markdownInstructions} className="mx-6 mb-6 text-darkest" />
    </div>
  )
}

const Ingredients: React.FC<{ ingredients: string[] }> = ({ ingredients }) => {
  return (
    <div className="bg-lightest box-border rounded border-4 border-primary px-4 pt-3 pb-4">
      <h3 className="text-darkest mb-4">Ingrediënten</h3>
      <span className="grid grid-cols-1 gap-6 place-items-end text-primary">
        {ingredients.map(ingredient => (
          <li className="border-b-2 border-light list-inside w-full" key={ingredient}>
            <p className="text-darkest inline">{ingredient}</p>
          </li>
        ))}
      </span>
    </div>
  )
}

const Tips: React.FC<{ markdownTips: string }> = ({ markdownTips }) => {
  const title = "Lizzy's tips"
  return (
    <div className="items-start bg-gradient-to-tr	from-primary to-light rounded-lg p-4">
      <h3 className="text-darkest">{title}</h3>
      <span className="flex flex-row mx-4">
        <Image src="/images/lizzy-tips.svg" alt="Liesbury's receptenlijst" width={100} height={221} />

        <MarkdownSnippet markdownContent={markdownTips} className="my-4 ml-8 text-darkest" />
      </span>
    </div>
  )
}

const OriginalRecipeLink: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className="w-full flex flex-col items-start px-4">
      <h3 className="text-darkest mb-4">Origineel recept</h3>
      <LinkCard url={url} title={new URL(url).hostname} className="mx-2" />
    </div>
  )
}

type TLayoutProps = {
  primary?: React.ReactNode
  secondary?: React.ReactNode
  tertiary?: React.ReactNode
  bottom?: React.ReactNode
}

const RecipeDataLayout: React.FC<TLayoutProps> = ({ primary, secondary, tertiary, bottom }) => {
  return (
    <div className="flex flex-col">
      {(() => {
        if (primary && secondary && tertiary) {
          return (
            <div className="grid gap-8 grid-cols-3">
              <div className="col-span-3 md:col-span-2">
                <section className="w-full mb-8">{primary}</section>
                <section className="w-full">{secondary}</section>
              </div>
              <section className="col-span-3 md:col-span-1">{tertiary}</section>
            </div>
          )
        }

        if ((secondary && tertiary) || (primary && tertiary)) {
          return (
            <div className="grid gap-8 grid-cols-3">
              <section className="col-span-3 md:col-span-2">{secondary || primary}</section>
              <section className="col-span-3 md:col-span-1">{tertiary}</section>
            </div>
          )
        }

        if (primary && secondary) {
          return (
            <div className="grid gap-8 grid-cols-12">
              <section className="col-span-12 md:col-span-7">{primary}</section>
              <section className="col-span-12 md:col-span-5">{secondary}</section>
            </div>
          )
        }

        // Only 1 is available
        return (
          <div className="grid gap-8 grid-cols-1">
            {primary && <section>{primary}</section>}
            {tertiary && <section>{tertiary}</section>}
            {secondary && <section>{secondary}</section>}
          </div>
        )
      })()}
      {bottom && <section className={primary || secondary || tertiary ? 'mt-8' : ''}>{bottom}</section>}
    </div>
  )
}

const RecipeData: React.FC<TRecipeDataProps> = ({ recipe }) => {
  return (
    <div className="pt-8 px-4 lg:px-0">
      <RecipeDataLayout
        primary={!!recipe.instructions && <Instructions markdownInstructions={recipe.instructions} />}
        secondary={!!recipe.tips && <Tips markdownTips={recipe.tips} />}
        tertiary={!!recipe.ingredients && <Ingredients ingredients={recipe.ingredients} />}
        bottom={recipe.url && <OriginalRecipeLink url={recipe.url} />}
      />
    </div>
  )
}

export default RecipeData
