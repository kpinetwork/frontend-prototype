export const SaveLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}

export const SaveJsonLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
