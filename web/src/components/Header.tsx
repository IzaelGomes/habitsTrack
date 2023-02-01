import React from 'react'
import {Plus} from 'phosphor-react'

import logoImage from '../assets/logo-image.svg'

export const Header = () => {
  return (
    <div className='w-full max-w-3xl max-auto flex items-center justify-between'>
           <img src={logoImage} alt="logo" />

           <button 
           type="button"
           className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex gap-3 items-center hover:border-violet-300'
           >
            <Plus size={20} className="text-violet-500" />
              Novo Hábito
           </button>
         </div>
  )
}

