import { WorkspaceType } from "@types"

export const WORKSPACE_GETALL = 'WORKSPACE_GETALL'

export const getAllWorkspaces = (workspaces: WorkspaceType[]) => {
    return {
        type: WORKSPACE_GETALL,
        payload: [ ...workspaces ]
    }
}