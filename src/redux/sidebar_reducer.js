let initialState = {
    avatars: [
        {id: '1', name: 'Nika', ava: 'https://papermilkdesign.com/images/circle-clipart-instagram-profile-10.png'},
        {
            id: '2',
            name: 'Sasha',
            ava: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSVN8rYSCbXzeODWci-ijqUNzbeU1CePRNJPZbayKE1QHONrMDp'
        },
        {id: '3', name: 'Stepan', ava: 'https://toleranten.files.wordpress.com/2011/03/homer-simpson-400x300.jpg'},
    ]
};

const sideBarReducer = (state = initialState, action) => {
    return state;
};

export default sideBarReducer;