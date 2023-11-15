'use client';

import {BsSearch} from 'react-icons/bs'
const Search=()=>{
    return (
        <div className='
         border-[1px]
         w-auto
         py-2
         rounded-full
         shadow-sm
         hover:shadow-md
         transition
         cursor-pointer
        '>
           <div className='
             flex
             flex-row
             justify-between
             items-center
             text-center
            '>
               <div className='
                text-sm
                font-semibold
                px-6
                hover:underline underline-offset-2
               '>
                  Anywhere
               </div>
               <div className='
                hidden
                sm:block
                text-sm
                font-semibold
                px-6
                border-x-[1px]
                flex-1
                text-center
                hover:underline underline-offset-2
               '>
                  Any Week
               </div>
               <div className='
                text-sm
                pl-6
                pr-2
                text-gray-600
                flex
                flex-row
                items-center
                gap-3
               '>
                   <div className='hidden sm:block  hover:underline underline-offset-2'>Add Guest</div>
                   <div className='
                     p-2
                     bg-rose-500
                     rounded-full
                     text-white
                   '>
                    <BsSearch size={18}/>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default Search;