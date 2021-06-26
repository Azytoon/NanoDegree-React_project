import React, { Component } from 'react'

export default class Book extends Component {
    render() {
        const { book , changeshelf } = this.props;
        //to make sure of book cover
        let default_image = null;
        if (typeof(book.imageLinks) === "undefined") { 
            default_image = "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
        }
        else {default_image = book.imageLinks.smallThumbnail;}
        //to make sure of book authors
        let book_authors = book.authors;
        if (book_authors === "undefined") book_authors = "undefined author";
        //to set default of shelf_type to none
        //let book_shelf = book.shelf;
        console.log(book.shelf);
        return (
            <div>
                {/*<h1>ano book.jsx</h1>*/}
                    <div className="book">
                        <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+default_image+')' }}></div>
                        <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(e) => changeshelf(book, e.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book_authors}Harper Lee</div>
                    </div>
            </div>
        )
    }
}
