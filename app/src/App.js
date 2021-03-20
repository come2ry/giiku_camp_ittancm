import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FormWrapper from './components/form/Form';
import LoadingWrapper from './components/loading/Loading';
import ResultWrapper from './components/loading/Loading';
import Header from './components/header/Header'

const App = () => (
	// URLとReactコンポーネントの結びつけをしている
	<Router>
		<Header/>
		<div id="body">
			<Switch>
				<Route exact path='/' component={FormWrapper} />
				<Route exact path='/loading' component={LoadingWrapper} />
				<Route exact path='/result' component={ResultWrapper} />
				{/* <Route exact component={Page404}/> */}
			</Switch>
		</div>
	</Router>
)

// export defaultをすると、外部のファイルから
// import App from './App';
// みたいな感じで呼び出せるようになる
export default App;
