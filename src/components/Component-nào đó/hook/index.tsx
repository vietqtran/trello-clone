//File này để viết các hàm xử lý các logic liên quan đến thư mục vừa tên thư mục gốc
// File này để xử lý những phần ít tổng quát hơn
// với board thì cái này sẽ gồm các hàm như là editName, starBoard,...

import { updateBoard } from "@/hooks/board";
import { WorkspaceType } from "@/types";

//Vd:

export const useBoard = ({
  currentWorkSpace,
  boardId,
  getWorkspaces,
}: {
  currentWorkSpace: WorkspaceType | any // Lười define nên để any
  boardId: string| any
  getWorkspaces: () => WorkspaceType[]| any
}) => {

  const renameBoard = async ({ workspace, boardId, title }: {
    workspace: WorkspaceType,
    boardId: string,
    title: string,
  }) => {
    //Cần xử lý thêm thì viết thêm, ko thì thôi
    updateBoard({ workspace, boardId, title });
    getWorkspaces();
  };

//Gọi linh tink
  () => {
    renameBoard({  workspace: currentWorkSpace, boardId , title: '123123123123' });
  }

  return {
    renameBoard,
  };
};
