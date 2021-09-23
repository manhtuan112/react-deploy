import React, { useState, useRef } from "react";
import "./style.css";
import {Button} from 'react-bootstrap';
const Listtodo = ({
  todo,
  setTodo,
  setEditing,
  setShowAdd,
  level,
  changeLevel,
  filterList,
  setFilterList,
}) => {
  const [sortType, setSortType] = useState("Id");
  const selectOption = ["Id", "Name", "Muc do"];
  // const [searchValue, setSearchValue] = useState("");
  const search = useRef(null);

  const [checkEmptyFilter, setCheckEmptyFilter] = useState(false);
  const [checkEmptyInputSearch, setCheckEmptyInputSearch] = useState(false);

  const setLevel = (value) => {
    if (value === "Nguy cấp")
      return (
        <div id="box" style={{ backgroundColor: "#f2271f" }}>
          {value}
        </div>
      );
    //can 2 {{}} de set style
    else if (value === "Chưa cần")
      return (
        <div id="box" style={{ backgroundColor: "#13b368" }}>
          {value}
        </div>
      );
    else
      return (
        <div id="box" style={{ backgroundColor: "#c5d85a" }}>
          {value}
        </div>
      );
  };

  const DeleteTodo = (value) => {
    todo = todo.filter((item) => item.id !== value);
    setTodo(todo);
    
  };

  const sorting = () => {
    if (sortType === "Id") {
      todo.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    } else if (sortType === "Name") {
      todo.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    } else {
      todo.sort((a, b) => {
        const indexA = level.findIndex((item) => item === a.level);
        const indexB = level.findIndex((item) => item === b.level);
        console.log(indexA, indexB);
        if (indexA > indexB) return 1;
        else if (indexA < indexB) return -1;
        else return 0; //them truong hop bang nhau de cac gia tri khong bi doi ngau nhieu
      });
    }
    setFilterList([...todo]);
  };

  const setStatus = (value) => {
    setEditing(value);
    setShowAdd(true);
  };

  const setOptionFilter = (index) => {
    if (index === "all") {
      setFilterList(todo);
      setCheckEmptyFilter(false);
    } else {
      index = level[index]; //lay gia tri can loc
      const filterTodo = todo.filter((item) => item.level === index);

      if (filterTodo.length === 0) setCheckEmptyFilter(true);
      else {
        setFilterList(filterTodo);
        setCheckEmptyFilter(false);
      }
    }
    setCheckEmptyInputSearch(false); //trong truong hop input search rong
  };

  const handleSearch = (e) => {
    search.current.value = search.current.value.trim();
    if (search.current.value.length === 0) {
      setCheckEmptyInputSearch(true); //kiem tra chuoi nhap vao co rong khong
    } else {
      const searching = search.current.value;
      const tmp = todo.filter((item) => {
        if (!isNaN(searching))
          //kiem tra gia tri do co la so khong
          return item.id === +searching;
        else
          return (
            item.name.includes(searching) || item.level.includes(searching)
          );
      });
      if (tmp.length === 0) setCheckEmptyFilter(true);
      else {
        setFilterList(tmp);
        setCheckEmptyFilter(false);
      }
      setCheckEmptyInputSearch(false); //bo lenh search trong
      search.current.value = "";
    }
  };

  return (
    <div>
      <select
        name="level"
        id="level"
        value={sortType}
        onChange={(e) => {
        setSortType(e.target.value);
        }}
      >
        {selectOption.map((select) => (
          <option value={select}>{select}</option>
        ))}
      </select>
      <button className="btn__sort" onClick={sorting}>
        Sắp xếp
      </button>
      <br />
      <input type="text" id="input__search" ref={search} />
      <button className="btn__search" onClick={handleSearch}>
        Tìm kiếm
      </button>
      <h5>{checkEmptyInputSearch ? "Không được để trống" : null}</h5>
      {todo.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Ten</th>
              <th>Muc do</th>
              <th>Thao tac</th>
            </tr>
          </thead>
          <tbody>
            {!checkEmptyFilter && !checkEmptyInputSearch
              ? filterList.map((val, index) => (
                  <tr key={`${val.id}`}>
                    <td scope="row">{index + 1}</td>
                    <td>{val.name}</td>
                    <td
                      onClick={() => {
                        changeLevel(val);
                      }}
                    >
                      {setLevel(val.level)}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          DeleteTodo(val.id);
                        }}
                      >
                        Xoa
                      </button>
                      <button onClick={() => setStatus(val)}>Sua</button>
                    </td>
                  </tr>
                ))
              : "Khong tim thay"}
          </tbody>
        </table>
      ) : (
        "Không có công việc"
      )}
      <div className="wr-filter">
        <span className="filter" onClick={() => setOptionFilter("all")}>
          Tat ca
        </span>
        {level.map((item, index) => (
          <span className="filter" onClick={() => setOptionFilter(index)}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Listtodo;
