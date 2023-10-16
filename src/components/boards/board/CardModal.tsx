import {
   Board,
   CardType,
   CheckboxFieldType,
   ColumnType,
   Comment,
   DateFieldType,
   DropdownFieldItem,
   DropdownFieldType,
   FieldType,
   NumberFieldType,
   TextFieldType,
   User,
   WorkspaceType,
} from "@/types"
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
import { RxActivityLog } from "react-icons/rx"
import AsyncStorage from "@react-native-async-storage/async-storage"
import CardComment from "./CardComment"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { LuRectangleHorizontal } from "react-icons/lu"
import CardFieldsSelect from "./CardFieldsSelect"
import { db } from "@/firebase"
import { collection, addDoc, getDocs } from "@firebase/firestore"
import FieldPreview from "./field/FieldPreview"
import AddField from "./field/AddField"
import EditDropdownField from "./editField/EditDropdownField"
import { updateDoc, doc } from "firebase/firestore"
const renderHTML = require("react-render-html")
var uniqid = require("uniqid")

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
   moveCardWithinWorkspace: Function
   workspace: WorkspaceType | undefined
   moveCardWithinBoard: Function
   updateColumn: Function
   addCardDescription: Function
   addField: Function
   removeField: Function
   updateOrAddField: Function
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

function CardModal(props: Props) {
   const fieldCollectionRef = collection(db, "fields")

   const [user, setUser] = useState<User>({
      id: "123",
      email: "viet",
      password: "",
      recentBoard: [],
      auth: "",
   })

   useEffect(() => {
      const getUser = async () => {
         try {
            const data = await AsyncStorage.getItem("USER")
            if (data) {
               setUser(JSON.parse(data))
            }
         } catch (error) {}
      }
      getUser()
   }, [])

   const [showInput, setShowInput] = useState(false)
   const [showComment, setShowComment] = useState(false)
   const [comment, setComment] = useState("")
   const [description, setDescription] = useState(props.card.description)
   const [fields, setFields] = useState<FieldType[]>([])

   const ref = useRef(null)
   const handleClickOutside = () => {
      props.setShowModal(false)
   }
   const handleClickInside = () => {}
   useOnClickOutside(ref, handleClickOutside)
   const [showSelectLabel, setShowSelectLabel] = useState(false)
   const [showSelectCover, setShowSelectCover] = useState(false)
   const [showSelectFields, setShowSelectFields] = useState({
      show: false,
      tab: "",
   })
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

   useEffect(() => {
      getFields()
   }, [])

   const getFields = async () => {
      await getDocs(fieldCollectionRef)
         .then((dataRef) => {
            const newFields: FieldType[] = []
            dataRef.docs.forEach((doc) => {
               if (props.board?.id != undefined) {
                  if (doc.data().boardId === props.board.id) {
                     switch (doc.data().type) {
                        case "dropdown":
                           newFields.push({
                              id: doc.id,
                              boardId: doc.data().boardId,
                              options: [...doc.data().options],
                              title: doc.data().title,
                              type: doc.data().type,
                              selected: { ...doc.data().selected },
                           } as DropdownFieldType)
                           break
                        case "text":
                           newFields.push({
                              id: doc.id,
                              boardId: doc.data().boardId,
                              title: doc.data().title,
                              type: doc.data().type,
                           } as TextFieldType)
                           break
                        case "number":
                           newFields.push({
                              id: doc.id,
                              boardId: doc.data().boardId,
                              title: doc.data().title,
                              value: Number(doc.data().title),
                              type: doc.data().type,
                           } as NumberFieldType)
                           break
                        case "date":
                           newFields.push({
                              id: doc.id,
                              boardId: doc.data().boardId,
                              date: doc.data().date,
                              time: doc.data().time,
                              title: doc.data().title,
                              type: doc.data().type,
                              value: doc.data().value,
                           } as DateFieldType)
                           break
                        case "checkbox":
                           newFields.push({
                              id: doc.id,
                              boardId: doc.data().boardId,
                              isChecked: Boolean(doc.data().isChecked),
                              title: doc.data().title,
                              type: doc.data().type,
                           } as CheckboxFieldType)
                           break
                        default:
                           break
                     }
                  }
               }
            })
            setFields(newFields)
         })
         .catch((err) => {})
   }

   useEffect(() => {}, [props.card.fields])

   const addComment = () => {
      if (comment !== "") {
         const newComment: Comment = {
            id: uniqid(),
            cardId: props.card.id,
            sender: user.email,
            content: comment,
            time: `${
               months[date.getMonth()]
            } ${date.getDate()} at ${date.getHours()}:${date.getMinutes()} ${
               date.getHours() >= 12 ? "PM" : "AM"
            }`,
         }
         const newCard: CardType = {
            ...props.card,
            comments: [newComment, ...props.card.comments],
         }
         const newColumn: ColumnType = {
            ...props.column,
            cards: props.column.cards.map((c) => {
               if (c.id === props.card.id) {
                  return newCard
               }
               return c
            }),
         }
         props.updateColumn(newColumn)
         setComment("")
      }
   }

   const updateComment = (comment: Comment) => {
      const newCard: CardType = {
         ...props.card,
         comments: props.card.comments.map((c) => {
            if (c.id === comment.id) {
               return comment
            }
            return c
         }),
      }
      const newColumn: ColumnType = {
         ...props.column,
         cards: props.column.cards.map((c) => {
            if (c.id === props.card.id) {
               return newCard
            }
            return c
         }),
      }
      props.updateColumn(newColumn)
   }

   const deleteComment = (id: string) => {
      const newCard: CardType = {
         ...props.card,
         comments: props.card.comments.filter((c) => {
            return c.id !== id
         }),
      }
      const newColumn: ColumnType = {
         ...props.column,
         cards: props.column.cards.map((c) => {
            if (c.id === props.card.id) {
               return newCard
            }
            return c
         }),
      }
      props.updateColumn(newColumn)
   }

   const addField = async (field: any) => {
      if (props.board?.id !== undefined) {
         const newField = { ...field, boardId: props.board.id }
         await addDoc(fieldCollectionRef, newField)
      }
      getFields()
   }

   const addOption = async (fieldId: string, option: DropdownFieldItem) => {
      const field = fields.filter(
         (f) => f.id === fieldId
      )[0] as DropdownFieldType
      const newField: DropdownFieldType = {
         ...field,
         options: [...field.options, option],
      }
      await updateDoc(doc(db, "fields", newField.id), newField)
      getFields()
   }
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
                  <div className='md:col-span-4 col-span-5'>
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
                        {!showInput && description !== "" && (
                           <div
                              onClick={() => {
                                 setShowInput(true)
                              }}
                              className='cursor-pointer w-full p-3 bg-slate-50'
                           >
                              {renderHTML(description)}
                           </div>
                        )}
                        {!showInput && description === "" && (
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
                           <div className=''>
                              <CKEditor
                                 editor={ClassicEditor}
                                 data={description}
                                 onChange={(event, editor) => {
                                    const data = editor.getData()
                                    setDescription(data)
                                 }}
                              />
                              <div className='mt-5'>
                                 <button
                                    onClick={() => {
                                       props.addCardDescription(
                                          props.card.id,
                                          description
                                       )
                                       setShowInput(false)
                                    }}
                                    className='py-2 px-3 bg-blue-500 text-white mr-4 hover:bg-blue-600 rounded-sm text-sm font-medium'
                                 >
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
                     {fields.length > 0 && (
                        <>
                           <div className='p-1  flex items-center justify-start mt-5'>
                              <div className='p-2 text-lg'>
                                 <LuRectangleHorizontal />
                              </div>
                              <h2 className='text-lg font-medium'>
                                 Custom Fields
                              </h2>
                           </div>
                           <div className='w-full items-center justify-start mt-3 pl-10 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
                              {/* TODO  */}
                              {fields.map((f, i) => {
                                 return (
                                    <FieldPreview
                                       columnId={props.column.id}
                                       addField={props.addField}
                                       removeField={props.removeField}
                                       card={props.card}
                                       key={i}
                                       field={f}
                                       updateOrAddField={props.updateOrAddField}
                                    />
                                 )
                              })}
                           </div>
                        </>
                     )}
                     <div className='w-full flex items-center justify-start mt-5'>
                        <div className='p-2 text-lg'>
                           <RxActivityLog />
                        </div>
                        <div className='p-1'>
                           <h2 className='text-lg font-medium'>Activities</h2>
                        </div>
                     </div>
                     <div className='w-full mt-3 flex pb-5 items-start'>
                        <div className='relative mr-3 p-4 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 w-fit'>
                           <span className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] '>
                              {user.email.toUpperCase().charAt(0)}
                           </span>
                        </div>
                        {showComment && (
                           <>
                              <div className='w-full mr-3'>
                                 <input
                                    value={comment}
                                    onChange={(e) => {
                                       setComment(e.target.value)
                                    }}
                                    className='relative w-full rounded-[10px] card-shadow outline-none p-3'
                                    placeholder='Write a comment...'
                                    autoFocus
                                 />
                                 <button
                                    onClick={addComment}
                                    className='py-1 mt-3 px-3 rounded-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold'
                                 >
                                    Save
                                 </button>
                              </div>
                           </>
                        )}
                        {!showComment && (
                           <>
                              <div
                                 onClick={() => {
                                    setShowComment(true)
                                 }}
                                 className='relative w-full rounded-[10px] card-shadow p-4 mr-3 bg-white hover:bg-slate-50 cursor-pointer'
                              >
                                 <span className='absolute top-[50%] translate-y-[-50%] text-sm '>
                                    Write a comment...
                                 </span>
                              </div>
                           </>
                        )}
                     </div>
                     <div className='w-full'>
                        {props.card.comments.map((c) => {
                           return (
                              <CardComment
                                 updateComment={updateComment}
                                 key={c.id}
                                 comment={c}
                                 deleteComment={deleteComment}
                              />
                           )
                        })}
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
                        <div className='relative'>
                           <div
                              onClick={() => {
                                 setShowSelectFields({
                                    show: !showSelectFields.show,
                                    tab: "",
                                 })
                              }}
                           >
                              <CardEdit type={"Custom Fields"}>
                                 <LuRectangleHorizontal />
                              </CardEdit>
                           </div>
                           {showSelectFields.show &&
                              showSelectFields.tab === "" && (
                                 <CardFieldsSelect
                                    fields={fields}
                                    addField={addField}
                                    boardId={props.board?.id}
                                    showSelectFields={showSelectFields}
                                    setShowSelectFields={setShowSelectFields}
                                    addOption={addOption}
                                 />
                              )}
                           {showSelectFields.show &&
                              showSelectFields.tab === "addField" && (
                                 <AddField
                                    showSelectFields={showSelectFields}
                                    setShowSelectFields={setShowSelectFields}
                                    addField={addField}
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
                              moveCardWithinWorkspace={
                                 props.moveCardWithinWorkspace
                              }
                              workspace={props.workspace}
                              moveCardWithinBoard={props.moveCardWithinBoard}
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
