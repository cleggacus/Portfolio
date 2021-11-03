import { Dispatch } from "react"
import Theme from "../utils/theme"

type StoreContextT = [StoreT, Dispatch<ActionT>]

type StoreT = {
  theme: Theme
}

type PayloadT = any

type ActionT = {
  type: ActionTypes,
  payload: PayloadT
}

enum ActionTypes {
  SetTheme
}

export type {
  StoreContextT,
  StoreT,
  ActionT,
  PayloadT,
}

export {
  ActionTypes
}