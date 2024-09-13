// Sample to explain the folder structure

type UserProps = {
  params: {
    userId: number
  }
}

const User: React.FC<UserProps> = ({ params }) => {
  const { userId: postId } = params

  return <div>This is user {postId}</div>
}

export default User
