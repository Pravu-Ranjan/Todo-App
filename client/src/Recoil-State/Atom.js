import { atom, selector } from 'recoil'
import axios from 'axios'

var getAllTodoURL = process.env.REACT_APP_API_PATH + '/findAll'

export const Todo = atom({
  key: 'todo',
  default: [],
})

export const Comment = atom({
  key: 'comment',
  default: [],
})

export const fetchTodos = selector({
  key: 'allTodos',
  get: async ({ get }) => {
    try {
      get(Todo)
      get(Comment)
      const response = await axios(getAllTodoURL)
      return response.data
    } catch (error) {
      throw error
    }
  },
})
