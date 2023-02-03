import {ar} from './ar'
const language = 'en'
export const _ = (text) => {
    if (language === 'en') {
        return text
    } else if (text in ar) {
        return ar[text]
    }else {
        return text
    }

}