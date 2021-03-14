import * as React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import styles from './SearchBar.module.css'

type TProps = {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<TProps> = ({ onSearch }) => {

  const search = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = event.target.search.value
    if (query) {
      onSearch(query)
    }
  }

  return (
    <form className="relative w-full" onSubmit={search}>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search"
        className={classNames(
          'bg-primary h-12 w-full text-white px-5 pr-10 rounded-full text-md focus:outline-none focus:ring-4 focus:ring-dark focus:ring-opacity-50 transition duration-150',
          styles.input
        )}
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
