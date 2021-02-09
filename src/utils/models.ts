export interface Blog {
    id?: number,
    title: string,
    content?: string,
    authorid?: number,
    author?: string,
    tag?: string,
    _created?: Date
}

export interface UserFront {
    userid: number,
    role: string
}