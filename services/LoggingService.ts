import { stat, writeFile, appendFile, readdir } from 'fs'
import path from 'path'

const LOGFILE_PREFIX = path.join(process.cwd(), 'public', 'logs', 'logfile')
const LOGFILE_EXT = '.log'

const getCurrLogFileName = () => {
  const now = new Date()
  return `${LOGFILE_PREFIX}-${now.getUTCDate()}-${now.getUTCMonth()}-${now.getUTCFullYear()}${LOGFILE_EXT}`
}

export const getLogFilePath = (dateStr: string): string => {
  return `${LOGFILE_PREFIX}-${dateStr}${LOGFILE_EXT}`
}

export const getAvailableLogFileDates = (callback: (dates: string[]) => void) => {
  const logsDir = path.join(process.cwd(), 'public', 'logs')
  readdir(logsDir, (err, files) => {
    if (err) {
      callback([])
    } else {
      callback(files.filter(f => f.endsWith('.log')).map(f => f.substring(f.indexOf('-') + 1, f.lastIndexOf('.'))))
    }
  })
}

class LoggingService {
  private ready = false

  constructor() {
    this.init(() => null)
  }

  private init(callback: () => void) {
    stat(getCurrLogFileName(), (err, _) => {
      if (err) {
        writeFile(getCurrLogFileName(), `${Date.now()},INIT LOGFILE`, initErr => {
          this.ready = !initErr
          callback()
        })
      } else {
        this.ready = true
        callback()
      }
    })
  }

  public writeLog(data: string) {
    if (this.ready) {
      try {
        appendFile(getCurrLogFileName(), `\n${Date.now()},${data}`, err => {
          if (err) {
            this.init(() => this.writeLog(data))
          }
        })
      } catch (_) {
        this.init(() => this.writeLog(data))
      }
    }
  }
}

export default new LoggingService()
