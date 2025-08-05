require('dotenv').config();

const Mongo_connect_url = process.env.ATLAS_URL;
const secret_login_Key = process.env.SECRET_LOGIN_KEY;
const secret_refresh_Key = process.env.SECRET_REFRESH_KEY;


module.exports = {Mongo_connect_url, secret_login_Key, secret_refresh_Key};