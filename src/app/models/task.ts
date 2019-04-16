export class Task{
    constructor(
        public task?:string,
        public date?:string,
        public familyMember:string ="-1",
        public _id?:string
    ){}
}