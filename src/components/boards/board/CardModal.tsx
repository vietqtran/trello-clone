import { Board, CardType, ColumnType, WorkspaceType } from "@/types"
import React, { useEffect, useRef, useState } from "react"
import { AiOutlineClose, AiOutlineDelete, AiOutlineMenu } from "react-icons/ai"
import { FaFlipboard } from "react-icons/fa"
import { useOnClickOutside } from "usehooks-ts"
import CardEdit from "./CardEdit"
import { MdOutlineLabel } from "react-icons/md"
import { BiImage } from "react-icons/bi"
import CardLabelSelect from "./CardLabelSelect"
import Image from "next/image"
import CardCoverSelect from "./CardCoverSelect"
import { IoIosArrowRoundForward } from "react-icons/io"
import CardMoveSelect from "./CardMoveSelect"

type Props = {
   setShowModal: Function
   card: CardType
   column: ColumnType
   setLabels: Function
   setCoverCard: Function
   deleteCard: Function
   moveCardBetweenWorkspaces: Function
   workspaces: WorkspaceType[]
   board: Board | undefined
}

function CardModal(props: Props) {
   const [showInput, setShowInput] = useState(false)

   const ref = useRef(null)
   const handleClickOutside = () => {
      props.setShowModal(false)
   }
   const handleClickInside = () => {}
   useOnClickOutside(ref, handleClickOutside)
   const [showSelectLabel, setShowSelectLabel] = useState(false)
   const [showSelectCover, setShowSelectCover] = useState(false)
   const [showMoveSelect, setShowMoveSelect] = useState(false)
   const [labels, setLabels] = useState<string[]>([])
   const [cover, setCover] = useState<{ ntn: number; type: string }>({
      ntn: 0,
      type: "",
   })

   useEffect(() => {
      setLabels(props.card.labels)
   }, [props.card.labels])

   useEffect(() => {
      setCover({ ...props.card.image })
   }, [props.card.image])

   return (
      <>
         <div className=' z-40 overflow-y-auto w-full h-full min-h-[100vh] min-w-[100vw] top-0 left-0 right-0 bottom-0 fixed bg-black bg-opacity-75 flex items-start pt-20 pb-10 justify-center'>
            <div
               onClick={handleClickInside}
               ref={ref}
               className='w-full rounded-xl modal z-50 bg-white pb-5 max-w-[1000px] relative'
            >
               <div
                  onClick={handleClickOutside}
                  className={`p-2 rounded-full bg-opacity-0 hover:bg-opacity-30 bg-slate-200 cursor-pointer absolute ${
                     props.card?.image.type && props.card?.image.ntn
                        ? "text-white"
                        : "text-black"
                  } text-xl right-[5px] top-[5px] hover:backdrop-blur-md bg-clip-padding backdrop-filter `}
               >
                  <AiOutlineClose />
               </div>
               {cover.ntn > 0 && cover.type && (
                  <div className='w-full h-[400px] overflow-hidden flex items-center justify-center rounded-t-xl'>
                     <Image
                        width={1000}
                        height={1000}
                        className='h-full object-fill'
                        src={`/assets/background/bg-${cover.type}/bg${cover.ntn}.jpg`}
                        alt=''
                        priority
                     />
                  </div>
               )}
               <div className='flex items-start justify-between p-3'>
                  <div className='flex items-start justify-start'>
                     <div className='p-2 text-xl'>
                        <FaFlipboard />
                     </div>
                     <div className='p-1'>
                        <h2 className='text-lg font-medium'>
                           {props.card.text}
                        </h2>
                        <span className='text-sm'>
                           in list{" "}
                           <span className='underline'>
                              {props.column.name}
                           </span>
                        </span>
                     </div>
                  </div>
               </div>

               <div className='grid grid-cols-5 gap-3 mt-2 p-3'>
                  <div className='md:col-span-4 col-span-5 overflow-y-auto'>
                     {props.card.labels.length > 0 && (
                        <div className='w-full mb-5 pl-10'>
                           <h2 className='font-medium text-sm'>Labels</h2>
                           <br />
                           <div className=' flex items-start justify-start flex-wrap '>
                              {props.card.labels.map((l, index) => {
                                 return (
                                    <div
                                       style={{ backgroundColor: l }}
                                       className='w-[50px] h-[35px] rounded-md mr-[2px] mb-[2px]'
                                       key={index}
                                    ></div>
                                 )
                              })}
                           </div>
                        </div>
                     )}
                     <div className='w-full flex items-center justify-start'>
                        <div className='p-2 text-lg'>
                           <AiOutlineMenu />
                        </div>
                        <div className='p-1'>
                           <h2 className='text-lg font-medium'>Description</h2>
                        </div>
                     </div>
                     <div className='w-full pl-10'>
                        {!showInput && (
                           <div
                              onClick={() => {
                                 setShowInput(true)
                              }}
                              className='bg-slate-50 hover:bg-slate-100 cursor-pointer relative w-full h-[70px] rounded-md '
                           >
                              <span className='p-2 absolute top-0 left-0 text-opacity-50 '>
                                 Add a more detailed description...
                              </span>
                           </div>
                        )}
                        {showInput && (
                           <div className='w-full'>
                              <textarea
                                 autoFocus
                                 rows={10}
                                 className='mb-2  w-full bg-slate-100 outline-none p-2 border-2 border-blue-500'
                                 placeholder={`Pro tip: Hit 'Enter' for a new paragraph, and 'Shift + Enter for a simple line break.`}
                              ></textarea>
                              <div>
                                 <button className='py-2 px-3 bg-blue-500 text-white mr-4 hover:bg-blue-600 rounded-sm text-sm font-medium'>
                                    Save
                                 </button>
                                 <button
                                    onClick={() => {
                                       setShowInput(false)
                                    }}
                                    className='py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-sm text-sm font-medium'
                                 >
                                    Cancel
                                 </button>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
                  <div className='md:col-span-1 col-span-5'>
                     <div>
                        <span className='text-xs font-medium'>Add to card</span>
                     </div>
                     <div>
                        <div className='relative'>
                           <div
                              onClick={() => {
                                 setShowSelectLabel(!showSelectLabel)
                              }}
                           >
                              <CardEdit type={"Labels"}>
                                 <MdOutlineLabel />
                              </CardEdit>
                           </div>
                           {showSelectLabel && (
                              <CardLabelSelect
                                 cardId={props.card.id}
                                 setLabels={props.setLabels}
                                 labels={labels}
                                 setShowSelectLabel={setShowSelectLabel}
                              />
                           )}
                        </div>
                        <div className='relative'>
                           <div
                              onClick={() => {
                                 setShowSelectCover(!showSelectCover)
                              }}
                           >
                              <CardEdit type={"Cover"}>
                                 <BiImage />
                              </CardEdit>
                           </div>
                           {showSelectCover && (
                              <CardCoverSelect
                                 setCoverCard={props.setCoverCard}
                                 cover={cover}
                                 setShowSelectCover={setShowSelectCover}
                              />
                           )}
                        </div>
                     </div>
                     <div>
                        <span className='text-xs font-medium'>Actions</span>
                     </div>
                     <div className='relative'>
                        <div
                           onClick={() => {
                              setShowMoveSelect(!showMoveSelect)
                           }}
                        >
                           <CardEdit type={"Move"}>
                              <IoIosArrowRoundForward />
                           </CardEdit>
                        </div>
                        {showMoveSelect && (
                           <CardMoveSelect
                              moveCardBetweenWorkspaces={
                                 props.moveCardBetweenWorkspaces
                              }
                              setShowMoveSelect={setShowMoveSelect}
                              workspaces={props.workspaces}
                              board={props.board}
                              card={props.card}
                              column={props.column}
                              deleteCard={props.deleteCard}
                           />
                        )}
                     </div>
                     <div
                        onClick={() => {
                           props.deleteCard(props.card.id)
                        }}
                     >
                        <CardEdit type={"Delete"}>
                           <AiOutlineDelete />
                        </CardEdit>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default CardModal
