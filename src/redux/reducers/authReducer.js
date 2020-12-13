import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  loading: false,
  userId: null,
  errors: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        loading: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        errors: null,
        loading: true,
      };
    case actionTypes.LOG_OUT:
      return {
        ...state,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default reducer;
