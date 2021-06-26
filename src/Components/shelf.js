import React, { Component } from 'react'
import Book from './book.js'

export default class Shelf extends Component {
    render() {
        const { books , shelf_type , changeshelf } = this.props;
        return (
            <div>
                {/*<h1>ana shelf.jsx</h1>*/}
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{shelf_type}</h2>
                    <div className="bookshelf-books">   
                    {typeof(books) != "undefined" && books.length > 0 && (
                    <ol className="books-grid" key={shelf_type}>
                        {books.map((b) => (
                            <li key={b.id}>
                                <Book 
                                book = {b}
                                shelf_type = {shelf_type}
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
