import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { Post } from 'src/types/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | Post | { error: string }>
) {
  const prisma = new PrismaClient()
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const posts = await prisma.post.findMany({
          include: {
            author: true,
          },
        })
        res.status(200).json(posts as Post[])
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error fetching posts' })
      }
      break
    case 'POST':
      try {
        const post = await prisma.post.create({
          data: req.body,
        })
        res.status(200).json(post)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error posting post' })
      }
      break
  }
}
