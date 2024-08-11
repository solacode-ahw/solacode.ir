import { createContext } from "react";

const SettingsContext = createContext(null);

function settingsReducer(state,action){
    /* 
        state = { theme = 'light' | 'dark' , lang = 'en' | 'fa' }
        action = 'theme' | 'en' | 'fa'
            'theme' will toggle the theme
            'en' | 'fa' will set the language accordingly
    */
    if(action==='theme'){
        if(state.theme==='light'){
            return {
                theme: 'dark',
                lang: state.lang
            };
        } else {
            return {
                theme: 'light',
                lang: state.lang
            };
        }
    } else if(['fa','en'].includes(action)){
        return {
            theme: state.theme,
            lang: action
        };
    } else {
        console.log(`action argument is incorrect.\naction: ${action}\naction type: ${typeof(action)}`);
        return state;
    }
}

export { SettingsContext, settingsReducer };