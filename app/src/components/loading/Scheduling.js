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
    calcScheduling() {
        // 以下1日の開始時刻例
        let day_start_at = "08:00";
        // 以下1日の終了時刻例
        let day_end_at = "23:30";
        // 以下1日のタスクのリスト例
        let tasks = [
            {
                "title": "タスク1",
                "task_time_min": 30,
                "start_at": "09:00",
                "is_fix": true
            },
            {
                "title": "タスク2",
                "task_time_min": 60,
                "start_at": "",
                "is_fix": false
            },
            {
                "title": "タスク3",
                "task_time_min": 150,
                "start_at": "",
                "is_fix": false
            },
            {
                "title": "タスク4",
                "task_time_min": 10,
                "start_at": "",
                "is_fix": false
            }
        ];

        let schedules = [];
        // TODO@hrk-fujii: 藤井さん(@hrk-fujii) ここに実装を書いてください

        // 以下出力例
        schedules = [
            {
                "title": "タスク1",
                "task_time_min": 30,
                "start_at": "09:00",
                "is_fix": true
            },
            {
                "title": "タスク2",
                "task_time_min": 60,
                "start_at": "11:00",
                "is_fix": false
            },
            {
                "title": "タスク3",
                "task_time_min": 150,
                "start_at": "12:30",
                "is_fix": false
            },
            {
                "title": "タスク4",
                "task_time_min": 10,
                "start_at": "18:00",
                "is_fix": false
            }
        ];
        return schedules
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
