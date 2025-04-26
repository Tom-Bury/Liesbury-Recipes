import * as React from 'react'
import Image from "next/legacy/image"
import classNames from 'classnames'
import styles from './SearchBar.module.css'

type TProps = {
  value: string | undefined
  onChange: (newValue: string) => void
  placeholder?: string
  onSearch: (query: string) => void
}

export const SearchBar: React.FC<TProps> = ({ value, onChange, placeholder, onSearch }) => {
  const search = async (event: any) => {
    event.preventDefault()
    document.getElementById('search')?.blur()
    if (value && value.length > 0) {
      onSearch(value)
    }
  }

  return (
    <form className="relative w-full" onSubmit={search}>
      <input
        type="search"
        name="search"
        id="search"
        placeholder={placeholder || 'Zoeken'}
        value={value ?? ''}
        onChange={event => onChange(event.target.value)}
        autoComplete="off"
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
