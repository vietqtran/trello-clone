// File này để hiển thị các component liên quan đến tên thư mục
// Chỉ ném các file liên quan vào cùng 1 thư mục thôi, card thì ném vào folder card, board thì ném vào board, code sẽ tường minh, dễ tìm dễ đọc hơn
// Ví dụ với board thì <BoardContent> sẽ được viết ở đây

import { useEffect } from "react";
import { useBoard } from "./hook";

//vd

export const BoardContent = (props: any) => {
  const { currentWorkspace, boardId, getWorkspaces } = props; // tùy kiểu viết, cần define cả type của prop nhé có thể dùng cách này hoặc cách dưới
// interface Prop {
//     càc type của props
// }
// export const BoardContent = ({ các prop}: Props) => {
  const { renameBoard } = useBoard({
    currentWorkSpace: currentWorkspace,
    boardId,
    getWorkspaces: getWorkspaces,
  });
  useEffect(() => {
    () => {
    // viết hàm demo thui
      renameBoard({
        workspace: currentWorkspace,
        boardId: boardId,
        title: "123213123213",
      });
    };
  }, []);
  return <></>;
};

export default BoardContent;
