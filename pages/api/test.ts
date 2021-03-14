import type { NextApiRequest, NextApiResponse } from 'next'
import { EErrorCode, EErrorMessage } from 'types/enums'
import { getAllRecipes } from '~/utils/recipesData.utils'

export default async (_: NextApiRequest, res: NextApiResponse<any>): Promise<void> => {
  try {
    const data = await getAllRecipes()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ errorCode: EErrorCode.E1, errorMsg: EErrorMessage[EErrorCode.E1] })
  }
}
