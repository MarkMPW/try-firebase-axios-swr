import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const firebaseConfig = initializeApp({
    apiKey: 'AIzaSyBfEUkEXh-PxqzMjS7YeWWI519L2aj8ORk',
    authDomain: 'fir-api-15a68.firebaseapp.com',
    projectId: 'fir-api-15a68',
    storageBucket: 'fir-api-15a68.appspot.com',
    messagingSenderId: '1005587620016',
    appId: '1:1005587620016:web:d27f7994b06541102b5b75',
    measurementId: 'G-E9M24EHVJG',
})

export const auth = getAuth(firebaseConfig)