import type { NextApiRequest, NextApiResponse } from 'next'
import { EErrorCode, EErrorMessage } from 'types/enums'
import { getAllRecipes } from '~/utils/recipesData.utils'

export default async (req: NextApiRequest, res: NextApiResponse<any>): Promise<void> => {
  try {
    const allRecipes = await getAllRecipes()
    const query = req.query.q
    res.status(200).json({ results: allRecipes })
  } catch (error) {
    res.status(500).json({ errorCode: EErrorCode.E1, errorMsg: EErrorMessage[EErrorCode.E1] })
  }
}
