<template>
    <div class="vue-dropdown default-theme">
      <div class="search-module clearfix">
        <input class="search-text"
        @keyup='search($event)' :placeholder="placeholder" v-model="inputText" />
        <span class="glyphicon glyphicon-search search-icon"></span>
      </div>
      <ul class="list-module" v-show="isShowData">
        <li v-for ="(item,index) in datalist" @click="appClick(item)" :key="index">
          <span class="list-item-text">{{item}}</span>
        </li>
      </ul>
      <div class="tip__nodata" v-show="isShowNone">{{nodatatext}}</div>
    </div>
  </template>
   
  <script>
    export default {
      data() {
        return {
          datalist: [],
          inputText: "",
          isShowData: false,
          isShowNone: false
        }
      },
      props: {
        'itemlist': Array,
        'placeholder': String,
        'nodatatext': String
      },
      methods: {
        appClick: function(data) {
          this.$emit('item-click', data)
          this.inputText = data
          this.isShowData = false
        },
        search: function(e) {
          let searchvalue = e.currentTarget.value
          this.$emit('inputValue', searchvalue)
          if (this.datalist.length === 0) {
            
            this.isShowNone = true
            this.isShowData = false
          } else {
            if (this.datalist.length > 30) [
              this.datalist = this.datalist.slice(0,10)
            ]
            this.isShowData = true
            this.isShowNone = false
          }
        },
        inputBlur() {
          this.isShowData = false
          this.isShowNone = false
          this.inputText = ""
        }
      },
      mounted () {
       
        this.datalist = this.itemlist
      }
    }
  </script>
   
  <style lang="scss" scoped>
    .vue-dropdown.default-theme {
      position: absolute;
      left:15%;
      width: 70%;
      margin: 0 auto;
      margin-top: 1em;
      padding: 1em;
      z-index:10;
      box-shadow: 0px 0px 10px #ccc;
      &._self-show {
        display: block!important;
      }
   
      .search-module {
        position: relative;
        .search-text {
          width: 100%;
          height: 30px;
          padding-right: 2em;
          padding-left:0.5em;
          border-radius: 0.5em;
          box-shadow: none;
          border: 1px solid #ccc;
   
          &:focus {
            border-color: #2198f2;
          }
        }
   
        .search-icon {
          position: absolute;
          top: 24%;
          right: 0.5em;
          color: #aaa;
        }
      }
   
      .list-module {
        max-height: 200px;
        overflow-y: auto;
        li {
          &._self-hide {
            display: none;
          }
          margin-top: 0.5em;
          padding: 0.5em;
          &:hover {
            cursor:pointer;
            color: #fff;
            background: #00a0e9;
          }
        }
      }
    }
    .tip__nodata {
      font-size: 12px;
      margin-top: 1em;
    }
  </style>
  