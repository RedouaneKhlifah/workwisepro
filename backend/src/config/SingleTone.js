let db;
const setDb = (conn) => {
    db = conn;
};

const getDb = () => {
    return db;
};

export { setDb, getDb };
