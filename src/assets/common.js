
import axios from 'axios'
import { Message,Loading } from 'element-ui'
import router from '../router/index'
import Vue from 'vue'
import { Toast } from 'mint-ui';
// import sha1 from 'sha1'
// 全局配置对象
export var GLOBALconfig = {};
var serverconfig = {
    /*服务器后台地址*/   
// 'serviceIP': 'http://192.168.3.212:81/' 
};
// 接口请求虚拟目录
var http_api = {   
   agent: 'sp/'
};
// 接口请求地址
var url_api = {   
  agent: serverconfig.serviceIP + http_api.agent 
};
// 暴露全局变量作用
GLOBALconfig.agent_api = url_api.agent; //接口请求地址 

axios.defaults.withCredentials = true;//允许cookei跨域
axios.defaults.timeout = 50000;//请求超时时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = GLOBALconfig.agent_api;


var loadingInstance;
axios.interceptors.request.use(
  config => { 
        loadingInstance = Loading.service({
            background:'rgba(0,0,0,0)'
        });
    
            if(config.method == 'get'){                
                console.log(config);
            }else{
                console.log(config);
            }
    
        return config;
  },
  error => {     
        loadingInstance.close(); 
        Message.error({message: '加载超时'});
        return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (res) => {
        loadingInstance.close();
        //控制台打印请求接口返回数据
        // console.log(res.config.url);
        console.log(res.data);        
        if(res.status != 200){ 
          Toast(res.status + res.statusText);
            return false;
        } 
               
        return res;
  },
  error => { 
    loadingInstance.close();   
        if(error && error.response){            
                  switch(error.response.status){
                  case 400:
                  error.message = '400：请求错误'
                  break;
                  case 401:
                  error.message = '401：未授权，请登录'
                  break;
                  case 403:
                  error.message = '403：拒绝访问'
                  break;
                  case 404:
                  error.message = '404:请求地址出错'
                  break;
                  case 408:
                  error.message = '408：请求超时'
                  break;
                  case 500:
                  error.message = '500：服务器内部错误'
                  break;
                  case 501:
                  error.message = '501：服务未实现'
                  break;
                  case 502:
                  error.message = '502：网关错误'
                  break;
                  case 503:
                  error.message = '503：服务不可用'
                  break;
                  case 504:
                  error.message = '504：网关超时'
                  break;
                  case 505:
                  error.message = '505：HTTP版本不受支持'
                  break;
                  dafault:
                  error.message = '网络错误'
                }
                Toast(error.message);
                    
        }   
     return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */


export function httpGet(url,params){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(res => {
      resolve(res.data);
      
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */


 export function httpPost(url,data){  
    // let params = new URLSearchParams();
    // for(var Key in data){   
    //   params.append(Key,data[Key]);
    // }    
    return new Promise((resolve,reject) => {      
     axios.post(url,data)
        .then(res => { 
          if(res.data.errcode.toString() == '200') {
            resolve(res.data);           
          } else{
              switch(res.data.errcode.toString()){
              case '201':
              Toast('验证码已失效');
              reject('验证码已失效');
              break;
              case '202':
              Toast('验证码输入错误');
              reject('验证码输入错误');
              break;
              case '501':
              Toast('参数为空');
              reject('参数为空');
              break;
              case '500':
              Toast('系统异常');
              reject('系统异常');
              break;
            }
          }       
                   
        },err => {          
          reject(err)
        })
   })
 }
 
 /**
 * 成功提示
 */

  export function ye(msg){
    var msg = msg || '操作成功';
          Message({
                    type:'success',
                    message:msg
                })
  }
  
   /**
 * 失败提示
 */

  export function fail(msg){    
          Message({
                    type:'error',
                    message:msg
                })
  }
  
  
 /**
 * 输入金额正则验证
 */
  export let exp = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    
  export let bus = new Vue();
  
  
  export function sendTitle(str) {
                this.$bus.$emit('getTitle', str);
    }

//日期格式化
  export function  dataFormet(data){
        var addaroe = function(m){
          return m < 10? '0'+m : m;
        }
        var datas = new Date(data);
        var year = datas.getFullYear();
        var month = datas.getMonth()+1;
        var day = datas.getDate();
        var hour = datas.getHours();
        var min = datas.getMinutes();
        var second = datas.getSeconds();      
        return year + '-' + addaroe(month) + '-' + addaroe(day) + '日' +' ' + addaroe(hour) + ':' + addaroe(min) + '时';
    }
  
  




