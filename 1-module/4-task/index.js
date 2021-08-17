function checkSpam(str) {
  str = str.toUpperCase()
  if (str.includes("1XBET")||str.includes("XXX")) {
    return true
  } else {
    return false
  }
}
