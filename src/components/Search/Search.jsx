import { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/searchSlice'
import { CiSearch } from 'react-icons/ci'
import debounce from 'lodash.debounce'
import { IoMdClose } from 'react-icons/io'
import styles from './Search.module.scss'
const Search = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef()
  const dispatch = useDispatch()
  const onClickCLear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current.focus()
  }

  const updateSearchValue = useCallback(
    debounce(str => {
      dispatch(setSearchValue(str))
    }, 750),
    [setSearchValue]
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