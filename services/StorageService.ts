import { Storage, Bucket } from '@google-cloud/storage'
import * as dotenv from 'dotenv'

dotenv.config()
class StorageService {
  private bucket: Bucket

  public static bucketUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}`

  constructor() {
    const bucketName = process.env.GCS_BUCKET_NAME
    const secret = JSON.parse(Buffer.from(process.env.GCS_SERVICE_ACCOUNT as string, 'base64').toString())
    const storage = new Storage({
      projectId: process.env.GC_PROJECT_ID,
      credentials: {
        client_email: secret.client_email,
        client_id: secret.client_id,
        private_key: secret.private_key
      }
    })
    this.bucket = storage.bucket(bucketName as string)
  }

  public async uploadFile(file: Buffer, fileName: string): Promise<void> {
    const newFileRef = this.bucket.file(fileName)
    await newFileRef.save(file)
  }

  public async fileExists(fileName: string): Promise<boolean> {
    const fileRef = this.bucket.file(fileName)
    const response = await fileRef.exists()
    const exists = response[0]
    return exists
  }
}

export default StorageService
