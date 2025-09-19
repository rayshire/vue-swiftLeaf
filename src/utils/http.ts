import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

let failCount = 0; // 记录连续失败次数
let lastFailTime = 0; // 记录上次失败的时间
const FAIL_THRESHOLD = 3; // 连续失败次数阈值
const BREAK_TIME = 10000; // 熔断时间（毫秒）

const httpI = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 50000,
});

// axios请求拦截器
httpI.interceptors.request.use(
  (config) => {
    // 熔断机制
    const now = Date.now();
    if (failCount >= FAIL_THRESHOLD && now - lastFailTime < BREAK_TIME) {
      return Promise.reject(new Error("接口熔断，请稍后再试"));
    }
    // 1. 从pinia获取token数据
    const userStore = useUserStore();
    // 2. 按照后端的要求拼接token数据
    const token = userStore.userInfo.token;
    if (token.length > 1) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

// axios响应式拦截器
httpI.interceptors.response.use(
  (res) => {
    // 请求成功，重置失败次数
    failCount = 0;
    return res.data;
  },
  (e) => {
    // 请求失败，记录失败次数和时间
    failCount++;
    lastFailTime = Date.now();
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
