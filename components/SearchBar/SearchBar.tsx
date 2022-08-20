import * as React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { useState } from 'react'
import searchRecipes from 'api/searchRecipes'
import styles from './SearchBar.module.css'

type TProps = {
  placeholder?: string
  onSearch: (query: string) => void
}

const SearchBar: React.FC<TProps> = ({ placeholder, onSearch }) => {
  const [hasWarmedSearchApi, setHasWarmedSearchApi] = useState(false)

  const search = async (event: any) => {
    event.preventDefault()
    document.getElementById('search')?.blur()
    const query = event.target.search.value
    if (query) {
      onSearch(query)
    }
  }

  const onFocus = () => {
    // Combatting cold start of the search function in a hacky way
    if (!hasWarmedSearchApi) {
      searchRecipes('')
      setHasWarmedSearchApi(true)
    }
  }

  return (
    <form className="relative w-full" onSubmit={search}>
      <input
        type="search"
        name="search"
        id="search"
        placeholder={placeholder || 'Zoeken'}
        autoComplete="off"
        className={classNames(
          'bg-primary h-12 w-full text-white px-5 pr-10 rounded-full text-md focus:outline-none focus:ring-4 focus:ring-dark focus:ring-opacity-50 transition duration-150',
          styles.input
        )}
        onFocus={onFocus}
      />
      <button type="submit" className="absolute right-0 top-0 flex h-full mr-4">
        <div className="flex h-full justify-content-center align-items-center">
          <Image src="/icons/search.svg" alt="Search icon" width={18} height={18} />
        </div>
      </button>
    </form>
  )
}

export default SearchBar
