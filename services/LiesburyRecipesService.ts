import fetch from 'node-fetch'
import neatCsv from 'neat-csv'

class CSVFetchService {
  private url: string

  constructor(url: string) {
    this.url = url
  }

  public async getData() {
    const res = await fetch(this.url)
    const text = await res.buffer()
    return neatCsv(text)
  }
}

const LiesburyRecipesService = new CSVFetchService(
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQSX6_vVklWYgnay7sSHwIDzN7h76paDCNPXqUSK7JaKGXE8gH17uymHre3L7pX3dE9jTx4bdSiejf5/pub?output=csv'
)

export default LiesburyRecipesService
