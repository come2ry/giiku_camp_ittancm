import React from 'react';
// SubscribeによってAppContainerを全ての画面からアクセスできるようにするためのライブラリ
import { Container } from "unstated";


class AppContainer extends Container{
    // このアプリを通して使う変数一覧
    state = {
        tasks: [
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
            }
        ],
        day_start_at: "00:00", // デフォルト値. ユーザにFormで入力してもらったらそれに書き換える
        day_end_at: "00:00", // デフォルト値. ユーザにFormで入力してもらったらそれに書き換える
        isSet: false,

        // 以下サンプルなので気にしないで
        total_fee: '', // 例
        participate_num: '', // 例
        individual_change: 0, // 例
        individual_fee: 0, // 例
        total_change: '', // 例
        listItems: [], // 例
        animation_run: false, // 例
        result: false, // 例
        isOpenModal: false, // 例
    }

    // 以下はサンプルなので気にしないで。
    // コードの書き方の参考にはなるかも。
    // isConfirm = () => {
    //     if (this.state.total_fee === '' || this.state.participate_num === '') {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    // isRoulette = () => {
    //     if (this.state.total_change === '') {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    // getTotalFee = () => {
    //     return this.state.total_fee;
    // }

    // setTotalFee = (total_fee) => {
	// 	this.setState({ total_fee });
	// }

	// setPartNum = (participate_num) => {
	// 	this.setState({ participate_num });
    // }

    setIsSet = ({ isSet }) => {
        this.setState({ isSet });
    }

    // setHomeNums = ({ total_fee, participate_num, isSet }) => {
    //     console.log(total_fee, participate_num, isSet);
    //     this.setState({ total_fee, participate_num, isSet });
    // }

    // fetchCalc = () => {
    //     let total_fee = this.state.total_fee;
    //     let participate_num = this.state.participate_num;
    //     this.setState({
    //         individual_change: result.individual_change,
    //         individual_fee: result.individual_fee,
    //         total_change: result.total_change
    //     });
    // }

    // imgStop = () => {
    //     this.setState({
    //         animation_run: false,
    //         result: true,
    //         isOpenModal: true
    //     });
    // }

    // imgClick = (e) => {
    //     if (this.state.animation_run) { return }
    //     /* TODO: <img>にstyle id: spin-ban を付与　*/
    //     let listItems;

    //     // var total_change = Math.floor(Math.random() * (max + 1 - min)) + min;
    //     var total_change = this.state.total_change;
    //     fetch(`${url_root}/roulette?total_change=${total_change}`)
    //         .then(response => response.json())
    //         .then(_result => {
    //             let result = _result.result;
    //             console.log(result);
    //             var img_num = result.length;
    //             let h;
    //             if (img_num >= 2) {
    //                 h = window.parent.screen.height * 3 / 10 / img_num;
    //             }

    //             listItems = result.map((r, i) =>
    //                 <div key={i}>
    //                     <a href={r.item_url} target='_blank' rel="noreferrer noopener">
    //                         <img src={r.item_image_url} alt="img" className="mono_img" style={{ height: h }} />
    //                     </a>
    //                     <p className='mono_p'>{r.item_name} {r.item_price} x {r.num}</p>
    //                 </div>

    //             );
    //             this.setState({
    //                 animation_run: true,
    //                 result: false,
    //                 total_change: total_change,
    //                 listItems: listItems
    //             })
    //             console.log(listItems);
    //         });

    //     this.setState({
    //         imgStopAction: setTimeout(this.imgStop, 3000)
    //     })
    // }

    // closeModal = () => {
    //     this.setState({ isOpenModal: false });
    // }

    // leftRoulette = () => {
    //     this.setState({
    //         animation_run: false,
    //         result: false,
    //         total_change: '',
    //         listItems: [],
    //         isOpenModal: false
    //     });
    //     clearTimeout(this.state.imgStopAction);
    // }
}

export default AppContainer;