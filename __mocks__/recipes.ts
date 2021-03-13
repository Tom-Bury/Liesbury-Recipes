import { ECategory } from 'types/enums'
import { TRecipe } from 'types/recipe.type'

const recipesMock: TRecipe[] = [
  {
    title: 'Chorizo & mozzarella gnocchi bake',
    url: 'https://www.bbcgoodfood.com/recipes/chorizo-mozzarella-gnocchi-bake',
    imgUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-1d16725.jpg?quality=90&webp=true&resize=440,400',
    mainCategory: ECategory.MEAT,
    subCategories: [ECategory.PASTA]
  },
  {
    title: 'Chilli sin carne',
    url: 'https://www.hellofresh.be/recipes/chilli-sin-carne-5e5d20b4259c92290f014c03',
    imgUrl: 'https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_auto,w_2600/hellofresh_s3/image/chilli-sin-carne-1a352958.jpg',
    mainCategory: ECategory.VEGAN,
    subCategories: []
  },
  {
    title: 'Chorizo & mozzarella gnocchi bake',
    url: 'https://www.bbcgoodfood.com/recipes/chorizo-mozzarella-gnocchi-bake',
    imgUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-1d16725.jpg?quality=90&webp=true&resize=440,400',
    mainCategory: ECategory.MEAT,
    subCategories: [ECategory.PASTA]
  },
  {
    title: 'Chilli sin carne',
    url: 'https://www.hellofresh.be/recipes/chilli-sin-carne-5e5d20b4259c92290f014c03',
    imgUrl: 'https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_auto,w_2600/hellofresh_s3/image/chilli-sin-carne-1a352958.jpg',
    mainCategory: ECategory.VEGAN,
    subCategories: []
  },
  {
    title: 'Chorizo & mozzarella gnocchi bake',
    url: 'https://www.bbcgoodfood.com/recipes/chorizo-mozzarella-gnocchi-bake',
    imgUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-1d16725.jpg?quality=90&webp=true&resize=440,400',
    mainCategory: ECategory.MEAT,
    subCategories: [ECategory.PASTA]
  },
  {
    title: 'Chilli sin carne',
    url: 'https://www.hellofresh.be/recipes/chilli-sin-carne-5e5d20b4259c92290f014c03',
    imgUrl: 'https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_auto,w_2600/hellofresh_s3/image/chilli-sin-carne-1a352958.jpg',
    mainCategory: ECategory.VEGAN,
    subCategories: []
  }
]

export default recipesMock
