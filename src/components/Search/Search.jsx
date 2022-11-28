import { useContext } from 'react'
import { CiSearch } from 'react-icons/ci'
import { SearchContext } from '../../App'
import { IoMdClose } from 'react-icons/io'
import styles from './Search.module.scss'
const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext)

  return (
    <div className={styles.root}>
      <CiSearch className={styles.search} />
      <input
        value={searchValue}
        onChange={e => setSearchValue(e.currentTarget.value)}
        placeholder="Поиск пиццы..." />
      {searchValue &&
        <IoMdClose
          onClick={() => setSearchValue('')}
          className={styles.close} />}
    </div>
  )
}

export default Search