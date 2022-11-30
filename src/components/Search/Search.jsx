import { useCallback, useContext, useRef, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import debounce from 'lodash.debounce'
import { SearchContext } from '../../App'
import { IoMdClose } from 'react-icons/io'
import styles from './Search.module.scss'
const Search = () => {
  const { setSearchValue } = useContext(SearchContext)
  const [value, setValue] = useState('')
  const inputRef = useRef()
  const onClickCLear = () => {
    setSearchValue('')
    setValue('')
    inputRef.current.focus()
  }

  const updateSearchValue = useCallback(
    debounce(str => {
      setSearchValue(str)
    }, 700),
    [],
  )

  const onChangeInput = (e) => {
    setValue(e.currentTarget.value)
    updateSearchValue(e.currentTarget.value)
  }
  return (
    <div className={styles.root}>
      <CiSearch className={styles.search} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        placeholder="Поиск пиццы..." />
      {value &&
        <IoMdClose
          onClick={onClickCLear}
          className={styles.close} />}
    </div>
  )
}

export default Search