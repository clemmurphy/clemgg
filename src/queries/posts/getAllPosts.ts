export async function getAllPosts() {
  const res = await fetch(`/api/posts`)
  return res.json()
}
