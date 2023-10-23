import React, { useRef, useState } from "react"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { FaFlipboard, FaHashtag } from "react-icons/fa"
import { MdDateRange, MdOutlineKeyboardArrowRight } from "react-icons/md"
import { PiTextTBold } from "react-icons/pi"
import { RiDraggable } from "react-icons/ri"
import { SlArrowRight } from "react-icons/sl"
import EditDropdownField from "../editField/EditDropdownField"
import EditNumberField from "../editField/EditNumberField"
import EditTextField from "../editField/EditTextField"
import EditDateField from "../editField/EditDateField"
import EditCheckboxField from "../editField/EditCheckboxField"
import { useOnClickOutside } from "usehooks-ts"

type Props = {
   field: any
   setTab: Function
   setField: Function
   addOption: Function
   setShowSelectFields: Function
   renameField: Function
   changeTitleOption: Function
   changeBgOption: Function
   deleteOption: Function
   deleteField: Function
}
function FieldSelect(props: Props) {
   const [editTab, setEditTab] = useState("")

   const ref = useRef(null)
   const handleClickOutside = () => {
      setEditTab("")
   }
   const handleClickInside = (e: any) => {
      e.stopPropagation()
   }
   useOnClickOutside(ref, handleClickOutside)

   return (
      <div
         onClick={() => {
            setEditTab(props.field.type)
         }}
         className='flex items-center justify-between text-xs bg-slate-100 hover:bg-slate-200 p-[10px] rounded-sm cursor-pointer mb-2 relative'
      >
         <div className='flex items-center justify-start text-xs'>
            <span className='text-sm'>
               <RiDraggable />
            </span>
            <span className='text-gray-800 block ml-5 mr-2'>
               {props.field.type === "dropdown" && <FaFlipboard />}
               {props.field.type === "number" && <FaHashtag />}
               {props.field.type === "checkbox" && <AiOutlineCheckCircle />}
               {props.field.type === "text" && <PiTextTBold />}
               {props.field.type === "date" && <MdDateRange />}
            </span>
            <span>{props.field.title}</span>
         </div>
         {editTab !== "" && (
            <div
               onClick={(e) => {
                  handleClickInside(e)
               }}
               ref={ref}
               className='absolute left-[calc(100%+20px)] top-0 drop-menu-shadow z-10 w-[330px] rounded-md bg-white p-2'
            >
               {editTab === "dropdown" && (
                  <EditDropdownField
                     renameField={props.renameField}
                     addOption={props.addOption}
                     field={props.field}
                     setShowSelectFields={props.setShowSelectFields}
                     setEditTab={setEditTab}
                     changeBgOption={props.changeBgOption}
                     changeTitleOption={props.changeTitleOption}
                     deleteField={props.deleteField}
                     deleteOption={props.deleteOption}
                  />
               )}
               {editTab === "checkbox" && (
                  <EditCheckboxField
                     renameField={props.renameField}
                     field={props.field}
                     setShowSelectFields={props.setShowSelectFields}
                     deleteField={props.deleteField}
                     setEditTab={setEditTab}
                  />
               )}
               {editTab === "date" && (
                  <EditDateField
                     renameField={props.renameField}
                     field={props.field}
                     setShowSelectFields={props.setShowSelectFields}
                     deleteField={props.deleteField}
                     setEditTab={setEditTab}
                  />
               )}
               {editTab === "text" && (
                  <EditTextField
                     renameField={props.renameField}
                     field={props.field}
                     setShowSelectFields={props.setShowSelectFields}
                     deleteField={props.deleteField}
                     setEditTab={setEditTab}
                  />
               )}
               {editTab === "number" && (
                  <EditNumberField
                     renameField={props.renameField}
                     field={props.field}
                     setShowSelectFields={props.setShowSelectFields}
                     deleteField={props.deleteField}
                     setEditTab={setEditTab}
                  />
               )}
            </div>
         )}
      </div>
   )
}

export default FieldSelect
