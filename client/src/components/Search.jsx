import React from 'react';



class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }

    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clear = this.clear.bind(this);
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  clear() {

  }


  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.term} 
            onKeyUp={(input) => {
              if (input.keyCode === 13) {
                this.search();
              }
            }}
      onChange={this.onChange}/>       
      <button onClick={this.search}> Add Repos </button>
      <button onClick={this.clear}> Clear Repos </button>
      
        {this.props.repos.map((repo) => (<div> 

        <img src={repo.profileImage} height={60} width={60} />
          <ul>
            <li>Username: {repo.username}</li>
            <li> ID: {repo.repoId}</li>
            <li>Repo: <a href={repo.repoPage}>{repo.repoName}</a></li>
          </ul>

          </div>))}
        </div>) 
  }
}

export default Search;