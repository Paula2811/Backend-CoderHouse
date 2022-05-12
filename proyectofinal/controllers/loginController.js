const user = {
    isAdmin: 1,
    isUser: 2
}

const login = (data) => {

    return user[data]
        ? user[data]
        : 0
}

export default login