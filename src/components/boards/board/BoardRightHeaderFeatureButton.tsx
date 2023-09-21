import React, { ReactNode } from "react"

type Props = {
   name: string
   children: ReactNode
}

// This function renders a BoardRightHeaderFeatureButton component
// It takes in a props object with a name and children property
function BoardRightHeaderFeatureButton(props: Props) {
   // Return a div with the className 'flex items-center justify-center py-2 px-3 mr-1 bg-white rounded-sm cursor-pointer bg-clip-padding backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-30 bg-opacity-40'
   return (
      <div className='flex items-center justify-center py-2 px-3 mr-1 bg-white rounded-sm cursor-pointer bg-clip-padding backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-30 bg-opacity-40'>
         {/* Render the children property as a span with the className 'text-sm font-light ml-2' */}
         <span>{props.children}</span>
         {/* Render the name property as a span with the className 'text-sm font-light ml-2' */}
         <span className='text-sm font-light ml-2'>{props.name}</span>
      </div>
   )
}

// Export the BoardRightHeaderFeatureButton component
export default BoardRightHeaderFeatureButton
