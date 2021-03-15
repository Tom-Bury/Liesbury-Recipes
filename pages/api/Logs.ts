import { createReadStream, stat } from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAvailableLogFileDates, getLogFilePath } from 'services/LoggingService'
import { EErrorCode, EErrorMessage } from 'types/enums'

export default async (req: NextApiRequest, res: NextApiResponse<any>): Promise<void> => {
  try {
    const { date } = req.query

    if (date) {
      const filePath = getLogFilePath(date.toString())
      stat(filePath, (err, _) => {
        if (err) {
          res.status(404)
        } else {
          res.setHeader('Content-disposition', `attachment; filename=logfile-${date}.log`)
          const fileStream = createReadStream(filePath)
          fileStream.pipe(res)
        }
      })
    } else {
      getAvailableLogFileDates(files => res.status(200).json({ results: files }))
    }
  } catch (error) {
    res.status(500).json({ errorCode: EErrorCode.E2, errorMsg: EErrorMessage[EErrorCode.E2] })
  }
}
