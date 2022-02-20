import { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { TRecipe } from './types/recipes.types'

if (admin.apps.length === 0) {
  // initialize Firebase admin
  if (!process.env.FIRESTORE_PROJECT_ID || !process.env.FIRESTORE_PROJECT_ID) {
    throw new Error('No firestore service account / project ID setup')
  }
  const serviceAccount = JSON.parse(process.env.FIRESTORE_SA || '')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    projectId: process.env.FIRESTORE_PROJECT_ID
  })
  firestore().settings({ ignoreUndefinedProperties: true }) // TODO: is this needed?
}

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => (({ ...snap.data(), id: snap.id } as unknown) as T)
})

const typedCollection = <T>(collectionPath: string) => firestore().collection(collectionPath).withConverter(converter<T>())

const db = {
  recipes: typedCollection<TRecipe>('lb-recipes')
}

export default db
