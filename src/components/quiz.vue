<template>
  <div class="Index navbar-light customNav navbar navbar-expand-lg">
    <div class="container-sm">
      <div>
        <div id="title">Quiz {{ id }}</div>
      </div>
      <div class="row tb table-responsive">
        <table class="table  table-striped " v-if="tables">
          <thead>
          <tr align="center">
            <th scope="col text-center" v-for="(item,key,i) in tables" :key="i.id">{{ key.toString().toUpperCase() }}
            </th>
            <th scope="col text-center">{{ exps }}</th>
          </tr>
          </thead>
          <tbody id="tbody">
          <tr v-for="(item2,i2) in Object.keys(tables[Object.keys(tables)[0]])" :key="i2.id">

            <td v-for="(item3,key,i3) in newtables" :key="i3.id" align='center'>
              {{ item3[i2 + 1].toString().charAt(0).toUpperCase() + item3[i2 + 1].toString().slice(1) }}
            </td>
            <td align='center'>
              <select name="select" v-model="answer[i2]" aria-placeholder="Choose">
                <option v-for="item in data.items " v-bind:value="item.value">{{ item.text }}</option>
              </select>

            </td>
            <td align='center' v-if="correct_answer==null"></td>
            <!--            <td align='center' bgcolor="#cd5c5c" v-else-if="correct_answer[i2]==0"><span-->
            <!--                style="color: #2f3542; ">False</span></td>-->
            <!--            <td align='center' bgcolor="#556b2f" v-else><span style="color: #2f3542; ">True</span></td>-->
            <td align='center' bgcolor="#556b2f"
                v-else-if="correct_answer[i2]==answer[i2] &&correct_answer[i2]==0 "><span
                style="color: #2f3542; ">False</span></td>
            <td align='center' bgcolor="#cd5c5c"
                v-else-if="correct_answer[i2]!=answer[i2] &&correct_answer[i2]==0 "><span
                style="color: #2f3542; ">False</span></td>
            <td align='center' bgcolor="#556b2f" v-else-if="correct_answer[i2]==answer[i2] &&correct_answer[i2]==1">
              <span style="color: #2f3542; ">True</span></td>
            <td align='center' bgcolor="#cd5c5c" v-else><span style="color: #2f3542; ">True</span>
            </td>

          </tr>
          </tbody>

        </table>

      </div>
      <div class="form-group row" v-if="score">
        <h2>Your score is {{ score }}/100</h2>

      </div>
      <div class="form-group row">
        <button type="button" @click="check()" class="btn btn-default col-sm-1 col-md-3 col-lg-4">Submit</button>

      </div>

    </div>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs} from 'vue'
import {useRouter} from 'vue-router'
import api from '../http/api'


export default {
  data() {
    return {}

  },
  filters: {
    fallback: function () {
      return 1
    }
  },

  setup() {


    const router = useRouter()
    const id = router.currentRoute.value.params.id
    const state = reactive({
      exps: null,
      // tables:{"A":{"1":true,"2":true,"3":true,"4":true,"5":false,"6":false,"7":false,"8":false},"B":{"1":true,"2":true,"3":false,"4":false,"5":true,"6":true,"7":false,"8":false},"C":{"1":true,"2":false,"3":true,"4":false,"5":true,"6":false,"7":true,"8":false},"((A and (~ B)) and C)":{"1":false,"2":false,"3":true,"4":false,"5":false,"6":false,"7":false,"8":false}},
      tables: null,
      newtables: null,
      data: {
        items: [{text: 'True', value: 1}, {text: 'False', value: 0}],
      },
      answer: [],
      correct_answer: null,
      score: 0,
      Correct: false,
      id: id

    })

    const generated = () => {
      console.log(data.items);
    }


    onMounted(() => {
      get_data(id)
      console.log(id);
      removelast()
    })

    const get_data = (id) => {
      api.getquiz({expression: id}).then((res) => {


        state.exps = res
        console.log("expressions获取", state.exps);
        get_quiz_table(state.exps)
      }).catch((res) => {
        console.log(res);
        console.log("Truthtable json：");
      })
    }

    const get_quiz_table = (exps) => {
      api.quiztable({expression: exps}).then((res) => {
        console.log(res);
        state.tables = res
        state.newtables = res

        console.log(state.tables);
        removelast()

      }).catch((res) => {
        console.log(res);

      })
    }


    // 提前处理tables列表，目标是删除最后一个td
    const removelast = () => {
      console.log(state.tables);
      // const temp = Object.keys(state.tables).slice(-1)
      // state.newtables = state.tables

      // delete temp[Object.keys(temp).slice(-1)]
      // Object.keys(state.tables).forEach((i)=>{
      //   console.log(i);
      //   keys = Object.keys(state.tables[i]).slice(-1)
      //   // state.tables[i].remove(keys.pop())
      //   delete state.tables[i][keys]
      // })

      // for (i of Object.keys(state.tables)) {
      //   keys = Object.keys(i)
      //   state.tables[i].remove(keys.pop())
      // }
      console.log(state.tables);
      console.log("Tables:");
      state.newtables = state.tables
      console.log(state.newtables);
    }

    const get_correct = (exps, ans) => {
      api.correct({expression: exps, ans: ans}).then((res) => {
        console.log(res);
        state.correct_answer = res.Answer
        state.score = res.Score
        update_score(id, res.Score)
        // alert(res.Correct);
        // alert(res.Score);
      }).catch((res) => {
        console.log(res);

      })
    }
    const update_score = (id, score) => {
      api.update({id: id, score: score * 100}).then((res) => {
        console.log(res);

      }).catch((res) => {
        console.log(res);

      })
    }
    const check = (id) => {

      let user_ans = state.answer.join('')
      console.log(user_ans);
      get_correct(state.exps, user_ans)

    }

    return {
      ...toRefs(state), check
    }

  },


}

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
  height: 100px;
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