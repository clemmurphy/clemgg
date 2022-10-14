interface UserToCreate {
  name: string
  email: string
}

export async function createUser(user: UserToCreate) {
  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    return res.json()
  } catch (e) {
    console.log(e)
  }
}
