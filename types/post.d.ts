type Post = {
  _id: ObjectId | string
  prompt: string
  tag: string
  creator?: Creator
}
