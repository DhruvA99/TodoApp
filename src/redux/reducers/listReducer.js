import * as actionTypes from "../actions/actionTypes";

const initialState = {
  lists: [],
  loading: false,
  errors: null,
  time: new Date().toLocaleDateString(),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_SUCCESS:
      return {
        ...state,
        lists: [...action.payload],
        loading: false,
      };
    case actionTypes.ADD_ITEM_FAIL:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    case actionTypes.ADD_ITEM_START:
      return {
        ...state,
        errors: null,
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
