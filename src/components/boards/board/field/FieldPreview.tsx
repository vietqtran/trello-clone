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
   updateOrAddField: Function
}

function FieldPreview(props: Props) {
   return (
      <div className='col-span-1'>
         {props.field.type === "dropdown" && (
            <DropdownField
               addField={props.addField}
               updateOrAddField={props.updateOrAddField}
               removeField={props.removeField}
               card={props.card}
               columnId={props.columnId}
               field={props.field as DropdownFieldType}
            />
         )}
         {props.field.type === "text" && (
            <TextField
               addField={props.addField}
               updateOrAddField={props.updateOrAddField}
               removeField={props.removeField}
               card={props.card}
               columnId={props.columnId}
               field={props.field as TextFieldType}
            />
         )}
         {props.field.type === "number" && (
            <NumberField
               addField={props.addField}
               updateOrAddField={props.updateOrAddField}
               removeField={props.removeField}
               card={props.card}
               columnId={props.columnId}
               field={props.field as NumberFieldType}
            />
         )}
         {props.field.type === "date" && (
            <DateField
               addField={props.addField}
               updateOrAddField={props.updateOrAddField}
               removeField={props.removeField}
               card={props.card}
               columnId={props.columnId}
               field={props.field as DateFieldType}
            />
         )}
         {props.field.type === "checkbox" && (
            <CheckboxField
               addField={props.addField}
               removeField={props.removeField}
               card={props.card}
               columnId={props.columnId}
               field={props.field as CheckboxFieldType}
            />
         )}
      </div>
   )
}

export default FieldPreview
