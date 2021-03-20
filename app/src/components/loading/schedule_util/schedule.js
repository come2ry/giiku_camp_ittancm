var SCHEDULE_UTIL = {
    // 定数
    constants: {
        DAY_MINUTES: 1440
    },


    // 予定表シャッフル
    shuffle: function(schedule, ignore_sleep=true, start_at="07:00", end_at="23:00"){
        // スリープブロックビルド
        let start_at_int = SCHEDULE_UTIL.str2time(start_at);
        if (ignore_sleep){
            schedule.push({"title": "", "task_time_min": 0, "start_at": start_at, "is_fix": false});
            schedule.push({"title": "", "task_time_min": SCHEDULE_UTIL.constants.DAY_MINUTES - SCHEDULE_UTIL.str2time(end_at), "start_at": end_at, "is_fix": false});
        } else{
            let sleep_count = Math.floor(start_at_int/60);
            schedule.push({"title": "", "task_time_min": 0, "start_at": SCHEDULE_UTIL.time2str(0), "is_fix": false});
            for (let i=1; i<sleep_count; i++){
                schedule.push({"title": "", "task_time_min": 60, "start_at": SCHEDULE_UTIL.time2str(i * 60), "is_fix": false});
            }
            schedule.push({"title": "", "task_time_min": SCHEDULE_UTIL.constants.DAY_MINUTES - SCHEDULE_UTIL.str2time(end_at), "start_at": end_at, "is_fix": false});
        }
        
        // 基本処理
        schedule = SCHEDULE_UTIL.set_start_at_int(schedule);
        let sorted = SCHEDULE_UTIL._sort(schedule);
        let splited = SCHEDULE_UTIL._splitFromFix(sorted);

        // 予定をシャッフル
        let result = SCHEDULE_UTIL._shuffle_sorted_schedule(splited);
        console.log(result);
        return result;
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
        let hour = Math.floor(min_time/60);
        let min = min_time % 60;
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
        let min = 0;
        schedule = SCHEDULE_UTIL.shuffle_array(schedule);
        for (let i = (schedule.length - 1); i>=0; i--){
            min += schedule[i].task_time_min;
            if (min <= margin){
                ret.push(schedule.pop());
                if (all == false){
                    return ret;
                }
            } else{
                return ret;
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
                fixed.push(element);
            } else{
                in_fixed.push(element);
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
        for (let i = 0; i<schedule.in_fixed.length; i++){
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
        }
        return result;
    }
}
