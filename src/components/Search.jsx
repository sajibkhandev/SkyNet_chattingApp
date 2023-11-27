import React from 'react'
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";

const Search = () => {
  return (
    <div className='searchDiv'>
    <input className='search' type="text" placeholder='Search'/>
    <CiSearch className='searchIcon'/> 
    <BsThreeDotsVertical  className='threedotIcon'/>

    </div>
  )
}

export default Search