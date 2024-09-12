// BE related logic and users API endpoints

export async function GET(request: Request) {
  console.log(request)

  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
  ]

  return new Response(JSON.stringify(users))
}
