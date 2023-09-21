import React from "react"
import { memo } from "react"

// Define the props interface for AuthButton component
type AuthButtonProps = {
   name: string // The name of the authentication method
   children?: React.ReactNode // Optional child elements
}

// Create the AuthButton component
function AuthButton({ name, children }: AuthButtonProps) {
   return (
      <div className='w-[300px] hover:bg-gray-50'>
         <button
            className='w-full rounded-md auth-button py-[10px] mb-3 text-sm font-bold text-slate-500 flex items-center justify-center'
            type='button'
         >
            {children}
            <span className='ml-2'>Continue with {name}</span>
         </button>
      </div>
   )
}

// Export the AuthButton component as a memoized component
export default memo(AuthButton)
