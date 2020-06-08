<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'

export default {
  name:'scroll',
  data(){
    return{
      scroll:null
    }
  },
  props:{
    //监听滚动
    probeType:{
      type:Number,
      default:0
    },
    //监听上拉
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    //创建Bscroll对象
    this.scroll = new Bscroll(this.$refs.wrapper,{
    click:true,
    //注意区分大小写
    probeType:this.probeType,
    pullUpLoad:this.pullUpLoad
    }),
    //回到顶部
    this.scroll.scrollTo(0,0),
    //监听滚动位置
    this.scroll.on('scroll',(position) => {
      // console.log(position)
      this.$emit('scroll',position)
    }),
    //监听上拉事件
    this.scroll.on('pullingUp',() => {
      // console.log('上拉加载更多')
      this.$emit('pullingUp')
    })
  },
  methods:{
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style>

</style>