import React from 'react';
import './assets/scss/application.scss';
import Main from './views/layouts/main';
import Hall from './views/hall/Hall';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tpv from './views/tpv/Tpv';
import { getTableList } from './ducks/tables';
import {store} from './index';
import ShowTable from './views/tpv/ShowTable';
import Kitchen from './views/kitchen/Kitchen';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ws: null
    };
  }

  componentDidMount() {
    
  }
  timeout = 250;

  connect = () => {

    var ws = new WebSocket("ws://localhost:8000/demo");
    let that = this; // cache the this
    var connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
      console.log("connected websocket main component");
      this.setState({ ws: ws });
      that.timeout = 250; // reset timer to 250 on open of websocket connection 
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    // websocket onclose event listener
    ws.onclose = e => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.timeout + that.timeout) / 1000
        )} second.`,
        e.reason
      );

      that.timeout = that.timeout + that.timeout; //increment retry interval
      connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = err => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );

      ws.close();
    };

    ws.onmessage = encodedMsg => {
      let msg = JSON.parse(encodedMsg.data)
      switch (msg.action) {
        case 'updateTables':
          console.log(msg)
          store.dispatch(getTableList());
        break;
        default:
         console.log(msg,'aaa')
        break;
      }
    }
  };

  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
  };
  render() {

    return (
      <Router>
        <Main>
          <Switch>
            <Route exact path='/' render={() => <Main shown={true}><Hall /></Main>} />
            <Route path='/tpv' component={() => <TPVRoutes/>} />
            <Route path='/kitchen' component={() => <Kitchen/>} />
          </Switch>
        </Main>
      </Router>
    );
  }


}

const TPVRoutes=props=>{
  return(
    <Switch>
      <Route exact path='/tpv/' component={Tpv}/>
      <Route path='/tpv/:id' component={ShowTable}/>
    </Switch>
  )
}
export default App;
