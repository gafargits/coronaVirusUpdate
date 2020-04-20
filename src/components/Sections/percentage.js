export const percentage = (num, total) => {
  return +total <= 0 ? 0 : ((+num/total)*100).toFixed(2)
}