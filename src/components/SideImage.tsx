import React from "react"
import Image from "next/image"

// Define the props interface for SideImage component
interface SideImageProps {
   src: string // The source URL for the image
}

// Create the SideImage component
function SideImage(props: SideImageProps) {
   return (
      <div>
         {/* Use the Next.js Image component to display the image */}
         <Image
            src={props.src} // Pass the source URL from props
            alt='image' // Specify an alt text for the image
            width={400} // Set the width of the image
            height={400} // Set the height of the image
            priority // Set the image loading priority
         />
      </div>
   )
}

// Export the SideImage component as the default export
export default SideImage
