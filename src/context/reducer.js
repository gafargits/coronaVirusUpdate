export default(state, action) => {
  switch(action.type){
    case 'GET_DATA':
      return{
        ...state,
        loading: false,
        data: action.payload
      }
    case 'DATA_ERROR':
      return{
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}