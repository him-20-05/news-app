import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import News from "./component/News";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import './LoadingBar.css'; // Import CSS file for loading bar styles

export default class App extends Component {
  pageSize = 5;

  state = {
    loading: true // Set loading to true initially
  };

  componentDidMount() {
    // Simulate loading data (e.g., API call)
    setTimeout(() => {
      this.setState({ loading: false }); // Set loading to false after a delay
    }, 1000); // Adjust the delay time as needed
  }

  render() {
    const { loading } = this.state;

    return (
      <Router>
        <div>
          {/* Render loading bar if loading is true */}
          {loading && <div className="loading-bar" />}
          
          {/* Render content when loading is false */}
          {!loading && (
            <>
              <Navbar />
              <Switch>
                <Route exact path="/">
                  <News
                    key="general"
                    pageSize={this.pageSize}
                    country="in"
                    category="general"
                  />
                </Route>
                <Route exact path="/general">
                  <News
                    key="general"
                    pageSize={this.pageSize}
                    country="in"
                    category="general"
                  />
                </Route>
                <Route exact path="/business">
                  <News
                    key="business"
                    pageSize={this.pageSize}
                    country="in"
                    category="business"
                  />
                </Route>
                <Route exact path="/entertainment">
                  <News
                    key="entertainment"
                    pageSize={this.pageSize}
                    country="in"
                    category="entertainment"
                  />
                </Route>
                <Route exact path="/health">
                  <News
                    key="health"
                    pageSize={this.pageSize}
                    country="in"
                    category="health"
                  />
                </Route>
                <Route exact path="/science">
                  <News
                    key="science"
                    pageSize={this.pageSize}
                    country="in"
                    category="science"
                  />
                </Route>
                <Route exact path="/sports">
                  <News
                    key="sports"
                    pageSize={this.pageSize}
                    country="in"
                    category="sports"
                  />
                </Route>
                <Route exact path="/technology">
                  <News
                    key="technology"
                    pageSize={this.pageSize}
                    country="in"
                    category="technology"
                  />
                </Route>
              </Switch>
            </>
          )}
        </div>
      </Router>
    );
  }
}
