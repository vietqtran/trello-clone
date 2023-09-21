import React from "react"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"

// Define the props interface for the Eye component
interface EyeProps {
   show: boolean // Indicates whether to show or hide the eye icon
   setShow: Function // Function to toggle the visibility
}

// Create the Eye component
function Eye(props: EyeProps) {
   return (
      <div
         className='text-slate-500 p-3 cursor-pointer'
         onClick={() => {
            // Toggle the visibility when clicked
            props.setShow(!props.show)
         }}
      >
         {/* Render the appropriate eye icon based on the 'show' prop */}
         {!props.show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </div>
   )
}

// Export the Eye component as the default export
export default Eye
