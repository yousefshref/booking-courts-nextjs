import React from 'react'
import { IoPersonCircle } from "react-icons/io5";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Container = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className='flex flex-col gap-5'>
      <header className='flex justify-between gap-5 px-2 shadow-md md:justify-around'>
        <div className='flex gap-3'>
          <span
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className='my-auto text-2xl transition-all cursor-pointer hover:text-orange-800 text-neutral-700'>
            <IoPersonCircle />
          </span>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>
              <a href='/' className='font-bold'>الصفحة الشخصية</a>
            </MenuItem>
            <MenuItem onClick={handleClose} className='block md:hidden'>
              <a href='/lessons' className='block font-bold'>الدروس</a>
            </MenuItem>
            <MenuItem onClick={handleClose} className='block md:hidden'>
              <a href='/teachers' className='font-bold'>المدرسين</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a href='/' className='font-bold'>تسجيل الخروج</a>
            </MenuItem>
          </Menu>

          <div className='hidden gap-3 my-auto md:flex'>
            <a href='/teachers'>المدرسين</a>
            <a href='/lessons'>الدروس</a>
          </div>
        </div>
        <img className='w-32 md:w-40' src='/images/logo.png' alt='linkawy-lms logo' />
      </header>
      <div>
        {children}
      </div>
    </div>
  )
}

export default Container
