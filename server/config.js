const MONGO_HOST = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'vueMall';
const MONGOOSE_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
const URL_PREFIX = "";  // /vueMallApi
const PORT = 3000;
const IGNORED_CHECKED_URLS = [
    "/users/login",
    "/users/logout",
    "/users/checkLogin",
    "/goods/list",
].map((item)=>{
    return URL_PREFIX + item;
});

module.exports = {
    MONGOOSE_URL,
    IGNORED_CHECKED_URLS,
    URL_PREFIX,
    PORT
}