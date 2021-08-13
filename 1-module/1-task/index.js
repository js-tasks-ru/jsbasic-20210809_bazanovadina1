function factorial(n) {
  let result
  
  if (n > 1) {
    result = n
    do { result *= (--n)
    } while (n > 1)
  } else {
    result = 1
  }
  
return result
}