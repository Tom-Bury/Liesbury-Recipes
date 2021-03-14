import type { NextApiRequest, NextApiResponse } from 'next'
import { EErrorCode, EErrorMessage } from 'types/enums'
import Fuse from 'fuse.js'
import { getAllRecipes } from '~/utils/recipesData.utils'

export default async (req: NextApiRequest, res: NextApiResponse<any>): Promise<void> => {
  try {
    const allRecipes = await getAllRecipes()
    const query = Array.isArray(req.query.q) ? req.query.q.join(' ') : req.query.q

    const searchOptions = {
      keys: ['title']
    }

    const fuse = new Fuse(allRecipes, searchOptions)

    const results = fuse.search(query)

    res.status(200).json({ results: results.map(i => i.item) })
  } catch (error) {
    res.status(500).json({ errorCode: EErrorCode.E1, errorMsg: EErrorMessage[EErrorCode.E1] })
  }
}
