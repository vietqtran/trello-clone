import Image from "next/image"
import React, { memo, useState } from "react"
import { HiOutlinePencil } from "react-icons/hi"
import CardLabels from "./CardLabels"
import { Draggable } from "react-beautiful-dnd"
import CardModal from "./CardModal"
import { Board, ColumnType, Comment, WorkspaceType } from "@/types"
import { PiChatThin } from "react-icons/pi"

type Props = {
   card: {
      id: string
      text: string
      labels: string[]
      image: {
         ntn: number
         type: string
      }
      comments: Comment[]
   }
   index: number
   column: ColumnType
   setLabels: Function
   setCover: Function
   deleteCard: Function
   moveCardBetweenWorkspaces: Function
   workspaces: WorkspaceType[]
   board: Board | undefined
   moveCardWithinWorkspace: Function
   workspace: WorkspaceType | undefined
   moveCardWithinBoard: Function
   updateColumn: Function
}

function Card(props: Props) {
   const setCoverCard = (image: { ntn: number; type: string }) => {
      props.setCover(image, props.card.id)
   }

   const [showModal, setShowModal] = useState(false)

   return (
      <>
         <Draggable draggableId={props.card.id} index={props.index}>
            {(provided, snapshot) => (
               <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  data-is-dragging={snapshot.isDragging}
                  {...provided.dragHandleProps}
                  className='relative group w-full bg-white hover:bg-slate-100 rounded-lg overflow-hidden card-shadow my-1 cursor-pointer'
               >
                  {props?.card?.image.ntn !== 0 &&
                     props?.card?.image.type !== "" && (
                        <div className='w-full'>
                           <Image
                              className='object-cover w-full h-full'
                              src={`/assets/background/bg-${props.card.image.type}/bg${props.card.image.ntn}.jpg`}
                              width={150}
                              height={400}
                              alt='cover'
                              priority
                           />
                        </div>
                     )}
                  {props.card.labels && props.card.labels.length > 0 && (
                     <CardLabels labels={props.card.labels} />
                  )}
                  <div className='p-2'>
                     <p className='text-sm whitespace-normal truncate max-w-[239px] block w-full'>
                        {props.card.text}
                     </p>
                     <span
                        onClick={() => {
                           setShowModal(true)
                        }}
                        className='absolute hidden group-hover:block right-0 top-0 p-[5px] bg-slate-300 bg-opacity-50 hover:bg-opacity-70 rounded-md m-1'
                     >
                        <HiOutlinePencil />
                     </span>
                     {props.card.comments?.length > 0 && (
                        <div className='mt-1'>
                           <span className='flex items-center'>
                              <PiChatThin />
                              <span className='text-xs ml-1'>
                                 {props.card.comments.length}
                              </span>
                           </span>
                        </div>
                     )}
                  </div>
               </div>
            )}
         </Draggable>
         {showModal && (
            <CardModal
               deleteCard={props.deleteCard}
               setCoverCard={setCoverCard}
               setLabels={props.setLabels}
               column={props.column}
               card={props.card}
               setShowModal={setShowModal}
               moveCardBetweenWorkspaces={props.moveCardBetweenWorkspaces}
               workspaces={props.workspaces}
               board={props.board}
               moveCardWithinWorkspace={props.moveCardWithinWorkspace}
               workspace={props.workspace}
               moveCardWithinBoard={props.moveCardWithinBoard}
               updateColumn={props.updateColumn}
            />
         )}
      </>
   )
}

export default memo(Card)
