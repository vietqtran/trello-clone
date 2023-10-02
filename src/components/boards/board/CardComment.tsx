import { Comment } from "@/types"
import React, { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

type Props = {
   comment: Comment
   updateComment: Function
   deleteComment: Function
}

const date = new Date()
const months = [
   "Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "Jun",
   "Jul",
   "Aug",
   "Sep",
   "Oct",
   "Nov",
   "Dec",
]

function CardComment(props: Props) {
   const [showEdit, setShowEdit] = useState(false)
   const [editContent, setEditContent] = useState(props.comment.content)
   const [showDelete, setShowDelete] = useState(false)
   return (
      <div className='w-full flex pb-5 items-start'>
         <div className='relative mr-3 p-4 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 w-fit'>
            <span className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] '>
               {props.comment.sender.toUpperCase().charAt(0)}
            </span>
         </div>
         <div className='mr-3 w-full'>
            <div>
               <span className='font-semibold'>{props.comment.sender}</span>
               <span className='text-xs ml-3'>{props.comment.time}</span>
            </div>
            {!showEdit && (
               <>
                  <div className='max-w-[90%] whitespace-pre-wrap w-fit text-sm px-4 py-2 rounded-[10px] mt-2 card-shadow truncate'>
                     {props.comment.content}
                  </div>
                  <div className='mt-2 flex'>
                     <button
                        onClick={() => {
                           setShowEdit(true)
                        }}
                        className='text-xs underline mr-3'
                     >
                        Edit
                     </button>
                     <div className='relative'>
                        <span
                           onClick={() => {
                              setShowDelete(!showDelete)
                           }}
                           className='text-xs underline cursor-pointer'
                        >
                           Delete
                        </span>
                        {showDelete && (
                           <div className='shadow-md w-[300px] left-0 bg-white rounded-md absolute top-[30px] delete-card-shadow z-50'>
                              <div className='w-full flex p-3 items-center relative justify-center'>
                                 <span className='text-center text-sm font-semibold'>
                                    Delete comment?
                                 </span>
                                 <span
                                    onClick={() => {
                                       setShowDelete(false)
                                    }}
                                    className='absolute right-0 hover:bg-slate-100 p-2 cursor-pointer mr-2 rounded-sm'
                                 >
                                    <AiOutlineClose />
                                 </span>
                              </div>
                              <p className='px-3 text-sm'>
                                 Deleting a comment is forever. There is no
                                 undo.
                              </p>
                              <div className='p-3'>
                                 <button
                                    onClick={() => {
                                       props.deleteComment(props.comment.id)
                                    }}
                                    className=' w-full py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-sm'
                                 >
                                    Delete comment
                                 </button>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </>
            )}
            {showEdit && (
               <>
                  <div>
                     <input
                        type='text'
                        className='mt-2 w-full p-2 outline-none bg-slate-50 rounded-[10px] border-blue-500 border-2'
                        autoFocus
                        value={editContent}
                        onChange={(e) => {
                           setEditContent(e.target.value)
                        }}
                     />
                  </div>
                  <div>
                     <button
                        onClick={() => {
                           if (editContent !== "") {
                              props.updateComment({
                                 ...props.comment,
                                 content: editContent,
                                 time: `Edit at ${months[date.getMonth()]
                                    } ${date.getDate()} at ${date.getHours()}:${date.getMinutes()} ${date.getHours() >= 12 ? "PM" : "AM"
                                    }`,
                              })
                              setShowEdit(false)
                           }
                        }}
                        className='py-1 mt-3 px-3 rounded-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold mr-3'
                     >
                        Save
                     </button>
                     <button
                        onClick={() => {
                           setShowEdit(false)
                           setEditContent(props.comment.content)
                        }}
                        className='py-1 mt-3 px-3 rounded-sm bg-slate-100 hover:bg-slate-200 text-black font-semibold'
                     >
                        Discard Change
                     </button>
                  </div>
               </>
            )}
         </div>
      </div>
   )
}

export default CardComment
