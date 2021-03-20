var SCHEDULE_UTIL = {
    // 予定表シャッフル
    shuffle: function(schedule, ignore_sleep=true){
        schedule.forEach(function(s){
            if (s.start_at == ""){
                s["start_at_int"] = "";
            } else{
                let res = s.start_at.split(":");
                s["start_at_int"] = parseInt(res[0]) * 60 + parseInt(res[1]);
            }
        });
        if (ignore_sleep){
            let sorted = SCHEDULE_UTIL._sort(schedule);
            let splited = SCHEDULE_UTIL._splitFromFix(sorted);
            console.log(sorted);
        }
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
            return {"fixed": fixed, "in_fixed": in_fixed};
        });
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
    }
}