import React from 'react'
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
//import axios from "axios";
import './App.css'
import SearchPage from './Components/SearchPage.js';
import HomePage from './Components/HomePage.js';
import NotFound from './Components/NotFound.js';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    search_books: []
    //showSearchPage: false
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }
  checkEquality(){
    //if (this.state.search_books.length >= 0 ){
      let state_books = [...this.state.books];
      let search_bks = [];
      if (this.state.search_books.length > 0) search_bks = [...this.state.search_books];
      for (let i = 0; i < search_bks.length; i++) {
        for (let j = 0; j < state_books.length; j++) {
          //console.log("search_bks[i].title--> "+search_bks[i].title);
          //console.log("state_books[j].title--> "+state_books[j].title);
          if(search_bks[i].title === state_books[j].title && search_bks[i].subtitle === state_books[j].subtitle && search_bks[i].pageCount === state_books[j].pageCount){
            search_bks[i].shelf = state_books[j].shelf;
            //console.log("goooowaaaaaaaaa");
            break;
          }
          else {search_bks[i].shelf = "none"}
        }
      }
      return search_bks;
  }
  handlesearch = (query) => {  
    if (query !== "") {
      BooksAPI.search(query)
      .then((search_books) => {
        this.setState(() => ({
          search_books
        }))
      })
    }
    else {
      this.setState({ search_books : [] });
    }  
    //console.log(query);
    //console.log(this.state.search_books); 
  }

  home_handlerefresh = () => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    });
    this.checkEquality();
    //console.log("ana home refresh");
  }
  search_handlerefresh = () => {
    this.setState({ search_books : [] });
    //console.log("ana serach refresh");
  }
  handleChange = (book,shelf) => {    
    BooksAPI.update(book,shelf);
    //console.log('Click happened'); 
    //Clone
    let books = [...this.state.books];
    let index = this.state.books.indexOf(book);
    //console.log('index = ',index);
    //console.log(this.state.books.length);
    if (index === -1) {
      /*this.setState(prevState => ({
        books: [...prevState.books, book]
      }))*/
      //console.log('gowa');
      books = [...this.state.books , book ];
      this.setState({ books });
      this.home_handlerefresh();
      //console.log(this.state.books);
    }
    else {
    books[index] = { ...books[index] };
    //Edit
    books[index].shelf = shelf;
    //Set State
    this.setState({ books });
    }
    //this.handlerefresh();
    /*
    this.setState(prevState => ({
      showSearchPage: !prevState.showSearchPage
    }));
    */
  };
  render() {
    //console.log('ana hamo');
    //console.log(this.state.books);
    //console.log('ahamo');
    return (
      <BrowserRouter>
        <React.Fragment>
          <div className="app">
          <Switch>
            <Route
                path="/"
                exact
                render={() => (
                  <HomePage
                    books = {this.state.books}
                    changeshelf = {this.handleChange}
                    refresh = {this.search_handlerefresh}
                  />
              )}
            />
            <Route
                path="/search"
                exact
                render={() => (
                  <SearchPage
                    books = {this.checkEquality()}
                    changeshelf = {this.handleChange}
                    handlesearch = {this.handlesearch}
                    refresh = {this.home_handlerefresh}
                  />
              )}
            />
            
            <Redirect from="/home" exact to="/"/>
            <Route path="/notfound" component={NotFound} />
            <Redirect to="/notfound" />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default BooksApp
