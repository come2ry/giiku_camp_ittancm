import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import { Subscribe } from "unstated";
import AppContainer from "../../store/AppContainer";
import SchedulingWrapper from './scheduling';

class Loading extends React.Component{

    // これはよくわからん
    componentWillUnmount() {
        this.props.container.leftLoading();
    }

    render() {
        if (!this.props.container.isLoading()) {
            return (
                <Route exact path='/loading' render={() => <Redirect to={'/'} />} />
            );
        }

        return(
            <div>
                // TODO: ここに最初のアニメーション（真面目な方）を描きます
                {/* <SchedulingWrapper /> */}
                <div>
                    <div>
                        <p>タップで回す<br/>↓　↓</p>
                    </div>
                    <div className="roulett">
                        <img id={this.props.container.state.animation_run ? "do" : ""} src="image/ban2.png" alt="img"/>
                        <img onClick={this.props.container.imgClick} alt="img" src="image/hari.png"/>
                    </div>
                    <div className={this.props.container.state.result ? "next" : "result next"}>
                        <Link to='./'
                        >
                            <img src="image/home.png" alt="img" className="next_icon" />
                            <p>ホームへ</p>
                        </Link>
                    </div>
                </div>
                <div>
                    <div className={this.props.container.state.isOpenModal ? "modal" : "modal none"}>
                        <div onClick={this.props.container.closeModal}>
                            <img src="image/x.png" alt="img" className="close"/>
                        </div>
                        <div className="white_back">
                            <h2>合計{this.props.container.state.total_change}円</h2>
                            {this.props.container.state.listItems}
                            <p>詳細はタップ↑</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// containerはどのページからもアクセスできる値の格納場所
// SubscribeでAppContainerのcontainerを下ろしてきて、
// Loadingコンポーネント内でcontainerという変数でアクセスできるように渡す
const LoadingWrapper = () => (
	<Subscribe to={[AppContainer]}>
		{container => <Loading container={container} />}
	</Subscribe>
);


export default LoadingWrapper;