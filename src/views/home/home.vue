<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>

    <scroll class="content" ref="scroll" 
    :probeType="3" 
    @scroll="contentScroll" 
    :pullUpLoad="true"
    @pullingUp="loadmore">
      <homeswiper :banners='banners'></homeswiper>
      <recommendView :recommends='recommends'></recommendView>
      <featureview></featureview>
      <tabcontrol :titles="['流行','新款','精选']" 
      ref="tabControl"
      @tabclick='tabclick'></tabcontrol>
      <goodslist :goods="goods[currenttype].list"></goodslist>
    </scroll>

    <backtop @click.native="backclick" v-show="isshowbacktop"></backtop>
  </div>
</template> 

<script>
  
  import homeswiper from './childcomps/homeswiper'
  import recommendView from '../home/childcomps/recommendView'
  import featureview from '../home/childcomps/featureview'
  import NavBar from '../../components/common/navbar/NavBar'
  import tabcontrol from '../../components/content/tabcontrol/tabcontrol'
  import goodslist from '../../components/content/goods/goodslist'
  import scroll from '../../components/common/scroll/scroll'
  import backtop from '../../components/content/backtop/backtop'

  import {getHomeMultidata,gethomegoods} from '../../network/home.js'

export default {
  name:'home',
  components:{
    NavBar,
    homeswiper,
    recommendView,
    featureview,
    tabcontrol,
    goodslist,
    scroll,
    backtop
  },
  //用data保存请求过来的数据
  data(){
    return{
      //result:null
      banners:[],
      recommends:[],
      goods:{
        'pop':{page: 0,list:[]},
        'new':{page: 0,list:[]},
        'sell':{page: 0,list:[]},
      },
      currenttype:'pop',
      isshowbacktop:false,
      tabOffsetTop:0,
    }
  },
  //生命周期函数,会被销毁
  created(){
    //1,请求多个数据
    this.getHomeMultidata()
    //2请求商品数据
    
    this.gethomegoods('pop')
    this.gethomegoods('new')
    this.gethomegoods('sell')
    
    // gethomegoods('pop',1).then(res => {
    //   console.log(res)
    // }) 
  },
  mounted(){
    //获取tabcontrol的offsetTop
    // this.tabOffsetTop = this.$refs.tabcontrol
    console.log(this.$refs.tabControl.$el.offsetTop)
  },
  methods:{
    //事件监听相关的方法
    tabclick(index){
      switch(index){
        case 0:
          this.currenttype = 'pop'
          break
        case 1: 
          this.currenttype = 'new'
          break
        case 2:
          this.currenttype = 'sell'
          break 
      }
    },
    backclick(){
      this.$refs.scroll.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      this.isshowbacktop = (-position.y) > 1000
    },
    loadmore(){
      this.gethomegoods(this.currenttype)

      this.$refs.scroll.scroll.refresh()
    },

    // 网络请求相关的方法
    getHomeMultidata () {
      getHomeMultidata().then(res => {
      //console.log(res); 
      //this.result = res
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
    })
    },
    gethomegoods(type) {
      const page = this.goods[type].page + 1
      gethomegoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    },
  },
}
</script>

<style scoped>
#home{
    height: 100vh;
    position: relative;
}

.home-nav{
  background: var(--color-tint);
  color: white;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}



.content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>