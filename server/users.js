
const users = [];

const addNewUser = ({id, userName, roomId}) => {
    userName = userName.trim().toLowerCase();
    roomId = roomId.trim().toLowerCase();

    if(!userName || !roomId) {
        return {
            error: 'Useranme and room id are required!',
        }
    }

    const existsUser = users.find(
        (user) => user.roomId === roomId && user.userName === userName
    );
    
    if(existsUser) {
        return {
            error: 'Username is already taken!!',
        }
    }
    
    users.push({id, userName, roomId});
    
    
    return { users };
}


const removeExistUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}


const getUser = (id) => users.find((user) => user.id === id);


const getUsersInARoom = (roomId) => {
    roomId = roomId.trim.toLowerCase();
    return users.filter((user) => user.roomId === roomId);
}

module.exports = {addNewUser, removeExistUser, getUser, getUsersInARoom};