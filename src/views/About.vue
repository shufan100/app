<template>
  <div class="about">
    <s-header :name="'关于我们'"></s-header>
    <!-- <div class="about-body">
      <img class="intro-img" src="https://s.yezgea02.com/1604046067055/WechatIMG30231.jpeg" alt="">
      <van-divider :style="{ color: '#1baeae', borderColor: '#1baeae', fontSize: '20px', fontWeight: 500 }">简介</van-divider>
      <div>newbee-mall 项目是一套电商系统，包括 newbee-mall 商城系统及 newbee-mall-admin 商城后台管理系统，基于 Spring Boot 2.X 及相关技术栈开发。 前台商城系统包含首页门户、商品分类、新品上线、首页轮播、商品推荐、商品搜索、商品展示、购物车、订单结算、订单流程、个人订单管理、会员中心、帮助中心等模块。 后台管理系统包含数据面板、轮播图管理、商品管理、订单管理、会员管理、分类管理、设置等模块。</div>
      <van-divider :style="{ color: '#1baeae', borderColor: '#1baeae', fontSize: '20px', fontWeight: 500 }">开源地址</van-divider>
      <div>
        <div>掘金小册配套学习文档：<a target="_blank" href="https://juejin.im/book/6844733826191589390">《Vue 商城项目开发实战》</a></div>
        <br/>
        <div>后端 API 地址：<a target="_blank" href="https://github.com/newbee-ltd/newbee-mall-api">https://github.com/newbee-ltd/newbee-mall-api</a></div>
        <br/>
        <div>前端 Vue2.x + Vant2.x 开源地址：<a target="_blank" href="https://github.com/newbee-ltd/newbee-mall-vue-app">https://github.com/newbee-ltd/newbee-mall-vue-app</a></div>
        <div>前端 Vue3.x + Vant3.x 开源地址：<a target="_blank" href="https://github.com/newbee-ltd/newbee-mall-vue3-app">https://github.com/newbee-ltd/newbee-mall-vue3-app</a></div>
        <br/>
        <div>线上预览地址：<a target="_blank" href="http://47.99.134.126:5000/">http://vue-app.newbee.ltd</a></div>
      </div>
    </div> -->
    <div v-for="item in list" :key="item.id">{{item.name}}--{{item.age}}</div>
    <input type="text" ref="inputRefs">
    <ul>
      <li>姓名：{{name}}</li>
      <li>年龄：{{ages}}</li>
      <li>bool：{{bool}}</li>
    </ul>

    <button @click="name='小红'">修改姓名</button>
    <button @click="age=19">修改年龄</button>
    <button @click="reset">重置</button>
    <button @click="getRefVal">refbtn</button>
    <hr />
    <button @click="goHome('user')">我的</button>
    <button @click="getRoute">路由属性</button>
    <p>全局配置属性使用：{{$name}}</p>
    <p>vuex：{{store.state.tip}} -- {{store.state.num}}</p>
    <button @click="getData">全局axios请求</button>

  </div>
</template>

<script>
import { reactive, toRefs, ref, watch, computed, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import { getCurrentInstance } from 'vue'  //使用全局配置属性
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import sHeader from '@/components/SimpleHeader'
export default {
  components: {
    sHeader
  },
  // setup介于beforeCreate、Created钩子之间的函数。不能使用this、data、methods
  // context  上下文对象，该对象暴露了以前在 this 上暴露的 property 的选择列表
  setup (props, context) { //开始创建组件

    // ******定义----------------------------------------------------------------
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      name: '小美女',
      age: 18,
      list: [
        { id: 1, name: '校长', age: 67 },
        { id: 2, name: '特级教师', age: 37 },
        { id: 3, name: '教师', age: 24 },
      ],
      bool: true,
    })
    const inputRefs = ref(null)
    const { ctx, appContext } = getCurrentInstance()
    const $axios = appContext.config.globalProperties.$axios
    const store = useStore()

    // ********路由----------------------------------------------------------------
    // 跳转
    const goHome = (paths) => {
      router.push({ path: paths })  //方法1
      // router.push('/user')   //方法2
    }
    // 属性
    const getRoute = () => {
      console.log(route, '路由数据')
    }


    // ********生命周期----------------------------------------------------------------
    onBeforeMount(() => {
      // console.log('生命周期--beforeMount -- 组件挂载到页面之前执行')
    })
    onMounted(() => {
      // console.log('生命周期--mounted -- 组件挂载到页面之后执行')
      console.log(ctx, appContext, props, context, 'ctx----')
      console.log(store.state.tip,)


    })
    onBeforeUpdate(() => {
      // console.log('生命周期--beforeUpdate--组件更新之前')
    })
    onUpdated(() => {
      // console.log('生命周期--updated -- 组件更新之后')
    })
    onBeforeUnmount(() => {
      // console.log('生命周期--beforeUnmount -- 组件卸载之前')
    })
    onUnmounted(() => {
      // console.log('生命周期--unmounted -- 组件卸载之后')
    })

    // ********计算属性----------------------------------------------------------------
    const ages = computed(() => {
      let num = state.age + parseInt(10)
      return num
    })

    // ********监听----------------------------------------------------------------
    watch(() => state.name, (newVal, oldVal) => {
      console.log("姓名改变了:", newVal, oldVal);
    });
    watch(() => state.age, (newVal, oldVal) => {
      console.log("年龄改变了:", newVal, oldVal);
    });


    // ********click方法----------------------------------------------------------------
    // 获取inputdom  和 value
    const getRefVal = () => {
      console.log(inputRefs.value.value, '----')
      inputRefs.value.value = ''
    }

    // 重置
    const reset = () => {
      state.name = '小美女'
      state.age = 18
      state.bool = false
      state.list = []
    }

    // ********全局配置axios请求----------------------------------------------------------------
    const getData = () => {
      store.dispatch('tipAction', '修改后的tip')
      store.dispatch('numAction')
      // 使用全局配置的axios请求
      $axios.get('/index-infos').then(res => {
        console.log(res, '000111')
      })
    }

    // ********导出----------------------------------------------------------------
    return {
      ...toRefs(state),
      inputRefs,
      getRefVal,
      reset,
      goHome,
      getRoute,
      ages,
      getData,
      store
    }

  }
}
</script>

<style lang="less" scoped>
.about {
  box-sizing: border-box;
  padding: 20px;
  .intro-img {
    width: 100%;
  }
  .about-body {
    font-size: 16px;
    a {
      color: #007fff;
    }
  }
}
</style>
