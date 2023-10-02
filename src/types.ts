export type CardType = {
   id: string,
   text: string,
   labels: string[],
   image: {
      ntn: number,
      type: string
   }
   comments: Comment[]
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