let lender=[{}]


let tenant=[{}]

let spaces=[{}]

let spacesTags=[{}]

let notifications=[
    {id: 1,
    userId: 1,
    eventsId: [{eventId:1},{eventId:3}],
    chatId: 1
    },
    {id: 2,
    userId: 2,
    eventId: [{eventId:2},{eventId:3}],
    chatId: 1
    },
    {id: 3,
    userId: 3,
    eventId: [{eventId:1},{eventId:2}],
    chatId: 2
    },
    {id: 4,
    userId: 2,
    eventId: [{eventId:1},{eventId:3}],
    chatId: 1
    },
];

let inventory=[
    {id:1,
    spaceId:1,
    productsId:[{productId:1},{productId:2}]
    },
    {id:2,
    spaceId:2,
    data:[{productId:2},{productId:4},{productId:1}]
    },
    {id:3,
    spaceId:3,
    data:[{productId:3}]
    },
    {id:4,
    spaceId:4,
    data:[{productId:3},{productId:4}]
    }
];

let scores=[
    {id:1,
    userId:1,
    score:5,
    comments:"excelente servicio"
    },
    {id:2,
    userId:2,
    score:1,
    comments:"mal servicio"
    },
    {id:3,
    userId:3,
    score:3,
    comments:"regular cliente"
    },
    {id:4,
    userId:4,
    score:5,
    comments:"excelente cliente"
    },
];

let chats=[
    {id:1,
    data:"Buenas tardes, estoy interesado en arrendar su espacio",
    notificationId:[1,2]
    },
    {id:1,
    data:"Buenas tardes, que informacion requiere",
    notificationId:[1,2,4]
    },
    {id:2,
    data:"Buenas tardes, estoy interesado en arrendar su espacio",
    notificationId:[3]
    },
    {id:1,
    data:"Puedo hacer adecuaciones al espacio?",
    notificationId:[1,2,4,5]
    }
];

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