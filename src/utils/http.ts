import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const httpI = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// axios请求拦截器
httpI.interceptors.request.use(
  (config) => {
    // 1. 从pinia获取token数据
    const userStore = useUserStore();
    // 2. 按照后端的要求拼接token数据
    const token = userStore.userInfo.token;
    if (token !== " ") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

// axios响应式拦截器
httpI.interceptors.response.use(
  (res) => res.data,
  (e) => {
    //统一错误提示
    ElMessage.error(e.response.data.message);
    //401 token过期处理
    if (e.response.status === 401) {
      // 1. 清空token
      const userStore = useUserStore();
      const router = useRouter();
      userStore.logOut();
      // 2. 跳转到登录页
      router.replace("/login");
    }
    return Promise.reject(e);
  }
);

export default httpI;
