// 定义懒加载插件
import { useIntersectionObserver } from "@vueuse/core";

// 懒加载插件
export const lazyPlugin = {
  // 安装插件
  install(app) {
    // 懒加载指令逻辑
    app.directive("img-lazy", {
      // 当被绑定的元素插入到 DOM 中时……
      mounted(el, binding) {
        // el: 指令绑定的那个元素 img
        // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
        // console.log(el, binding.value);
        // 使用IntersectionObserver监听元素是否进入视口
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          // console.log(isIntersecting);
          // 如果元素进入视口
          if (isIntersecting) {
            // 进入视口区域，加载图片
            el.src = binding.value;
            // 停止监听
            stop();
          }
        });
      },
    });
  },
};
