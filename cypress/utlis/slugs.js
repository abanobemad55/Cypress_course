import doctors_fixture from '../fixtures/doctors.json';
import discounts_fixture from '../fixtures/discounts.json';

const LOCALES = ['qatar','uae']
const FIXTURES_LIST = [doctors_fixture, discounts_fixture]
let merged_fixture = {};
FIXTURES_LIST.forEach((fixture, index) => {
    LOCALES.forEach(locale =>{
        merged_fixture[locale] = {...merged_fixture[locale], ...fixture[locale]}
    })
});
export const getSlug = (slugType) =>{
    const locale = "qatar";
    const language = "en";
    if (language === "en"){
        return merged_fixture[locale][slugType]["slug"]
    }else{
        return merged_fixture[locale][slugType][`slug_${language}`]
    }
}