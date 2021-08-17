function ucFirst(str) {
  if (str === "") {
    return str
  } else {
  let newStr = str[0].toUpperCase() + str.substring(1)
  return newStr
  }
}
