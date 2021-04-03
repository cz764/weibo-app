export const ACCESS_TOKEN = "";

export const APP_KEY = "3696852244";
export const APP_SECRET = "";
export const REDIRECT_URI = encodeURIComponent("http://baidu.com:3000/login");

export const LOGIN_URL = `https://demo.don.red/weibo/api/oauth2/authorize?client_id=${APP_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email`;
