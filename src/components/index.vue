<template>
    <div class="Index navbar-light customNav navbar navbar-expand-lg">
    <div class="container-sm">
      <div>
        <div id="title">Truth Table Generator</div>

      </div>

      <div class="form-group row">
        <input
            type="text"
            v-model="input"
            class="form-control col-sm-8 col-md-6"
            placeholder="Type your formula..."
        >
        <button type="button" @click="generated()" class="btn btn-default col-sm-1 col-md-2">Generate</button>

      </div>
      <div id="legend" class="container">
      <div class="legend__content card" v-if="showtips==true" style="max-width: 700px;">
        <div id="operands" class="flex-row space-between">
          <div class="operand flex-column text-center">
            <div class="operand__original">And</div>
            <div class="operand__code">^/&amp;/and</div>
          </div>
          <div class="operand flex-column text-center">
            <div class="operand__original">Or</div>
            <div class="operand__code">v/|/or</div>
          </div>
          <div class="operand flex-column text-center">
            <div class="operand__original">Not</div>
            <div class="operand__code">~/!/not</div>
          </div>
          <div class="operand flex-column text-center">
            <div class="operand__original">Xor</div>
            <div class="operand__code">xor/⊕</div>
          </div>
          <div class="operand flex-column text-center">
            <div class="operand__original">Implication</div>
            <div class="operand__code">&gt;/-&gt;/=&gt;</div>
          </div>
          <div class="operand flex-column text-center">
            <div class="operand__original">Equivalence</div>
            <div class="operand__code">=/&lt;=&gt;</div>
          </div>
        </div>
        <hr>
        <h3 style="margin-left: auto; margin-right:auto"> How to type </h3>
        <div id="details"><p>Use the above characters for the logical operators. Identifiers can be either upper or
          lower case letters: A, B, x, y... You can also type <b>true</b> and <b>false</b>.</p>
          <p class="example"> Example: A -> (B /\ C) </p></div>

      </div>
      </div>
      <div class="row tb table-responsive">
        <table class="table col-sm-11 col-md-9 table-striped " v-if="tables">
          <thead>
          <tr align="center">
            <th scope="col text-center" v-for="(item,key,i) in tables" :key="i.id">{{key}}</th>
          </tr>
          </thead>
          <tbody id="tbody">
          <tr v-for="(item2,i2) in Object.keys(tables[Object.keys(tables)[0]])" :key="i2.id">
            <td v-for="(item3,key,i3) in tables" :key="i3.id" align='center'>{{ item3[i2 + 1].toString().charAt(0).toUpperCase() + item3[i2 + 1].toString().slice(1) }}</td>

          </tr>
          <div>
          </div>
          </tbody>

        </table>

      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import api from '../http/api.js'
export default{

  setup(){
    const state = reactive({
      input:null,
      // tables:{"A":{"1":true,"2":true,"3":true,"4":true,"5":false,"6":false,"7":false,"8":false},"B":{"1":true,"2":true,"3":false,"4":false,"5":true,"6":true,"7":false,"8":false},"C":{"1":true,"2":false,"3":true,"4":false,"5":true,"6":false,"7":true,"8":false},"((A and (~ B)) and C)":{"1":false,"2":false,"3":true,"4":false,"5":false,"6":false,"7":false,"8":false}},
      tables: null,
      showtips:true,
    })

    const generated = ()=>{
      if (state.input == ''|| state.input == null){
        console.log("Empty Expression");
        return
      }
      api.checkValid({expression:state.input}).then((res)=>{
        console.log(res);
        if (!res){
          console.log("Invalid Expression");
          return
        }
        // 请求第三层
        api.truthtable({expression:state.input}).then((res)=>{
          console.log(res);
          state.tables = res
          state.showtips=false
        }).catch((res)=>{
          console.log(res);
        })
      }).catch((res)=>{
        console.log("Server Error");
        console.log(res);
      })
    }


    return {
      ...toRefs(state),generated,
    }

  }
}


// import Vue from "vue"

// export default {
//   data() {
//     return {
//       input: ""
//     }
//   }
// }
</script>

<style>


@font-face {
  font-family: mFont;
  src: url('/src/assets/css/PoiretOne-Regular.ttf');
}
.Index {
  width: 100%;
  height: 100%;
  /* height: 100%; */
  overflow: hidden;
  position: relative;
  z-index: 999;
  background: linear-gradient(to right, #BFCDBB, #EDE5CE);

}


.container-sm {

  width: 900px;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start !important;
}

.form-group {
  height: 60px;
  display: flex;
  justify-content: center;
}

.form-group input {
  height: 100%;
  background: transparent;
  color: #fff;
  border: solid #fff 2px;
}

input::-webkit-input-placeholder {
  color: #fff;
  font-size: 20px;
}

.btn {
  border: solid #fff 2px;
  border-radius: 10px;
  margin-left: 20px;
  color: #fff;
}

.btn:hover {
  color: #4776e6;
  background: #fff;
}

.row {
  width: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: center;
}

.tb {
  width: 100%;
}

.table {
  background: #fff;
  margin-top: 20px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  overflow: hidden;
  overflow-x: scroll;
  width: 100%;
  white-space: nowrap;
}

.table th, .table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: none;
}

#title {
  width: 100%;
  height: 80px;
  margin-top: 8vmin;
  margin-bottom: 6vmin;
  text-align: center;
  /* margin-top: 8vmin;
    margin-bottom: 6vmin; */
  font-size: 80px;
  font-weight: 900;
  font-family: 'Poiret One', cursive;
  text-align: center;
  color: white;
  white-space: normal;
}

select {
  appearance: none;
  border: solid 1px #ccc;
  font-size: 13px;
  padding: 3px;
  box-sizing: border-box;
  border-radius: 5px;
}

select:focus {
  border: solid 1px #ccc;
}

@media (max-width: 768px) {
  /* .form-group{
            display: flex;
            flex-direction: column;
        } */
  .form-group input {
    margin-bottom: 10px;
  }

  #title {
    font-size: 40px;
  }

  .btn {
    margin-left: 0;
  }

  .tb {
    margin-top: 40px;
  }

}

@media (max-width: 480px) {
  /* .form-group{
            display: flex;
            flex-direction: column;
        } */
  .form-group input {
    margin-bottom: 10px;
  }

  #title {
    font-size: 40px;
  }

  .btn {
    margin-left: 0;
  }

  .tb {
    margin-top: 40px;
  }

}
</style>

