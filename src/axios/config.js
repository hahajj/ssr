let BASE_URL = "";
let UM_LOGIN_URL = "";

console.log(process.env.NODE_ENV, self.location.host)
if (process.env.NODE_ENV === 'production') {
    BASE_URL = "" //这里是本地环境集成地址
    UM_LOGIN_URL = ""
}else{
    BASE_URL = "" //这里是本地环境集成地址
    UM_LOGIN_URL = ""


}


export {BASE_URL, UM_LOGIN_URL};
