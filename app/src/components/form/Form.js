import React from 'react';
// unstatedという画面同士の値の受け渡しがやりやすくなるライブラリ
import { Subscribe } from "unstated";
import AppContainer from "../../store/AppContainer";
import { withRouter } from "react-router-dom";

// TODO@akimido12178: 遠藤さん(@akimido121781) ここを実装していってください。
// TODO@shangsenkota: 杉森さん(@shangsenkota) ここを実装していってください。
// 参考のために関数を少し実装しておきました。
class Form extends React.Component {
	state = {
		tasks: [],
		day_start_at: '',
		day_end_at: '',
	};

	// taskというマップを受け取ってstateのtasksに格納する関数
	setTasks = (task) => {
		// consoleにprintして確認
		console.log(task);
		// TODO: stateのtasks(list)にtask(map)をpushする処理
		this.state.tasks.concat(task);
		let tasks = this.state.tasks;
		// TODO: tasksが更新されたらstateに再度格納する処理
		this.setState({ "tasks": this.state.tasks });
	}

	// day_start_atという値を受け取ってstateに格納する関数
	setDayStartAt = (day_start_at) => {
		// consoleにprintして確認
		console.log(day_start_at);
		this.setState({ day_start_at });
	}

	// day_end_atという値を受け取ってstateに格納する関数
	setDayEndAt = (day_end_at) => {
		// consoleにprintして確認
		console.log(day_end_at);
		this.setState({ day_end_at });
	}

	// 画面をclickされた時に発火させるための関数
	handleClick = () => {
		this.props.container.setFormProps({
			tasks: this.state.tasks,
			day_start_at: this.state.day_start_at,
			day_end_at: this.state.day_end_at,
			isSet: true
		});
		/* この時、this.stateは以下のようになっているはず
		this.state = {
			tasks : [
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
			],
			day_start_at: "08:00",
			day_end_at: "23:30"
		}
		*/
	}

	// おそらく画面遷移直前に発動する関数？
	// 大文字の関数はReactがデフォルトで用意した関数で、特定の条件になると呼ばれる
	UNSAFE_componentWillUpdate() {
		// this.props.container.stateのisSetがtrueになったら
		if (this.props.container.state.isSet) {
			// this.props.container.stateのisSetをfalseにして
			this.props.container.setIsSet({ isSet: false });
			// `/loading`というURLに遷移させる
			this.props.history.push('/loading');
		}
	}

	render() {
		return (
			<div>
				// TODO: ここにformなどを埋めていく
				// 以下の例を見ると雰囲気が掴めるかも
				<form>
					<label>
						タイトル
						<input type="text" onChange={e => this.setTasks(parseInt(e.currentTarget.value, 10))} value={this.state.tasks.title}/>
						<div className="unit"></div>
					</label>
				</form>

				<form>
					<label>
						人数
						<input type="text" onChange={e => this.setPartNum(parseInt(e.currentTarget.value, 10))} value={this.state.participate_num} />
						<div className="unit">人</div>
					</label>
				</form>

				<div className="next">
					<div className="next_a" onClick={this.handleClick}>
						<img src="image/coin.png" alt="img" className="next_icon"/>
						<p>割り勘</p>
					</div>
                </div>
			</div>
		);
	}
}

// containerはどのページからもアクセスできる値の格納場所
// SubscribeでAppContainerのcontainerを下ろしてきて、
// Formコンポーネント内でcontainerという変数でアクセスできるように渡す
class FormWrapper extends React.Component {
	render() {
		return (
			<Subscribe to={[AppContainer]} >
				{container => <Form container={container} history={this.props.history}/>}
			</Subscribe>
		)
	}
}

export default withRouter(FormWrapper);
