// 把components中的所组件都进行全局化注册
// 通过插件的方式
import ImgView from "./ImgView/index.vue";
import Sku from "./XtxSku/index.vue";
export const componentPlugin = {
  install(app) {
    // app.component('组件名字'，组件配置对象)
    app.component("XtxImageView", ImgView);
    app.component("XtxSku", Sku);
  },
};
