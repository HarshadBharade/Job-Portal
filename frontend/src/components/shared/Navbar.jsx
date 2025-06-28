import React from 'react'
import {Link} from "react-router-dom"
import {Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from "../ui/avatar"

const navbar = () => {
  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
      <div>
    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
      </div>
      <div>
        <ul className='flex font-medium items-center gap-5'>
      <li>Home</li>
      <li>Jobs</li>
      <li>Browse</li>
        </ul>
        
       <Popover>
  <PopoverTrigger asChild>

    
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
</Avatar>
  </PopoverTrigger>
  <PopoverContent>Place content for the popover here.</PopoverContent>
</Popover>
        
      </div>
    </div>
    </div>
  )
}

export default navbar