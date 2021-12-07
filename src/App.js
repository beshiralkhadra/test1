import "./App.css";
import React, { useState } from "react";
import JsonData from "./MOCK_DATA.json";
import ReactPaginate from "react-paginate";

function App() {
  const [users, setUsers] = useState(JsonData);
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .filter((val) => {
      if (search == "") {
        return val;
      } else if (
        val.firstName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      ) {
        return val;
      }
    })
    .map((user) => {
      return (
        <div className="user">
          <h3>{user.firstName}</h3>
          <h3>{user.lastName}</h3>
          <h3>{user.email}</h3>
        </div>
      );
    });

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="App">
      <input
        placeholder="search"
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <select
        className="data-selection"
        onChange={(e) => setSort(e.target.value)}
      >
        <option>select</option>
        <option value={"Phineas"}>Phineas</option>
        <option value={"Mikel"}>Mikel</option>
      </select>س
      {displayUsers}
      {/* //react paginate component contain object called selected */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default App;
