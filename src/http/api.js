import custom from './axios';


export default {

    checkValid({expression}){
        return custom.get(`/ttg/valid?expression=(${expression})`)
    },    

    truthtable({expression}) {
        return custom.get(`/ttg/truthtable_json?expression=${expression}`);
    },
    quiztable({expression}) {
        return custom.get(`/ttg/truthtable_json?expression=${expression}&quiz=1`);
    },
    //
    correct({expression,ans}) {
        return custom.get(`/ttg/truthtable/correct?expression=${expression}&ans=${ans}`);
    },  

    getquiz({expression}) {
        return custom.get(`quiz/${expression}`)
    },

    update({id,score}) {
        return custom.get(`quiz/submission?id=${id}&score=${score}`)
    }
}
