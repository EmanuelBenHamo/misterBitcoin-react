const users = [
    {
        "name": "Emanuel Ben Hamo",
        coins: 100,
        moves: []
    }
];

const gUser = users[0];

function getUser() {
    return new Promise((resolve, reject) => {
        resolve(gUser);
    })
}