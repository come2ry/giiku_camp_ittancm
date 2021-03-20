import React from 'react';
// unstatedという画面同士の値の受け渡しがやりやすくなるライブラリ
import { Subscribe } from "unstated";
import AppContainer from "../../store/AppContainer";
import { withRouter } from "react-router-dom";

// TODO@akimido12178: 遠藤さん(@akimido121781) ここを実装していってください。
// TODO@shangsenkota: 杉森さん(@shangsenkota) ここを実装していってください。
// 参考のために関数を少し実装しておきました。
class Form extends React.Component {
	initialTask = { title: "", task_time_min: 0, start_at: "00:00", is_fix: false };
	state = {
		task: this.initialTask,
		tasks: [],
		day_start_at: '',
		day_end_at: '',
	};

	// taskの更新
	setTitle = (title) => {
		console.log(title);
		let task = this.state.task;
		task.title = title;
		this.setState({ task });
	}

	// taskの更新
	setTaskTimeMin = (task_time_min) => {
		console.log(task_time_min);
		let task = this.state.task;
		task.task_time_min = task_time_min;
		this.setState({ task });
	}

	// taskの更新
	setStartAt = (start_at) => {
		console.log(start_at);
		let task = this.state.task;
		task.start_at = start_at;
		this.setState({ task });
	}

	// taskの更新
	setIsFix = (is_fix) => {
		console.log(is_fix);
		let task = this.state.task;
		task.is_fix = is_fix;
		this.setState({ task });
	}


	// taskというマップを受け取ってstateのtasksに格納する関数
	setTasks = (task) => {
		// consoleにprintして確認
		console.log(task);
		// TODO: stateのtasks(list)にtask(map)をpushする処理
		this.state.tasks.push(task);
		console.log(this.state.tasks);
		// TODO: tasksが更新されたらstateに再度格納する処理
		this.setState({ "task": this.initialTask, "tasks": this.state.tasks });
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

	// タスク追加ボタンをclickされたされた時に発火させるための関数
	handleAdd = (event) => {
		event.preventDefault();
		console.log(this.state.task);
		this.setTasks(this.state.task);
		// this.setState({
		// tasks: [
		// 	...this.state.tasks,
		// 	{
		// 		title: this.state.tasks.title,
		// 		task_time_min: this.state.tasks.task_time_min,
		// 		start_at: this.state.tasks.start_at,
		// 		is_fix: this.state.tasks.is_fix
		// 	}],
		// title:"",
		// task_time_min:"",
		// start_at:"",
		// is_fix:""
		// });
	}

	// スケジュール作成ボタンをclickされた時に発火させるための関数
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
		console.log(this.state.tasks);
		return (
			<div>
				<form>
					<label>
						タスク名
						<input type="text" onChange={e => this.setTitle(e.currentTarget.value)} value={this.state.tasks.title}/>
						<div className="unit"></div>
					</label>
				</form>

				<form>
					<label>
						所要時間
						<input type="text" onChange={e => this.setTaskTimeMin(parseInt(e.currentTarget.value, 10))} value={this.state.tasks.task_time_min}/>
						<div className="unit"></div>
					</label>
				</form>

				<form>
					<label>
						開始時間
						<input type="time" onChange={e => this.setStartAt(e.currentTarget.value)} value={this.state.tasks.start_at}/>
						<div className="unit"></div>
					</label>
				</form>

				<div className="">
					{/* <img src="image/coin.png" alt="img" className="next_icon"/> */}
					<div className="next_a" onClick={this.handleAdd}>
						<p>タスク追加</p>
					</div>
                </div>

				<hr></hr>

				<form>
					<label>
						いつから
						<input type="time" onChange={e => this.setDayStartAt(e.currentTarget.value)} value={this.state.day_start_at} />
						<div className="unit"></div>
					</label>
				</form>

				<form>
					<label>
						いつまで
						<input type="time" onChange={e => this.setDayEndAt(e.currentTarget.value)} value={this.state.day_end_at} />
						<div className="unit"></div>
					</label>
				</form>

				<div className="">
					{/* <img src="image/coin.png" alt="img" className="next_icon"/> */}
					<div className="next_a" onClick={this.handleClick}>
						<p>スケジュール生成</p>
					</div>
                </div>

				{this.state.tasks.map((l, idx) => (
					<div key={idx}>
						<p>title:{l.title}</p>
						<p>task_time_min:{l.task_time_min}</p>
						<p>start_at:{l.start_at}</p>
						<p>is_fix:{l.is_fix}</p>
					</div>
				))}
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
