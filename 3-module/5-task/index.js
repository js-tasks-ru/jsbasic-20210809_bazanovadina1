function getMinMax(str) {
  let result = {
    min: Math.min(...str.split(' ').map(item => Number(item)).filter(item => item)),
    max: Math.max(...str.split(' ').map(item => Number(item)).filter(item => item))
    }
    return result
}
