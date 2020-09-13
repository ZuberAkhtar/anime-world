import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import { Header } from './components/header/header.component';
import { Button } from './components/button/button.component';
import { setAnimeList } from './redux/anime/anime-actions';
import { scrollToTop } from './App.util';
import network from './network/network';
import ReactLoading from 'react-loading';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary.component'
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchField: "",
      limit: 10,
      disable: false,
      loading: false,
    }
  }

  componentDidMount() {
    this.handleApiCall()
  }

  /**
   * @desc Check the if the all titles are loaded
   * @param {*} data 
   */

  checkData = (data) => {
    const { animeList } = this.props
    if (animeList.length === data.length) {
      this.setState({
        disable: true
      })
    } else {
      this.setState({
        disable: false
      })
    }
  }

  /**
   * @desc Handle the API calls on the basis of type user action
   * @param {*} searchValue 
   * @param {*} limit 
   */
  handleApiCall = (searchValue, limit) => {
    const { setAnimeList } = this.props
    this.setState({
      loading: true
    })
    if (searchValue) {
      const noSpaceSearchValue = searchValue.replace(/\s/g, "")
      network.getSearchResult({ searchValue: noSpaceSearchValue, limit })
        .then(response => response.json())
        .then(data => {
          this.setState({
            loading: false
          })
          if (data.results) {
            this.checkData(data.results)
            setAnimeList(data.results)
          }
        })
        .catch(error => {
          this.setState({
            loading: false
          })
          console.log("Error : ", error)
        })
    } else {
      network.getTopResult()
        .then(response => response.json())
        .then(data => {
          this.setState({
            loading: false
          })
          if (data.top) {
            this.checkData(data.top)
            setAnimeList(data.top)
          }
        })
        .catch(error => {
          this.setState({
            loading: false
          })
          console.log("Error : ", error)
        })
    }
  }


/**
 * @desc Change the search value  
 * @param {*} e 
 */
  handleChange = (e) => {
    this.setState({
      searchField: e.target.value,
      limit: 10,
      disable: false
    }, () => {
      if (!this.state.searchField) {
        this.handleApiCall()
        scrollToTop()
      }
    })
  }

  /**
   * @desc action handler when user hit enter on the search field
   * @param {*} e 
   */
  handleSubmit = (e) => {
    if (e.key === 'Enter') {
      this.handleApiCall(this.state.searchField, this.state.limit)
      scrollToTop()
    }
  }

  /**
   * @desc action handler when user click on Load More button
   * @param {*} e 
   */
  handleLoadMore = (e) => {
    this.setState(prevState => {
      return { limit: prevState.limit + 10 }
    }, () => {
      if (this.state.limit > 10) {
        this.handleApiCall(this.state.searchField, this.state.limit)
      }
    })
  }
  render() {
    const { animeList } = this.props
    const { disable, loading } = this.state
    return (
      <div className="App">
        <Header>
          <h1 className='title'>Anime World</h1>
          <SearchBox
            placeholder="Search Anime"
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          {loading &&
            <ReactLoading
              type='spinningBubbles'
              style={{
                fill: 'rgb(12, 139, 202)',
                height: 64,
                width: 64,
                left: 0,
                right: 0,
                margin: 'auto',
              }}
            />
          }
        </Header>
        <ErrorBoundary>
          <CardList animeList={animeList} />
          <Button
            text="Load More"
            handleClick={this.handleLoadMore}
            disable={disable}
          />
        </ErrorBoundary>    
      </div>
    );
  }

}


App.propTypes = {
  animeList: PropTypes.array,
  setAnimeList: PropTypes.func,
}

App.defaultProps = {
  animeList: [],
}

const mapStateToProps = state => ({
  animeList: state.animes.animeList
});

const mapDispatchToProps = dispatch => ({
  setAnimeList: animes => dispatch(setAnimeList(animes))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
