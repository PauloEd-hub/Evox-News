import React, {useEffect, useState} from 'react';
import './App.css';
import Logo from './img/logo2.png';
import ArrowDown from './img/arrow-down.png';
import InfiniteScroll from 'react-infinite-scroll-component';


class Header extends React.Component {
  render() {
    return (
      <header id="main-header">
        <div id="image-evox-div">
          <img id="image-evox" src={Logo} alt="vox-news" />
        </div>
      </header>
    )
  }
}


class NavBar extends React.Component {
  render() {
    return (
      <div id="filter">
        <button>News
          <img src={ArrowDown} />
        </button>
      </div>
    )
  }
}


class App extends React.Component {


  
  constructor(props) {
    
    super(props);
    this.state = {
      articles: [],
      search: null,
      page: 1,
      count: 30
    }
  }


  componentDidMount() {
    fetch('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4ca48c8f59e44590a3548a07950e010c')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          articles: myJson.articles

        })
      });
  }

  fetchNotices = () => {
    const { page } =this.state
    this.setState({page: this.state.page + 1})
    fetch('http://newsapi.org/v2/everything?q=apple&from=2020-09-16&to=2020-09-16&sortBy=popularity&apiKey=4ca48c8f59e44590a3548a07950e010c')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        let newArticles = myJson.articles
        console.log(newArticles)
        this.setState({
          articles: myJson.articles.concat(...this.state.articles)
        })
      });
  }


  searchSpace = (event) => {
    let keyword = event.target.value
    this.setState({search:keyword})
    console.log(keyword)

  }
  render() {

    return (
      <div className="App">
        <InfiniteScroll dataLength={this.state.articles.length}
          next={this.fetchNotices}
          hasMore={true}
          loader={<center><h4>Loading...</h4></center>}
        >
        <Header />
        {/* Input */}

        <div className="kk">
          <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
          </svg>
          <input id="search-news" type="text" onChange={(e)=>this.searchSpace(e)} placeholder="Try The Guardian " />
        </div>

        <NavBar />
    
        {
           this.state.articles.filter(data => {
            if(this.state.search == null) {
              return data
            } else if (data.title.toLowerCase().includes(this.state.search.toLowerCase()) || data.source.name.toLowerCase().includes(this.state.search.toLowerCase())) {
              return data
            } 
          }).map((data, index) => {
            return (
              <div className="container-news" key={index}>
              <div id="main-div">
                <div className="imagenews-class">
                  <img src={data.urlToImage} alt="news" />
                </div>

                <div className="titlenews-class">
                  <p>{data.title}</p>
                </div>

                <div className="source-name">
                  <p>{data.source.name}</p>
                </div>

                <div className="data">
                  <p>{data.publishedAt.split('T')[0]}</p>
                </div>

              </div>
            </div>
            )
          })
        }
        <div>
        
        </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
