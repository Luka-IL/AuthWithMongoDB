import {extend} from "../../../utils";
import {ActionType} from "../../action";
import {Cities} from "../../../const";

const initialState = {
  city: Cities.AMSTERDAM,
  offers: [],
  favorites: [],
  neighborhoods: []
};

const appData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload
      });
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload
      });
    case ActionType.LOAD_FAVORITES:
      return extend(state, {
        favorites: action.payload
      });
    case ActionType.LOAD_NEIGHBORHOODS:
      return extend(state, {
        neighborhoods: action.payload
      });
  }
  return state;
};

export {appData};
 