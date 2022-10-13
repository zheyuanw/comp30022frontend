<template>
  <div id= 'building'>
      <HubIcon></HubIcon>
  <div>
    <el-card class="box-card">
      <h2 class="color">Register</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="150px"
        class="demo-ruleForm"
      >
      <el-form-item label="email" prop="email">
            <el-input
              type="email"
              v-model="ruleForm.email"
              prefix-icon="el-icon-message"
              placeholder="type in email"
            >
            </el-input>
          </el-form-item>
        <el-form-item class = "color1" label="Username" prop="checkusername">
      <el-input class = "inputform" v-model="ruleForm.checkusername" maxlength=16 placeholder="Jack" />
    </el-form-item>
        <el-form-item class = "color1" label="Gender" prop="checkgender">
      <el-select v-model="ruleForm.checkgender" class="m-2" placeholder="Select" size="large">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
      </el-select>
    
    </el-form-item>
    <el-form-item class = "color1" label="Age" prop="checkage">
      <el-input-number v-model="ruleForm.checkage" :min="1" :max="120" @change="handleChange" />
    </el-form-item>
    <el-form-item label="password" prop="password">
            <el-input
              :type="pwdType"
              v-model="ruleForm.password"
              prefix-icon="el-icon-lock"
              placeholder="type in password"
            >
              <i
        
                title="show or hide password"
                :class="showPwd"
                :style="{ color: '#409eff', cursor: 'pointer' }"
                @click="togglePwd"
              >
              </i>
            </el-input>
          </el-form-item>
          <el-form-item label="confirm password" prop="password2">
            <el-input
              :type="pwdType"
              v-model="ruleForm.password2"
              prefix-icon="el-icon-lock"
              placeholder="confirm password"
            >
              <i
     
                title="show or hide password"
                :class="showPwd"
                :style="{ color: '#409eff', cursor: 'pointer' }"
                @click="togglePwd"
              >
              </i>
            </el-input>
          </el-form-item>
          <el-form-item label="verification code" prop="verificationCode">
            <div class="vertify">
              <el-input
                prefix-icon="el-icon-key"
                v-model="ruleForm.verificationCode"
                placeholder="verification code"
                auto-complete="off"
              ></el-input>
              <el-button
                type="primary"
                plain
                @click="getCode('ruleForm')"
                :disabled="isDisabled"
                class="emailcode"
              >
                {{ btnMsg }}
              </el-button>
            </div>
          </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >submit</el-button
        >
        <el-button @click="resetForm('ruleForm')">reset</el-button>
        <el-button @click="goBack">back</el-button>
        <el-button @click="submitEmail()">Get verification code</el-button>
      </div>
    </el-card>
  </div>
  </div>
</template>

<script>
import HubIcon from '@/components/HubIcon.vue';
import request from "@/utils/RequestFile.js"
export default {
  data() {
    
      var validatePass = (rule, value, callback) => {
        if (value === '') {
        callback(new Error('Please input the password'))
        }else if(value!=='' && ((this.ruleForm.pass.length < 5 || this.ruleForm.pass.length > 16))){
          console.log("incorrect password form!!")
          callback(new Error('Please input correct form of password'))
        }else{
          callback()
        }
        
      }
      ;
      var validatePass1 = (rule, value, callback) => {
         var reg = /^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+$/;
          if (!value) {
            return callback(new Error('cannot input empty email!'))
          } else if (!reg.test(value)) {
            return callback(new Error('please input valid email!'))
          } else {
            callback()
          }
  
      };
      var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
      };
      var validatePass4 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the username'))
        } else {
          callback()
        }
      };

      var validatePass5 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the age'))
        } else {
          callback()
        }
      };
      var validatePass6 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please choose the gender'))
        } else {
          callback()
        }
      }
      var validatePass7 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the verification code'))
        } else {
          callback()
        }
      }
      return {
        pwdType: "password",
            isShowPwd: false,
            btnMsg: "get code",
            isDisabled: false,
            time: 30,
            
        options: [
          {
          value: 'Male',
          label: 'Male',
        },
        {
          value: 'Female',
          label: 'Female',
        },
    
        ],
          
          ruleForm: {
              email: "",
              password: "",
              password2: "",
              checkgender: "",
              checkusername: "",
              confirmPass: "",
              checkage: "",
              verificationCode:"",
          },
          rules: {
            email: [
                    { required: true, message: "email cannot be blank", trigger: "blur" },
                    { type: "email", message: "input correct email", trigger: "change" },
                ],
                password: [
                    { required: true, message: "password cannot be blank", trigger: "blur" },
                    {
                        min: 5,
                        max: 16,
                        message: "length of password should be >5, <16",
                        trigger: "blur",
                    },
                ],
                password2: [
                    { required: true, message: "confirm password cannot be blank", trigger: "blur" },
                    {
                        min: 5,
                        max: 16,
                        message: "length of confirm password should be >5, <16",
                        trigger: "blur",
                    },
                    { validator: validatePass3, trigger: "blur" },],

              checkusername : [{required: true, validator: validatePass4, trigger: "blur"}],
              checkage : [{required: true, validator: validatePass5, trigger: "blur"}],
              checkgender: [{required: true, validator: validatePass6, trigger: "blur"}],
              //password: [{required: true, validator: validatePass7, trigger: "blur"}],
             
          },
      };
  },
  computed: {
        showPwd() {
            return this.isShowPwd ? "third-icon-alieye" : "third-icon-alino_eye";
        },
    },
  methods: {
    togglePwd() {
            this.pwdType === "password"
                ? (this.pwdType = "")
                : (this.pwdType = "password");
            this.isShowPwd = !this.isShowPwd;
        },
        // verification code
        getCode(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    request
                        .post("/user/register/email", {
                            email: this.ruleForm.email,
                 
                    })
                        .then((res) => {
                        // console.log(res)
                        if (res.status === 200) {
                            console.log("nothing");
                        }
                    }).catch((err) => {
                      this.$message({
                                message: "email is sent",
                                type: "success",
                            });
                            this.isDisabled = true;
                            let interval = setInterval(() => {
                                this.btnMsg = "" + this.time + "seconds";
                                --this.time;
                                if (this.time < 0) {
                                    this.btnMsg = "get code";
                                    this.time = 30;
                                    this.isDisabled = false;
                                    clearInterval(interval);
                                }
                       }, 1000);
                    });
                }
            });
        },
        // change password
        // forgetPass(formName) {
        //     this.$refs[formName].validate((valid) => {
        //         if (valid) {
        //             request
        //                 .post("/user/forgotPassword", this.forgotPass)
        //                 .then((res) => {
        //                 // console.log(res)
        //                 if (res.status === 200) {
        //                     this.$message({
        //                         message: res.data.message,
        //                         type: "success",
        //                     });
        //                     setTimeout(() => {
        //                         history.pushState({}, "", "/moviehub/loginpage"); //loginpage
        //                         location.reload();
        //                     }, 1000);
        //                 }
        //                 else {
        //                     this.$message({
        //                         message: res.data.message,
        //                         type: "error",
        //                     });
        //                 }
        //             })
        //                 .catch((err) => {
        //                 this.$message({
        //                     message: "system error!",
        //                     type: "error",
        //                 });
        //                 console.log("Error", err);
        //             });
        //         }
        //     });
        // },
      // submitEmail() {
      //   if (this.ruleForm.username==''){
      //     request.post("/user/register/email", {email: this.ruleForm.username}).then(res => {
      //       console.log("successfully sent")
      //     })
 
      //   }else{
      //     alert("input email to get verification code!!!")
      //   }
      // } ,
      
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid && this.ruleForm.verificationCode!=='') {
              console.log("register!");
              request.post("/user/register", {email: this.ruleForm.email, password: this.ruleForm.password, 
                verificationCode: this.ruleForm.password2, age: this.ruleForm.checkage, gender: this.ruleForm.checkgender,
                  username: this.ruleForm.checkusername}).then(res => {
                  if(res.status === 200){
                    this.$message({
                    type: "success",
                    message: "successfully registered"
                    })
                      this.$router.push('/moviehub/loginpage');
                  }else{
                  this.$message({
                    type: "error",
                    message: res.data.message
                  })
                }
              })
          }else{
            alert("input verification code please!!!")
          }
      })
      },
      resetForm(formName) {
          this.$refs[formName].resetFields();
      },
      goBack() {
          this.$router.go(-1);
      },
  },
  components: { HubIcon }
  
};
</script>

<style scoped>
.box-card {
  margin: auto auto;
  width: 600px;
}
.login-from {
  margin: auto auto;
}
#building{
background:url('https://wallpapercave.com/dwp2x/wp11089675.jpg');
width:100%;
height:100%;
position:fixed;
background-size:100% 100%;
}
.color {
  color: orange;
}
.color1 .el-form-item__label{
  color : orange;
}
</style>