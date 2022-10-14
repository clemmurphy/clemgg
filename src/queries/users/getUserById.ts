export async function getUserById(id: number) {
  const res = await fetch(`/api/users?id=${id}`)
  return res.json()
}
