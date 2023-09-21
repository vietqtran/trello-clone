import React from "react"
import CardCover from "./CardCover"
import { AiOutlineClose } from "react-icons/ai"
import { SlArrowLeft } from "react-icons/sl"

type Props = {
   cover: { ntn: number; type: string }
   setCoverCard: Function
   setTab: Function
   setShowSelectCover: Function
}

function CardCoverColorSelect(props: Props) {
   return (
      <div>
         <div className='mb-2'>
            <div
               onClick={() => {
                  props.setTab("")
               }}
               className='absolute rounded-md left-[5px] top-[5px] p-2 text-sm hover:bg-slate-100 cursor-pointer '
            >
               <SlArrowLeft />
            </div>
            <h1 className='w-full text-center text-sm font-semibold py-1'>
               Covers
            </h1>
            <div
               onClick={() => {
                  props.setShowSelectCover(false)
               }}
               className='absolute rounded-md right-[5px] top-[5px] p-2 text-sm hover:bg-slate-100 cursor-pointer '
            >
               <AiOutlineClose />
            </div>
         </div>
         <div className='grid grid-cols-2 gap-1'>
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 1, type: "gradient" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 2, type: "gradient" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 3, type: "gradient" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 4, type: "gradient" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 5, type: "gradient" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 6, type: "gradient" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 7, type: "gradient" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 8, type: "gradient" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 9, type: "gradient" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 1, type: "color" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 2, type: "color" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 3, type: "color" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 4, type: "color" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 5, type: "color" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 6, type: "color" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 7, type: "color" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 8, type: "color" }}
            />
            <CardCover
               setCoverCard={props.setCoverCard}
               cover={props.cover}
               image={{ ntn: 9, type: "color" }}
            />
         </div>
      </div>
   )
}

export default CardCoverColorSelect
