let initialState={
    textAreaDesc: "",
    width:0,
    length:0,
    height:0,
    city:"",
    address:"",
    price:0,
    tags:[
        { id: 1, name: "dark Space" },
        { id: 2, name: "Heavy Load" },
        {id: 3, name: "Hot area"}
      ],
    suggestions:[
        { id: 3, name: "Bananas" },
        { id: 4, name: "Mangos" },
        { id: 5, name: "Lemons" },
        { id: 6, name: "Apricots" }
    ],
    title:"",
    viewingForm: 1,
    photos: []
}

const ACTIONS = {
    CHANGE_DESCRIPTION : "CHANGE_DESCRIPTION",
    CHANGE_WIDTH : "CHANGE_WIDTH",
    CHANGE_LENGTH : "CHANGE_LENGTH",
    CHANGE_HEIGHT : "CHANGE_HEIGHT",
    CHANGE_CITY : "CHANGE_CITY",
    CHANGE_ADDRESS : "CHANGE_ADDRESS",
    CHANGE_PRICE : "CHANGE_PRICE",
    CHANGE_TAGS : "CHANGE_TAGS",
    CHANGE_TAGS_SUGGESTIONS : "CHANGE_TAGS_SUGGESTIONS",
    CHANGE_TITLE : "CHANGE_ TITLE",
    CHANGE_VIEWING_FORM : "CHANGE_VIEWING_FORM",
    CHANGE_AREA : "CHANGE_AREA",
    CHANGE_PHOTOS: "CHANGE_PHOTOS"
}

const publishAreaReducer = (state = initialState , action) => {
    switch(action.type){
        case ACTIONS.CHANGE_DESCRIPTION :
            return {
                ...state,
                textAreaDesc: action.payload
            }
        case ACTIONS.CHANGE_WIDTH :
            return {
                ...state,
                width: action.payload
            }
        case ACTIONS.CHANGE_LENGTH :
            return {
                ...state,
                length: action.payload
            }
        case ACTIONS.CHANGE_HEIGHT :
            return {
                ...state,
                height: action.payload
            }
        case ACTIONS.CHANGE_CITY :
            return {
                ...state,
                city: action.payload
            }
        case ACTIONS.CHANGE_ADDRESS :
            return {
                ...state,
                address: action.payload
            }
        case ACTIONS.CHANGE_PRICE :
            return {
                ...state,
                price: action.payload
            }
        case ACTIONS.CHANGE_TAGS :
            return {
                ...state,
                tags: action.payload
            }
        case ACTIONS.CHANGE_TAGS_SUGGESTIONS :
            return {
                ...state,
                suggestions: action.payload
            }
        case ACTIONS.CHANGE_TITLE :
            return {
                ...state,
                title: action.payload
            }
        case ACTIONS.CHANGE_VIEWING_FORM :
            return {
                ...state,
                viewingForm: action.payload
            }
        default : return state
    }
}

export {
    publishAreaReducer,
    ACTIONS
} 