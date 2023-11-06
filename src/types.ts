
export type CardType = {
   id: string,
   text: string,
   labels: string[],
   image: {
      ntn: number,
      type: string
   }
   comments: Comment[],
   description: string,
   fields: FieldType[]
}

export type Comment = {
   id: string,
   cardId: string,
   sender: string,
   content: string,
   time: string
}

export type Board = {
   id: string,
   workspaceId: string,
   title: string,
   columns: ColumnType[],
   star: boolean,
   background: {
      ntn: number,
      type: string
   },
   visibility: string,
}

export type BoardMembers = {
   id: string,
   boardId: string,
   boardMembers: string[]
}


export type WorkspaceType = {
   id: string,
   userId: string,
   name: string,
   boards: Board[] | undefined,
   type: string,
   description: string,
   role: number
}

export type ColumnType = {
   id: string,
   name: string,
   cards: CardType[]
}

export type User = {
   id: string,
   email: string,
   password: string,
   recentBoard: Board[],
   auth: string
}


/**
 * * Field
 */
export type CheckboxFieldType = {
   id: string,
   boardId: string,
   title: string
   type: string,
   isChecked: boolean,
}

export type DateFieldType = {
   id: string,
   boardId: string,
   title: string,
   type: string,
   date: string,
   time: string,
}

export type DropdownFieldItem = {
   id: string,
   color: string,
   title: string
}

export type DropdownFieldType = {
   id: string,
   boardId: string,
   title: string,
   type: string,
   options: DropdownFieldItem[],
   selected: DropdownFieldItem
}

export type TextFieldType = {
   id: string,
   boardId: string,
   title: string,
   value: string,
   type: string,
}

export type NumberFieldType = {
   id: string,
   boardId: string,
   title: string,
   value: number,
   type: string,
}

export type FieldType =
   | DropdownFieldType
   | CheckboxFieldType
   | DateFieldType
   | TextFieldType
   | NumberFieldType