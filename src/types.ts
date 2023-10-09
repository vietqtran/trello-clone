import React from "react"

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
   }
}


export type WorkspaceType = {
   id: string,
   userId: string,
   name: string,
   boards: Board[] | undefined,
   type: string,
   description: string
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
export type CheckboxField = {
   id: string,
   boardId: string,
   title: string
   type: string,
   isChecked: boolean,
}

export type DateField = {
   id: string,
   boardId: string,
   title: string,
   type: string,
   date: string,
   time: string,
   value: string
}

export type DropdownFieldItem = {
   id: string,
   color: string,
   title: string
}

export type DropdownField = {
   id: string,
   boardId: string,
   title: string,
   type: string,
   options: DropdownFieldItem[]
}

export type TextField = {
   id: string,
   boardId: string,
   title: string,
   value: string,
   type: string,
}

export type NumberField = {
   id: string,
   boardId: string,
   title: string,
   value: number,
   type: string,
}

export type FieldType =
   | DropdownField
   | CheckboxField
   | DateField
   | TextField
   | NumberField