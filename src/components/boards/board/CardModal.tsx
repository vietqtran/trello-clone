import { AiOutlineClose, AiOutlineDelete, AiOutlineMenu } from "react-icons/ai"
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
import { addDoc, collection, getDocs } from "@firebase/firestore"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"

import AddField from "./field/AddField"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { BiImage } from "react-icons/bi"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import CardComment from "./CardComment"
import CardCoverSelect from "./CardCoverSelect"
import CardEdit from "./CardEdit"
import CardFieldsSelect from "./CardFieldsSelect"
import CardLabelSelect from "./CardLabelSelect"
import CardMoveSelect from "./CardMoveSelect"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import EditDropdownField from "./editField/EditDropdownField"
import { FaFlipboard } from "react-icons/fa"
import FieldPreview from "./field/FieldPreview"
import Image from "next/image"
import { IoIosArrowRoundForward } from "react-icons/io"
import { LuRectangleHorizontal } from "react-icons/lu"
import { MdOutlineLabel } from "react-icons/md"
import { RxActivityLog } from "react-icons/rx"
import { db } from "@/firebase"
import { nanoid } from "nanoid"
import { useOnClickOutside } from "usehooks-ts"

const renderHTML = require("react-render-html")

type Props = {
   setShowModal: Function
   card: CardType
   column: ColumnType
   columns: ColumnType[]
   setLabels: Function
   setCoverCard: Function
   deleteCard: Function
   moveCardBetweenWorkspaces: Function
   workspaces: WorkspaceType[]
   board: Board | undefined
   moveCardWithinWorkspace: Function
   workspace: WorkspaceType | null
   moveCardWithinBoard: Function
   updateColumn: Function
   addCardDescription: Function
   addField: Function
   removeField: Function
   updateOrAddField: Function
   reSetBoard: Function
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

   const addComment = () => {
      if (comment !== "") {
         const newComment: Comment = {
            id: nanoid(),
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

   const renameField = async (field: FieldType, newName: string) => {
      const newColumns = props.columns.map((col) => {
         return {
            ...col,
            cards: col.cards.map((c) => {
               return {
                  ...c,
                  fields: c.fields.map((f) => {
                     if (f?.id === field.id) {
                        return { ...f, title: newName }
                     }
                     return f
                  }),
               }
            }),
         }
      })
      await updateDoc(doc(db, "fields", field.id), { ...field, title: newName })
      props.reSetBoard(newColumns)
      getFields()
   }

   const changeTitleOption = async (
      field: DropdownFieldType,
      optionId: string,
      newTitle: string
   ) => {
      const newOptions = field.options.map((o) => {
         if (o.id === optionId) {
            return { ...o, title: newTitle }
         }
         return o
      })
      await updateDoc(doc(db, "fields", field.id), {
         ...field,
         options: [...newOptions],
      })
      getFields()
      const newColumns = props.columns.map((col) => {
         return {
            ...col,
            cards: col.cards.map((c) => {
               return {
                  ...c,
                  fields: c.fields.map((f) => {
                     if (f?.id === field.id) {
                        const dropField = f as DropdownFieldType
                        if (dropField.selected.id === optionId) {
                           return {
                              ...f,
                              title: newTitle,
                           }
                        }
                     }
                     return f
                  }),
               }
            }),
         }
      })
      props.reSetBoard(newColumns)
   }

   const changeBgOption = async (
      field: DropdownFieldType,
      optionId: string,
      newBg: string
   ) => {
      const newOptions = field.options.map((o) => {
         if (o.id === optionId) {
            return { ...o, color: newBg }
         }
         return o
      })
      await updateDoc(doc(db, "fields", field.id), {
         ...field,
         options: [...newOptions],
      })
      getFields()
      const newColumns = props.columns.map((col) => {
         return {
            ...col,
            cards: col.cards.map((c) => {
               return {
                  ...c,
                  fields: c.fields.map((f) => {
                     if (f?.id === field.id) {
                        const dropField = f as DropdownFieldType
                        if (dropField.selected.id === optionId) {
                           return {
                              ...f,
                              selected: { ...dropField.selected, color: newBg },
                           }
                        }
                     }
                     return f
                  }),
               }
            }),
         }
      })
      props.reSetBoard(newColumns)
   }

   const deleteOption = async (field: DropdownFieldType, optionId: string) => {
      const newOptions = field.options.filter((o) => o.id !== optionId)
      await updateDoc(doc(db, "fields", field.id), {
         ...field,
         options: [...newOptions],
      })
      getFields()
      const newColumns = props.columns.map((col) => {
         return {
            ...col,
            cards: col.cards.map((c) => {
               return {
                  ...c,
                  fields: c.fields.map((f) => {
                     if (f?.id !== field.id) {
                        return f
                     }
                     return null
                  }),
               }
            }),
         }
      })
      props.reSetBoard(newColumns)
   }

   const deleteField = async (field: FieldType) => {
      await deleteDoc(doc(db, "fields", field.id))
      getFields()
      const newColumns = props.columns.map((col) => {
         return {
            ...col,
            cards: col.cards.map((c) => {
               return {
                  ...c,
                  fields: c.fields.filter((f) => {
                     return f?.id != field.id
                  }),
               }
            }),
         }
      })
      props.reSetBoard(newColumns)
   }

   return (
      <div className='fixed bottom-0 left-0 right-0 top-0 z-40 flex h-full min-h-[100vh] w-full min-w-[100vw] items-start justify-center overflow-y-auto bg-black bg-opacity-75 pb-10 pt-20'>
         <div
            onClick={handleClickInside}
            ref={ref}
            className='modal relative z-50 w-full max-w-[1000px] rounded-xl bg-white pb-5'
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
               <div className='flex h-[400px] w-full items-center justify-center overflow-hidden rounded-t-xl'>
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
                     <h2 className='text-lg font-medium'>{props.card.text}</h2>
                     <span className='text-sm'>
                        in list{" "}
                        <span className='underline'>{props.column.name}</span>
                     </span>
                  </div>
               </div>
            </div>

            <div className='mt-2 grid grid-cols-5 gap-3 p-3'>
               <div className='col-span-5 md:col-span-4'>
                  {props.card.labels.length > 0 && (
                     <div className='mb-5 w-full pl-10'>
                        <h2 className='text-sm font-medium'>Labels</h2>
                        <br />
                        <div className='flex flex-wrap items-start justify-start'>
                           {props.card.labels.map((l, index) => {
                              return (
                                 <div
                                    style={{ backgroundColor: l }}
                                    className='mb-[2px] mr-[2px] h-[35px] w-[50px] rounded-md'
                                    key={index}
                                 ></div>
                              )
                           })}
                        </div>
                     </div>
                  )}
                  <div className='flex w-full items-center justify-start'>
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
                           className='w-full cursor-pointer bg-slate-50 p-3'
                        >
                           {renderHTML(description)}
                        </div>
                     )}
                     {!showInput && description === "" && (
                        <div
                           onClick={() => {
                              setShowInput(true)
                           }}
                           className='relative h-[70px] w-full cursor-pointer rounded-md bg-slate-50 hover:bg-slate-100'
                        >
                           <span className='absolute left-0 top-0 p-2 text-opacity-50'>
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
                                 className='mr-4 rounded-sm bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600'
                              >
                                 Save
                              </button>
                              <button
                                 onClick={() => {
                                    setShowInput(false)
                                 }}
                                 className='rounded-sm bg-slate-100 px-3 py-2 text-sm font-medium hover:bg-slate-200'
                              >
                                 Cancel
                              </button>
                           </div>
                        </div>
                     )}
                  </div>
                  {fields.length > 0 && (
                     <>
                        <div className='mt-5 flex items-center justify-start p-1'>
                           <div className='p-2 text-lg'>
                              <LuRectangleHorizontal />
                           </div>
                           <h2 className='text-lg font-medium'>
                              Custom Fields
                           </h2>
                        </div>
                        <div className='mt-3 grid w-full grid-cols-2 items-center justify-start gap-3 pl-10 sm:grid-cols-3 md:grid-cols-4'>
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
                  <div className='mt-5 flex w-full items-center justify-start'>
                     <div className='p-2 text-lg'>
                        <RxActivityLog />
                     </div>
                     <div className='p-1'>
                        <h2 className='text-lg font-medium'>Activities</h2>
                     </div>
                  </div>
                  <div className='mt-3 flex w-full items-start pb-5'>
                     <div className='relative mr-3 w-fit rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 p-4 text-sm font-semibold text-white'>
                        <span className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                           {user.email.toUpperCase().charAt(0)}
                        </span>
                     </div>
                     {showComment && (
                        <>
                           <div className='mr-3 w-full'>
                              <input
                                 value={comment}
                                 onChange={(e) => {
                                    setComment(e.target.value)
                                 }}
                                 className='card-shadow relative w-full rounded-[10px] p-3 outline-none'
                                 placeholder='Write a comment...'
                                 autoFocus
                              />
                              <button
                                 onClick={addComment}
                                 className='mt-3 rounded-sm bg-blue-500 px-3 py-1 font-semibold text-white hover:bg-blue-600'
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
                              className='card-shadow relative mr-3 w-full cursor-pointer rounded-[10px] bg-white p-4 hover:bg-slate-50'
                           >
                              <span className='absolute top-[50%] translate-y-[-50%] text-sm'>
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
               <div className='col-span-5 md:col-span-1'>
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
                                 renameField={renameField}
                                 changeBgOption={changeBgOption}
                                 changeTitleOption={changeTitleOption}
                                 deleteField={deleteField}
                                 deleteOption={deleteOption}
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
   )
}

export default CardModal
