<template>
  <!--<h1>{{ msg }}</h1>{{obj.a.b.c.d}}-->
  <p ref="pf">markRaw:{{state1}}</p>
  <button @click="ff">count is: {{ count }}</button>

  {{baseUrl}}
  <!--<li v-for="(item,i) in state.s">-->
    <!--{{item.id}}-->
  <!--</li>-->
</template>

<script>
  import {ref,shallowRef,triggerRef,toRaw,markRaw} from 'vue'
  import {reactive,shallowReactive,onMounted,computed } from 'vue'
  import {useStore} from 'vuex'
export default {
  name: 'HelloWorld',
  props: {
  },

    setup(){
      const store=useStore()
        let baseUrl = computed(() => store.state.baseUrl)
        let obj1={name:"hh",id:1}
        obj1= markRaw(obj1)//冻结 不追踪
        let state1=  reactive(obj1)   //reactive proxy对象引用obj1

        let obj2=toRaw(state1)  //获取引用源  当操作不需要更新页面时  toRow拿去数据修改
        obj1===obj2

        let pf=ref(null)

      let msg="aaa";let count=ref(0);let obj=shallowRef({a:{b:{c:{d:1}}}})
      let state=reactive({
          s:[
              {id:1},{id:2},{id:2}
          ]
      })
        onMounted(()=>{
            console.log(pf)
        })

        function ff() {
            // count.value+=1
            // obj.value.a.b.c.d=2
            //
            state1.name="hahajj"
            console.log(state1,obj1)
            // triggerRef(obj)
        }
        return {msg,ff,count,state,obj,state1,pf,baseUrl}
    },
    mounted(){
        var a=[1,2,94,22,88,77,3,9,7,5,7,4,3,999,8,880,36,67,89,44,55,78,998,9]
        // console.log(this.mergeSortS(a))
        // console.log(this.shellSort(a))
        // console.log(this.insertSort(a) )
        // console.log(this.selectionSort(a))
        // console.log(this.bubbleSort(a))
    },
    methods:{

        mergeSortS(a){//并归排序
            function　merge(left, right){
                var　result=[];
                while(left.length>0 && right.length>0){
                    if(left[0]<right[0]){
                        /*shift()方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。*/
                        result.push(left.shift());
                    }else{
                        result.push(right.shift());
                    }
                }
                return　result.concat(left).concat(right);
            }
            function　mergeSort(items){
                if(items.length == 1){
                    return　items;
                }
                var　middle = Math.floor(items.length/2),
                    left = items.slice(0, middle),
                    right = items.slice(middle);
                return　merge(mergeSort(left), mergeSort(right));
            }
            return  mergeSort(a)
        },
        shellSort(a){// 希尔排序 不稳定 时间复杂度n^（1.3—2）
            var h=1

            while( h<0.5*a.length){  //确定步长为 比数组长度1/2大
                h=2*h+1
            }
            while (h>=1){
                    for(let i=h;i<a.length;i++){//以H分组 每隔H步长 为一组  共i组
                        for(let j=i;j>=h;j-=h){//起始值为i   步长为H 每一组数据  从后向前比
                            if(a[j]>a[j-h]){
                                break
                            }else{

                                [a[j],a[j-h]]=[a[j-h],a[j]]
                            }
                        }
                    }
                    h=Math.floor(h/2)
                }
            return a
        },

        insertSort(a){
            //插入排序
            for(let i=1;i<a.length;i++ ){
                for(let j=i;j>0&&(a[j]<a[j-1]);j-- ){
                    [a[j],a[j-1]]=[a[j-1],a[j]]
                }
            }
            return a
        },


       insertSort(a){
           //插入排序
            for(let i=1;i<a.length;i++ ){
                for(let j=i;j>0&&(a[j]<a[j-1]);j-- ){
                    [a[j],a[j-1]]=[a[j-1],a[j]]
                }
            }
            return a
        },
        selectionSort(a){
            //选择排序   不稳定会改值
            for(let i=0;i<a.length;i++ ){
                for(let j=i+1;j<a.length;j++ ){
                    if(a[i]>a[j]){
                        [a[j],a[i]]=[a[i],a[j]]
                    }
                }
            }
            return a
        },
        bubbleSort(a){
            //冒泡排序
            for(let i=0;i<a.length;i++ ){
                for(let j=0;j<a.length-i;j++ ){
                    if(a[j]>a[j+1]){
                        [a[j],a[j+1]]=[a[j+1],a[j]]
                    }
                }
            }
            return a
      }
    }
}
</script>
