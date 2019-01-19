import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

i18n
    .use(reactI18nextModule)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        resources: require('./translation.json'),
        ns: "translation",
    });


export default i18n;