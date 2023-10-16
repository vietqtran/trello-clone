import {
   CardType,
   CheckboxFieldType,
   DateFieldType,
   DropdownFieldType,
   FieldType,
   NumberFieldType,
   TextFieldType,
} from "@/types"
import React from "react"
import DropdownField from "./DropdownField"
import TextField from "./TextField"
import NumberField from "./NumberField"
import DateField from "./DateField"
import CheckboxField from "./CheckboxField"

type Props = {
   field: FieldType
   addField: Function
   card: CardType
   columnId: string
   removeField: Function
}

function FieldPreview(props: Props) {
   return (
      <div className='col-span-1'>
         {props.field.type === "dropdown" && (
            <DropdownField field={props.field as DropdownFieldType} />
         )}
         {props.field.type === "text" && (
            <TextField field={props.field as TextFieldType} />
         )}
         {props.field.type === "number" && (
            <NumberField field={props.field as NumberFieldType} />
         )}
         {props.field.type === "date" && (
            <DateField field={props.field as DateFieldType} />
         )}
         {props.field.type === "checkbox" && (
            <CheckboxField
               addField={props.addField}
               removeField={props.removeField}
               card={props.card}
               field={props.field as CheckboxFieldType}
               columnId={props.columnId}
            />
         )}
      </div>
   )
}

export default FieldPreview
