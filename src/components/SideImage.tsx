import React from 'react'
import Image from "next/image";

interface SideImageProps {
   src: string
}

function SideImage(props: SideImageProps) {
   return (
      <div>
         <Image src={props.src} alt="image" width={400} height={400} />
      </div>
   )
}

export default SideImage