let lender=[{}]


let tenant=[{}]

let spaces=[{}]

let spacesTags=[{}]

let notifications=[{}]

let inventory=[{}]

let scores=[{}]

let chats=[{}]

let events=[
    {
        id: 1,
        event:"event 1",
        id_notifications : [{
            id_notificatio : 1,    
            id_notificatio : 3,    
        }]
    },
 
    {
        id: 2,
        event:"event 2",
        id_notifications : [{
            id_notificatio : 2,    
            id_notificatio : 4
        }],
    },
    {
        id: 3,
        event:"event 3",
        id_notifications : [{
            id_notificatio : 1,
            id_notificatio : 2,
            id_notificatio : 3,
            id_notificatio : 4
        }]
    },
]

let productsElementsObjects=[
    {
        id:1,
        object:"television",
        category:"electronic",
        units:1
    },
    {
        id:2,
        object:"fruts",
        category:"organic",
        units:10
    },
    {
        id:3,
        object:"steel sheets",
        category:"metal",
        units:4
    },
    {
        id:4,
        object:"wood sheets",
        category:"organic",
        units:30
    },

]

let scoresCriterias=[
    {
        id: 1,
        score :"organic",
    },
    {
        id:2,
        score:"plastic"
    },
    {
        id:3,
        score:"chemical"
    },
    {
        id:4,
        score:"metal"
    }
]