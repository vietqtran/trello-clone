import Image from 'next/image'
import React, { memo } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'

type Props = {
    image: {
        ntn: number,
        type: string
    },
    cover: { ntn: number, type: string },
    setCoverCard: Function
}

function CardCover(props: Props) {
    return (
        <div
            onClick={() => {
                props.setCoverCard(props.image)
            }}
            className='col-span-1 h-[70px] rounded-md overflow-hidden cursor-pointer relative'>
            <Image src={`/assets/background/bg-${props.image.type}/bg${props.image.ntn}.jpg`} alt='cover' width={500} height={500}
                className='w-full h-full object-cover'
                priority
            />
            {props.image.type === props.cover.type && props.cover.ntn === props.image.ntn &&
                <div className='top-0 left-0 text-white absolute w-full h-full bg-black bg-opacity-40 flex items-center justify-center'>
                    <span><AiOutlineCheck /></span>
                </div>
            }
        </div>
    )
}

export default memo(CardCover)
