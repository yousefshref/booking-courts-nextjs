import React, { useContext } from 'react'
import { Button, Menu, MenuItem } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { AuthContextProvider } from '@/contexts/AuthContext';

const Container = ({ children }: any) => {

  const userContext = useContext(AuthContextProvider)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex flex-col gap-5">
      <header className="flex bg-white sm:justify-around justify-between gap-5 p-2 shadow-xl">
        <span className="logo my-auto">
          <Image alt="لينكاوي سبورت" src={'/images/logo.png'} width={80} height={80} />
        </span>
        {/* not menu */}
        <div className="sm:flex hidden gap-4 font_light my-auto">
          <Link href={'/'}>الرئيسية</Link>
          <Link href={'/courts'}>الملاعب</Link>
          <Link href={'/profile'}>الصفحة الشخصية</Link>
          <p onClick={() => {
            userContext?.logoutFunction()
          }} className='font_light cursor-pointer text-red-600'>تسجيل الخروج</p>
        </div>
        {/* menu */}
        <div className="sm:hidden block">
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<BiMenu />}
            size="large"
          >
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem>
              <Link href={'/'}>
                <p className='font_light'>الرئيسية</p>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href={'/courts'}>
                <p className='font_light'>الملاعب</p>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href={'/profile'}>
                <p className='font_light'>الصفحة الشخصية</p>
              </Link>
            </MenuItem>
            <MenuItem>
              <p onClick={() => {
                userContext?.logoutFunction()
              }} className='font_light cursor-pointer'>تسجيل الخروج</p>
            </MenuItem>
          </Menu>
        </div>
      </header>
      <div className="flex p-3 flex-col gap-4">
        {children}
      </div>
    </div>
  )
}

export default Container