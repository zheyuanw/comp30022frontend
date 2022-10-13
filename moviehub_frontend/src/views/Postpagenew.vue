<template>

  <div class="common-layout">
      <el-container>
        <el-header class="header" >
          <AvatarIcon/>
        </el-header>
        <el-main class="main">

        <div class="posthere">  Post here </div>  
        </el-main>
        <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="Form"
        label-position="left"
        label-width="100px"

        class="login-from"
        hide-required-aterisk="true">

        <el-form-item>
          <el-select 
			v-model="value"
            placeholder="请选择"
            clearable
            filterable
            @blur="selectBlur"
            @clear="selectClear"
            @change="selectChange"
            >
                  <el-option
                    v-for="(item,index) in options2"
                    :key="index"
                    :label="item.label"
                    :value="item.value" />
</el-select>

        </el-form-item>
        
        <el-form-item label = "Movie title: " class="movietitle">
          <el-input
          v-model="form.imdbmovietitle" class="select" placeholder="search movie title" @change="searchTitle()">
   
          </el-input>
        </el-form-item >
       
        <el-form-item label = "Review: " class="labelcolor">
        <el-input
        v-model="form.textarea"
        :rows="3"
         type="textarea"
        placeholder="Please input movie review"
        class="textinput"
        
        />
      </el-form-item>
      <el-form-item class = "rating" label="Rating" prop="rating">
      <el-input-number v-model="form.rating" :min="0" :max="5" @change="handleChange" />
    </el-form-item>
  
    </el-form>
    <el-button type="warning" round class="LRbutton" @click="$router.push('/moviehub/dashboard/1234');save()">Save</el-button> 
  </el-container>
  <el-dialog
      title="selectMovie"
      v-model="dialogVisible"
      width="100"
      :show-close="false">
            <el-form>
              <el-row>
              <el-form-item>
                <el-select v-model="form.imdbmovietitle" placeholder="choose your movie">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>

              </el-form-item>
              </el-row>

            <el-row>
            <el-form-item>
              <el-button type="primary" @click="back()">Back</el-button>
            </el-form-item>
            </el-row>
            </el-form>
    </el-dialog>
    </div>
    
   <HubIcon/>
  </template>


  <script>
import { ref } from 'vue'
import HubIcon from '@/components/HubIcon.vue';
import AvatarIcon from '../components/AvatarIcon.vue';
import request2 from "@/utils/Request2.js";
import request from '@/utils/RequestFile';
export default {
  data() {
    return {
      value: '',
      options2: [
        
		],

      components: {
              HubIcon
          },
      rules: {
        imdbmovietitle: [
                    { required: true, message: "choose title!!", trigger: "blur" },
        ],
        textarea: [
              { required: true, message: "review cannot be blank", trigger: "blur" },
        ],
        rating: [
              { required: true, message: "rating cannot be blank", trigger: "blur" },
        ],

      },
      form: {
        imdbmovietitle: "",
        textarea: "",
        rating:"",
        moviename: ""
     
      },
      dialogVisible: false,
      movies: [],
      options: []
    }
  },
  // mounted(){
  //   this.searchTitle();
  // },
  methods:{
    selectBlur(e) {
        // 意见类型
        if (e.target.value !== '') {
          request2.get("/?title=" + e.target.value ).then(res => {
        if(res.status === 200){
          
          for(let i =0; i<res.data.results.length; i++) {
            console.log("search movie");
            this.options2.push({
              value:res.data.results[i].title,
              label:res.data.results[i].title
            })
          }
        } else {
          this.$message({
            type: "error",
            message: "unsucessfully search"
          })
        }


      })
        }
      },
      // selectClear() {
      //   this.value = ''
      //   this.$forceUpdate()
      // },
      selectChange(val) {
        this.value = val
      },

    back() {
      this.dialogVisible = false;
      this.options.length = 0;
    },
    searchTitle () {
      request2.get("/?title=" + this.form.imdbmovietitle).then(res => {
        if(res.status === 200){
          this.dialogVisible = true;
          
          for(let i =0; i<res.data.results.length; i++) {
            console.log("search movie");
            this.options.push({
              value:res.data.results[i].title,
              label:res.data.results[i].title
            })
          }
        } else {
          this.$message({
            type: "error",
            message: "unsucessfully search"
          })
        }

      })
    },
    save(){
      request.post("/post", this.form).then(res => {
          console.log(res)
          if (res.stutas===200) {
            this.$message({
              //返回id movie card的
              type: "success",
              message: "successfully post the movie"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
        })
    }
  },
  
  components: { HubIcon }
}
</script>

<style>
  body {
background-color: #222231;
}
.header{
  background-color: black;

}

.LRbutton{
  width:10%;
  margin-top:25px;
  margin-left:530px;
}
.main{
  background-color: white;
  height:64px;
  
}

.posthere{
  position: absolute;
  font-weight: bold;
  font-size: x-large;
}
.movietitle{
   margin-top:50px;
   margin-left:330px;

}
.select{
  width:50%
}
.labelcolor{
   margin-top:50px;
   margin-left:330px;

}
.textinput{
  margin-right:170px;
  width:50%;
 
}
.star{
  margin-left:24px;
}

.movietitle .el-form-item__label {
  color: orange
}
.genre{
  margin-top:50px;
   margin-left:330px;
}
.genre .el-form-item__label {
  color: orange
}
.poster{
  margin-top:50px;
   margin-left:330px;
}
.poster .el-form-item__label {
  color: orange
}
.rating .el-form-item__label {
  color: orange
}
.rating{
  margin-left:330px;
  margin-top:50px;
}

.labelcolor .el-form-item__label {
  color: orange
}
.movietitleinput{
  width:50%;
}
</style>