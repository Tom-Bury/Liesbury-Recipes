import { stat, writeFile, appendFile } from 'fs'

const LOGFILE_PREFIX = './public/logs/logfile'
const LOGFILE_EXT = '.log'

const getCurrLogFileName = () => {
  const now = new Date()
  return `${LOGFILE_PREFIX}-${now.getUTCDate()}-${now.getUTCMonth()}-${now.getUTCFullYear()}${LOGFILE_EXT}`
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
