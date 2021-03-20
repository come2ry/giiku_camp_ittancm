import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import { Subscribe } from "unstated";
import AppContainer from "../../store/AppContainer";


class Result extends React.Component{

    // これはよくわからん
    componentWillUnmount() {
        this.props.container.leftLoading();
    }

    render() {
        return(
            <div>
                // TODO: ここに結果画面を実装していく
            </div>
        );
    }
}

// containerはどのページからもアクセスできる値の格納場所
// SubscribeでAppContainerのcontainerを下ろしてきて、
// Resultコンポーネント内でcontainerという変数でアクセスできるように渡す
const ResultWrapper = () => (
	<Subscribe to={[AppContainer]}>
		{container => <Result container={container} />}
	</Subscribe>
);

export default ResultWrapper;