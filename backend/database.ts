import { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { TRecipe } from './types/recipes.types'
import serviceAccount from '../.secrets/firestore-sa.json'

if (admin.apps.length === 0) {
  // initialize Firebase admin
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    projectId: process.env.FIRESTORE_PROJECT_ID
  })
  firestore().settings({ ignoreUndefinedProperties: true }) // TODO: is this needed?
}

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => snap.data() as T
})

const typedCollection = <T>(collectionPath: string) => firestore().collection(collectionPath).withConverter(converter<T>())

const db = {
  recipes: typedCollection<TRecipe>('lb-recipes')
}

export default db
