export type Board = {
   id: string,
   workspaceId: string,
   title: string,
   columns: [],
   star: false,
   background: {
      ntn: number,
      type: string
   }
}

export type User = {
   id: string,
   email: string,
   password: string,
   recentBoard: []
}

export type WorkspaceType = {
   id: string,
   userId: string,
   name: string,
   boards: Board[],
   type: string
}