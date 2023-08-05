import { DAT_GHE, HUY_GHE } from './constants';

const stateDefault = {
  listBookingSeat: [
  ]
}


const userBookingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DAT_GHE: {
      let listBookingSeatUpdate = [...state.listBookingSeat];
      let index = listBookingSeatUpdate.findIndex(gheDangDat => gheDangDat.soGhe === action.ghe.soGhe);
      if (index !== -1) {
        listBookingSeatUpdate.splice(index, 1);
      } else {
        listBookingSeatUpdate.push(action.ghe);
      }
      state.listBookingSeat = listBookingSeatUpdate;
      return { ...state }
    }
    case HUY_GHE: {
      let listBookingSeatUpdate = [...state.listBookingSeat];
      let index = listBookingSeatUpdate.findIndex(gheDangDat => gheDangDat.soGhe === action.soGhe);
      if (index !== -1) {
        listBookingSeatUpdate.splice(index, 1);
      }
      state.listBookingSeat = listBookingSeatUpdate;
      return { ...state }
    }

    default:
      return { ...state }
  }
}


export default userBookingReducer;