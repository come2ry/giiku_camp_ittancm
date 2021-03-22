import React from 'react';
import { Subscribe } from "unstated";
import AppContainer from "../../store/AppContainer";

// タスクをギュインギュイン回してスケジュールを再生成するアニメーションのコンポーネント
class Scheduling extends React.Component{
	constructor(props) {
        super(props)

        // なんか以下の1行が必要になる時が来るかもしれない
		// this.handleChange = this.handleChange.bind(this);
		this.state = {}
    }

    // TODO@hrk-fujii: 藤井さん(@hrk-fujii) が実装する関数の雛形
    calcScheduling(schedules_arr, ignore_sleep=true, day_start_at="07:00", day_end_at="23:00") {
        return SCHEDULE_UTIL.shuffle(schedules_arr, ignore_sleep, day_start_at, day_end_at);
    }

	handleChange = (e) => {
		return this.props.func(e);
	}

	render(){
		return(
            <div>
                // TODO: ここにギュインギュイン回るふざけた感じのアニメーションを描きます
            </div>
		);
	}
}

// containerはどのページからもアクセスできる値の格納場所
// SubscribeでAppContainerのcontainerを下ろしてきて、
// Schedulingコンポーネント内でcontainerという変数でアクセスできるように渡す
const SchedulingWrapper = () => (
	<Subscribe to={[AppContainer]}>
		{container => <Scheduling container={container} />}
	</Subscribe>
);


export default SchedulingWrapper;

var SCHEDULE_UTIL = {
    // 定数
    constants: {
        DAY_MINUTES: 1440
    },


    // 予定表シャッフル
    shuffle: function(schedule, ignore_sleep=true, start_at="07:00", end_at="23:00"){
        // スリープブロックビルド
        let start_at_int = SCHEDULE_UTIL.str2time(start_at);
        if (ignore_sleep == false){
            schedule.push({"title": "", "task_time_min": 0, "start_at": start_at, "is_fix": true});
        } else{
            let sleep_count = Math.floor(start_at_int/60);
            schedule.push({"title": "", "task_time_min": 0, "start_at": SCHEDULE_UTIL.time2str(0), "is_fix": true});
            for (let i=1; i<sleep_count; i++){
                schedule.push({"title": "", "task_time_min": 60, "start_at": "", "is_fix": false});
            }
            schedule.push({"title": "", "task_time_min": start_at_int%60, "start_at": "", "is_fix": false});
        }
        schedule.push({"title": "", "task_time_min": SCHEDULE_UTIL.constants.DAY_MINUTES - SCHEDULE_UTIL.str2time(end_at), "start_at": end_at, "is_fix": true});
        
        // 基本処理
        schedule = SCHEDULE_UTIL.set_start_at_int(schedule);
        let sorted = SCHEDULE_UTIL._sort(schedule);
        let splited = SCHEDULE_UTIL._splitFromFix(sorted);

        // 予定をシャッフル
        let result = SCHEDULE_UTIL._shuffle_sorted_schedule(splited);
        result = SCHEDULE_UTIL._form_schedule(result);
        
        // 結局、その日1日のはじめと終わり
        start_at = result[0].start_at;
        end_at = SCHEDULE_UTIL.time2str(result[result.length - 1].start_at_int + result[result.length - 1].task_time_min);

        console.log(result);
        console.log(start_at);
        console.log(end_at);
        return [result, start_at, end_at];
    },


    // タスク間の空白秒（next省略で終日）
    get_margin(prev_task, next_task=null){
        let ret = 0;
        if (next_task == null){
            ret = SCHEDULE_UTIL.constants.DAY_MINUTES - (prev_task.start_at_int + prev_task.task_time_min);
        } else{
            ret = next_task.start_at_int - (prev_task.start_at_int + prev_task.task_time_min);
        }
        if (ret >= 0){
            return ret;
        } else{
            return false;
        }
    },

    // 文字列から分(int)
    str2time: function(str_time){
        let res = str_time.split(":");
        return parseInt(res[0]) * 60 + parseInt(res[1]);
    },

    // 分(int)から文字列
    time2str: function(min_time){
        let hour = ("000" + Math.floor(min_time/60)).slice(-2);
        let min = ("000" + min_time%60).slice(-2);
        return hour + ":" + min;
    },

    // 開始時刻にintを埋め込み
    set_start_at_int: function(schedule){
        let ret = schedule.map(function(s){
            if (s.start_at == ""){
                s["start_at_int"] = "";
            } else{
                s["start_at_int"] = SCHEDULE_UTIL.str2time(s.start_at);
            }
            return s;
        });
        return ret;
    },

    // ランダムなタスクを取得し、元配列から削除
    take_random_task: function(schedule, margin=null, all=true){
        let ret = [];
        if (schedule.length == 0){
            return ret;
        }
        let min = 0;
        schedule = schedule.sort(function(a, b) {
            if (a.task_time_min > b.task_time_min) {
                return -1;
            } else {
                return 1;
            }
        });
        for (let i = schedule.length - 1; i >= 0; i--){
            if (schedule.length == 0){
                return ret;
            }
            min += schedule[i].task_time_min;
            if (min <= margin){
                let new_object = {};
                new_object["title"] = schedule[i].title;
                new_object["start_at"] = schedule[i].start_at;
                new_object["task_time_min"] = schedule[i].task_time_min;
                new_object["start_at_int"] = schedule[i].task_time_int;
                new_object["is_fix"] = schedule[i].is_fix;
                ret.push(new_object);
                schedule.splice(i, 1);
                if (all == false){
                    return ret;
                }
            } else{
                min -= schedule[i].task_time_min;
            }
        }
        return ret;
    },

    // 配列シャッフル
    shuffle_array: function(arr){
        for (let i = 0; i < (arr.length*50); i++){
            let rnd = Math.floor(Math.random()*arr.length);
            let str1 = arr[0];
            let str2 = arr[rnd];
            arr[rnd] = str1;
            arr[0] = str2;
        }
        return arr;
    },


    //分割
    _splitFromFix: function(schedule){
        let fixed = [];
        let in_fixed = [];
        schedule.forEach(function(element){
            if (element.is_fix){
                in_fixed.push(element);
            } else{
                fixed.push(element);
            }
        });
        return {"fixed": fixed, "in_fixed": in_fixed};
    },

    // 開始時刻で並び替え
    _sort: function(schedule){
        let ret = schedule.sort(function(a, b) {
            if (a.task_time_min > b.task_time_min) {
                return 1;
            } else {
                return -1;
            }
        });
        return ret.sort(function(a, b) {
            if (a.start_at_int > b.start_at_int) {
                return 1;
            } else {
                return -1;
            }
        });
    },

    // 予定をシャッフル（_sort、splitを通した後）
    _shuffle_sorted_schedule: function(schedule){
        let result = [];
        let index_arr = [];
        for (let i = 0; i<schedule.in_fixed.length; i++){
            index_arr.push(i);
        }
        index_arr = SCHEDULE_UTIL.shuffle_array(index_arr);
        index_arr.forEach(function(i){
            let margin = 0;
            if (i < (schedule.in_fixed.length - 1)){
                margin = SCHEDULE_UTIL.get_margin(schedule.in_fixed[i], schedule.in_fixed[i+1]);
            } else{
                margin = SCHEDULE_UTIL.get_margin(schedule.in_fixed[i]);
            }
            let ret = SCHEDULE_UTIL.take_random_task(schedule.fixed, margin, true);
            result.push(schedule.in_fixed[i]);
            if (ret){
                let add_min = 0;
                ret.forEach(function(el, idx){
                    if (idx == 0){
                        let next = schedule.in_fixed[i].start_at_int + schedule.in_fixed[i].task_time_min;
                        el["start_at_int"] = next;
                        el["start_at"] = SCHEDULE_UTIL.time2str(next);
                    } else{
                        let next = ret[idx-1].start_at_int + ret[idx-1].task_time_min;
                        el["start_at_int"] = next;
                        el["start_at"] = SCHEDULE_UTIL.time2str(next);
                    }
                })
                result = result.concat(ret);
            }
        });
        return result;
    },

    // 返却用に予定を生計
    _form_schedule: function(schedule){
        let s_len = schedule.length;
        for (let i = s_len-1; i >= 0; i--){
            if (schedule[i].title == ""){
                schedule.splice(i, 1);
            }
        }
        return schedule.sort(function(a, b) {
            if (a.start_at_int > b.start_at_int) {
                return 1;
            } else {
                return - 1;
            }
        });
    }
}
