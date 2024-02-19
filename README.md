# Liesbury Recipes

This project contains a progressive web app to create and store recipes for personal use or for sharing with friends and family.
It is meant purely for personal use, to save recipes my partner and I like to cook and help us create meal plans.

It can be accessed at [recipes.lies.bury.dev](https://recipes.lies.bury.dev)

## Overview

- The homepage displays all stored and public recipes, and allows searching recipes by name or filtering on tags
  ![Homepage](./public/images/homepage.png)
- The recipe page displays the recipe details
  ![Recipe details](./public/images/recipe.png)
- Logged in users can create, edit and delete recipes.
  It provides a Markdown editor to write the recipe, and a form to fill in the recipe details.
  The recipe image can be uploaded manually or scraped from a provided recipe source URL.
  ![Create recipe](./public/images/recipe-editor.png)

## Stack

- The frontend is built with NextJS and hosted on Vercel
- The backend is built in a separate repo, with NextJS and hosted on the Google Cloud.

## TODO milestones

- Migrate to a more recent version of NextJS
- Increase homepage loading performance
- Migrate to a monorepo including the backend
