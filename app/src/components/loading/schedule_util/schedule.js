var SCHEDULE_UTIL = {
    // 定数
    constants: {
        DAY_MINUTES: 1440
    },


    // 予定表シャッフル
    shuffle: function(schedule, ignore_sleep=true){
        // 基本処理
        schedule = SCHEDULE_UTIL.set_start_at_int(schedule);
        let sorted = SCHEDULE_UTIL._sort(schedule);
        let splited = SCHEDULE_UTIL._splitFromFix(sorted);
        
        // 予定をシャッフル
        SCHEDULE_UTIL._shuffle_sorted_schedule(splited);
        //console.log(sorted);
        return sorted;
    },


    // 予約間の空白秒（next省略で終日）
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

    // 開始時刻にintを埋め込み
    set_start_at_int: function(schedule){
        let ret = schedule.map(function(s){
            if (s.start_at == ""){
                s["start_at_int"] = "";
            } else{
                let res = s.start_at.split(":");
                s["start_at_int"] = parseInt(res[0]) * 60 + parseInt(res[1]);
            }
            return s;
        });
        return ret;
    },

    // ランダムなタスクを取得し、元配列から削除
    take_random_task: function(schedule, margin=null, all=true){
        return false;
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
        return schedule.sort(function(a, b) {
            if (a.start_at_int > b.start__at_int) {
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
                result = result.concat(ret);
            }
        }
        return result;
    }
}
