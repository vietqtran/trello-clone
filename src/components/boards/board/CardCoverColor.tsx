import React from 'react'
import CardCover from './CardCover'

type Props = {
    cover: { ntn: number, type: string },
    setCoverCard: Function,
    setTab: Function
}

function CardCoverColor(props: Props) {
    return (
        <div>
            <div className='mb-2 flex items-center justify-between '>
                <h2 className='font-semibold text-sm'>Colors</h2>
                <button
                    onClick={() => {
                        props.setTab('color')
                    }}
                    className='py-2 px-4 bg-slate-200 hover:bg-slate-300 rounded-md font-semibold text-sm'>More</button>
            </div>
            <div className='grid grid-cols-2 gap-1'>
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 1, type: 'color' }} />
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 2, type: 'color' }} />
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 3, type: 'color' }} />
                <CardCover setCoverCard={props.setCoverCard} cover={props.cover} image={{ ntn: 4, type: 'color' }} />
            </div>
        </div>
    )
}

export default CardCoverColor   