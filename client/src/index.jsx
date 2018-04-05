import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }
  
  componentDidMount() {
    this.displayRepo();
  }

  displayRepo() {
    $.get('/repos', (repoList) => {
      this.setState({
        repos: repoList
      })
    })
  }


  search (term) {
    let self = this;
    console.log(`${term} was searched!`);
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: {
        username: term,
      },
      success: function(response) {
        console.log('Repo saved: ' + response);
        self.displayRepo();
      },
      error: function(error, callback) {
        console.log('error: ', error);
        callback();
      }
    });
  }

  render () {
    return (<div>
      <h1>Jake's Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)} repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));