import type { NextApiRequest, NextApiResponse } from 'next'
import LiesburyRecipesService from 'services/LiesburyRecipesService'
import { EErrorCode, EErrorMessage } from 'types/enums'

export default async (_: NextApiRequest, res: NextApiResponse<any>): Promise<void> => {
  try {
    const data = await LiesburyRecipesService.getData()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ errorCode: EErrorCode.E1, errorMsg: EErrorMessage[EErrorCode.E1] })
  }
}
