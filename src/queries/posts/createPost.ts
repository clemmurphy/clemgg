interface PostToCreate {
  title: string
  content: string
  authorId: number
}

export async function createPost(post: PostToCreate) {
  try {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
    return res.json()
  } catch (e) {
    console.log(e)
  }
}
