import React, { useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CiSearch } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'

import debounce from 'lodash.debounce'

import { setSearchValue } from '../../redux/slices/searchSlice'

import styles from './Search.module.scss'

const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useDispatch()
  const onClickCLear = () => {
    dispatch(setSearchValue(''))
    setValue('')

    inputRef.current?.focus()
  }

  const updateSearchValue = useMemo(() =>
    debounce((str: string) =>
      dispatch(setSearchValue(str))
      , 750),
    [dispatch]
  )

  const onChangeInput = (e: any) => {
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