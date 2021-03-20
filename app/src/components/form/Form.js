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
		// TODO: tasksが更新されたらstateに再度格納する処理
		// this.setState({ tasks });
	}

	// day_start_atという値を受け取ってstateに格納する関数
	setDayStartAt = (day_start_at) => {
		// consoleにprintして確認
		console.log(day_start_at);
		this.setState({ day_start_at });
	}

	// day_end_atという値を受け取ってstateに格納する関数
	setEndAt = (day_end_at) => {
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
				{/* <form>
					<label>
						合計金額
						<input type="number" onChange={e => this.setTotalFee(parseInt(e.currentTarget.value, 10))} value={this.state.total_fee}/>
						<div className="unit">円</div>
					</label>
				</form>

				<form>
					<label>
						人数
						<input type="number" onChange={e => this.setPartNum(parseInt(e.currentTarget.value, 10))} value={this.state.participate_num} />
						<div className="unit">人</div>
					</label>
				</form>

				<div className="next">
					<div className="next_a" onClick={this.handleClick}>
						<img src="image/coin.png" alt="img" className="next_icon"/>
						<p>割り勘</p>
					</div>
                </div> */}
			</div>
		);
	}
}

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
