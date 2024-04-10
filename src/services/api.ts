import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://brapi.dev/api',
  params: {
    token: '7pasz5FoPHivNRYx7ASgRy',
  },
})
