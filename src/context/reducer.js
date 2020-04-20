export default(state, action) => {
  switch(action.type){
    case 'GET_DATA':
      return{
        ...state,
        loading: false,
        data: action.payload
      }
    case 'GET_HISTORY':
      return{
        ...state,
        loading: false,
        history: action.payload
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