import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { User } from 'src/types/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { error: string }>
) {
  const prisma = new PrismaClient()
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: Number(req.query.id),
          },
          include: {
            posts: true,
          },
        })
        res.status(200).json(user as User)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error fetching users' })
      }
      break
    case 'POST':
      const body = req.body
      console.log(body)
      try {
        const user = await prisma.user.create({
          data: {
            name: body.name,
            email: body.email,
          },
        })
        res.status(200).json(user as User)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error creating user' })
      }
      break
  }
}
