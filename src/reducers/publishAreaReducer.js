let initialState={
    textAreaDesc: "",
    width:0,
    length:0,
    heigth:0,
    city:"",
    address:"",
    price:0,
    tags:[],
    suggestions:[],
    title:"",
    viewingForm
}

const CHANGE_DESCRIPTION = "CHANGE_DESCRIPTION";
const CHANGE_WIDTH = "CHANGE_WIDTH";
const CHANGE_LENGTH = "CHANGE_LENGTH";
const  CHANGE_HEIGHT = "CHANGE_HEIGHT";
const  CHANGE_CITY = "CHANGE_CITY";
const  CHANGE_ADDRESS = "CHANGE_ADDRESS";
const  CHANGE_PRICE = "CHANGE_PRICE";
const  CHANGE_TAGS = "CHANGE_TAGS";
const  CHANGE_TAGS_SUGGESTIONS = "CHANGE_TAGS_SUGGESTIONS";
const CHANGE_TITLE = "CHANGE_ TITLE";
const CHANGE_VIEWING_FORM = "CHANGE_VIEWING_FORM";

const publishAreaReducer = (state = initialState , action) => {
    switch(action.type){
        case CHANGE_DESCRIPTION :
            return {
                ...state,
                textAreaDesc: action.payload
            }
        case CHANGE_WIDTH :
            return {
                ...state,
                width: action.payload
            }
        case CHANGE_LENGTH :
            return {
                ...state,
                length: action.payload
            }
        case CHANGE_HEIGHT :
            return {
                ...state,
                heigth: action.payload
            }
        case CHANGE_CITY :
            return {
                ...state,
                city: action.payload
            }
        case CHANGE_ADDRESS :
            return {
                ...state,
                address: action.payload
            }
        case CHANGE_PRICE :
            return {
                ...state,
                price: action.payload
            }
        case CHANGE_TAGS :
            return {
                ...state,
                tags: action.payload
            }
        case CHANGE_TAGS_SUGGESTIONS :
            return {
                ...state,
                suggestions: action.payload
            }
        case CHANGE_TITLE :
            return {
                ...state,
                title: action.payload
            }
        case CHANGE_VIEWING_FORM :
            return {
                ...state,
                viewingForm: action.payload
            }
    
    }
}

export default publishAreaReducer