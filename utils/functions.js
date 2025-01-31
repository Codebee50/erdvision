import { v4 as uuidV4 } from "uuid";

export function generateId(prefix = "id") {
  return `${prefix}-` + Math.random().toString(36).slice(2, 9);
}

export function generateUUID(){
    return uuidV4()
}