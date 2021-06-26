import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Shelf from './shelf';

export default class HomePage extends Component {
    render() {
        const { books , changeshelf , refresh } = this.props;
        const cr_books = books.filter((b) => b.shelf === "currentlyReading");
        const wtr_books = books.filter((b) => b.shelf === "wantToRead");
        const r_books = books.filter((b) => b.shelf === "read");
        return (
            <div>
                {/*<h1>ana HomePage</h1>*/}
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <Shelf
                        shelf_type = "Currently Reading"
                        books = {cr_books}
                        changeshelf = {changeshelf}
                        />
                        <Shelf
                        shelf_type = "Want to Read"
                        books = {wtr_books}
                        changeshelf = {changeshelf}
                        />
                        <Shelf
                        shelf_type = "Read"
                        books = {r_books}
                        changeshelf = {changeshelf}
                        />
                    </div>
                    <div className="open-search">
                        {/*<button onClick={Click}>Add a book</button>*/}
                        <Link className="search_shiaka" onClick = {refresh} to="/search"/>
                    </div>
                </div>
            </div>
        )
    }
}