import React, { useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useOnClickOutside } from 'usehooks-ts'
import CardCover from './CardCover'
import CardCoverImage from './CardCoverImage'
import CardCoverColor from './CardCoverColor'
import CardCoverImageSelect from './CardCoverImageSelect'
import CardCoverColorSelect from './CardCoverColorSelect'

type Props = {
  setShowSelectCover: Function,
  cover: { ntn: number, type: string },
  setCoverCard: Function
}

function CardCoverSelect(props: Props) {
  const [tab, setTab] = useState('')
  const ref = useRef(null)
  const handleClickOutside = () => {
    props.setShowSelectCover(false)
  }
  const handleClickInside = () => {
  }
  useOnClickOutside(ref, handleClickOutside)
  return (
    <div
      onClick={handleClickInside}
      ref={ref}
      className=' z-10 bg-white right-0 drop-menu-shadow rounded-md p-2 absolute w-[330px]'>
      <div className='w-full relative'>
        {tab === '' &&
          <>
            <h1 className='w-full text-center text-sm font-semibold py-2'>Covers</h1>
            <div
              onClick={handleClickOutside}
              className='absolute rounded-md right-0 top-0 p-2 text-sm hover:bg-slate-100 cursor-pointer '><AiOutlineClose /></div>
            <div className='px-1 mt-2 pb-4'>
              <CardCoverImage setTab={setTab} setCoverCard={props.setCoverCard} cover={props.cover} />
              <br />
              <CardCoverColor setTab={setTab} setCoverCard={props.setCoverCard} cover={props.cover} />
            </div>
          </>
        }
      </div>
      {tab === 'photos' && <CardCoverImageSelect setShowSelectCover={props.setShowSelectCover} setTab={setTab} setCoverCard={props.setCoverCard} cover={props.cover} />}
      {tab === 'color' && <CardCoverColorSelect setShowSelectCover={props.setShowSelectCover} setTab={setTab} setCoverCard={props.setCoverCard} cover={props.cover} />}
    </div>
  )
}

export default CardCoverSelect
