import React from 'react'
import CardCover from './CardCover'
import { SlArrowLeft } from 'react-icons/sl'
import { AiOutlineClose } from 'react-icons/ai'

type Props = {
    cover: { ntn: number, type: string },
    setCoverCard: Function,
    setTab: Function,
    setShowSelectCover: Function
}

function CardCoverImageSelect(props: Props) {
    return (
        <div>
            <div className='mb-2'>
                <div
                    onClick={() => {
                        props.setTab('')
                    }}
                    className='absolute rounded-md left-[5px] top-[5px] p-2 text-sm hover:bg-slate-100 cursor-pointer '><SlArrowLeft />
                </div>
                <h1 className='w-full text-center text-sm font-semibold py-1'>Covers</h1>
                <div
                    onClick={() => {
                        props.setShowSelectCover(false)
                    }}
                    className='absolute rounded-md right-[5px] top-[5px] p-2 text-sm hover:bg-slate-100 cursor-pointer '><AiOutlineClose />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-1'>
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 1, type: 'image' }} />
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 2, type: 'image' }} />
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 3, type: 'image' }} />
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 4, type: 'image' }} />
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 5, type: 'image' }} />
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 6, type: 'image' }} />
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 7, type: 'image' }} />
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 8, type: 'image' }} />
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 9, type: 'image' }} />
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 10, type: 'image' }} />
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 11, type: 'image' }} />
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 12, type: 'image' }} />

            </div>
        </div>
    )
}

export default CardCoverImageSelect
