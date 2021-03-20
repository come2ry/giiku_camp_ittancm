import React from 'react';
import { withRouter } from "react-router-dom";

// ヘッダーの定義
class Header extends React.Component {
    render() {
        const path = this.props.location.pathname;
        if (path === '/') {
            return (
                <header>
                    <img src="image/logo.png" alt="img" />
                </header>
            );
        } else {
            return (
                <header>
                    <img src="image/back.png" alt="img" className="back" onClick={this.props.history.goBack} />
                    <img src="image/logo.png" alt="img" />
                </header>
            );
        }
    }
}


export default withRouter(Header);
