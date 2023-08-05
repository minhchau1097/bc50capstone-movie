import { DAT_GHE, HUY_GHE } from './constants';


export const bookingSeatAction = (ghe) => {
    return {
        type: DAT_GHE,
        ghe
    }
}

export const deleteSeatAction = (soGhe) => {
    return {
        type: HUY_GHE,
        soGhe
    }
}