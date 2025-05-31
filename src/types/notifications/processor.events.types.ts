export type ProcessEvent = {
    userId: string|null,
    type: string,
    data: any
}
export type EventHandler = (payload: any) => Promise<void>;