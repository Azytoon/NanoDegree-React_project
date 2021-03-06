import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Book from './book.js'



    
export default class SearchPage extends Component {
    render() {
        const { books , changeshelf , handlesearch , refresh } = this.props;
        return (
            <div>
                {/*<br /><br /><h1>ana SearchPage</h1>*/}
                <div className="search-books">
                    <div className="search-books-bar">
                    {/*<button className="close-search" onClick={Click}>Close</button>*/}
                    <Link className="close-search" onClick = {refresh} to="/"/>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                        type="text" 
                        placeholder="Search by title or author"
                        onChange={(e) => handlesearch(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="search-books-results">
                        {typeof(books) != "undefined" && books.length > 0 && (
                        <ol className="books-grid">
                            {books.map((b) => (
                                    <li key={b.id}>
                                        <Book 
                                        book = {b}
                                        changeshelf = {changeshelf}
                                        />
                                    </li>
                                ))}
                        </ol>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
