import React, { useState, useRef, useEffect } from "react";
import "./style.css";



const AddNewTodo = ({
  todo,
  setTodo,
  setShowAdd,
  setEditing,
  editing,
  level,
  setFilterList
}) => {
  const [newTodo, setNewTodo] = useState({
    id: 0,
    name: "",
    level: "Nguy cấp",
  });


  const [alert, setAlert] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const onChangeTodo = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  // const name = useRef("")
  // const level = useRef("")
  // const [state, setState] = useState(1)

  // useEffect(() => {
  //     // nhung thu muon thuc hien lam o day
  //     //thuc hien khi ham componnet xuat hien(neu ko co mang gi dang sau)
  //     console.log("Tuan")
  //     return () => {
  //         //lam sach cac phan du lieu khong dung nua
  //         //Thuc hien khi components khong hien nua(neu khong co mang gi dang sau)
  //         //it dung
  //         console.log("Bo")
  //     };
  // });

  useEffect(() => {
    if (editing !== null) {
      setNewTodo(editing);
      setIsEdit(true);
    }
  }, [editing]);

  const addNewTodo = (e) => {
    // const newTodo = {
    //     id: choiceId,
    //     name: name.current.value,
    //     level: level.current.value
    // }
    
    // console.log(id.current)
    if (newTodo.name !== "") {
      newTodo.id = "id" + Math.random().toString(16).slice(2);
      setTodo([...todo,newTodo])
      setAlert(false);
      setShowAdd(false);
    } else {
      setAlert(true);
    }
    // name.current.value = ""
    // level.current.value = "0"
    // if (newTodo.name !== ""){
    //     newTodo.id = todo[todo.length-1].id + 1
    //     setTodo([...todo, newTodo])
    // }
    // console.log(newTodo)
  };
  // console.log(id.current)

  const handleEdit = () => {
    const index = todo.findIndex((item) => item.id === newTodo.id);
    todo[index] = newTodo;
    setTodo([...todo]);
    setNewTodo({
      id: 0,
      name: "",
      level: "Nguy cấp",
    });
    setIsEdit(false);
    setEditing(null);
  };

  const setStatus = () => {
    setShowAdd(false);
    setIsEdit(false);
    setEditing(null);
  };

  return (
    <div id="AddTodo">
      <h4>{isEdit ? "Sửa công việc" : "Thêm công việc mới"}</h4>
      <label>Thêm công việc</label>
      <br />
      <input
        type="text"
        name="name"
        value={newTodo.name}
        onChange={onChangeTodo}
      />
      <br />
      <h6>{alert ? "Tên công việc không được để trống" : null}</h6>
      <label>Muc do cong viec</label>
      <br />
      <select name="level" value={newTodo.level} onChange={onChangeTodo}>
        {level.map((level) => (
          <>
            <option value={level}>{level}</option>
          </>
        ))}
      </select>
      <br />
      <button id="add" onClick={isEdit ? handleEdit : addNewTodo}>
        {isEdit ? "SỬA" : "THÊM"}
      </button>
      <button id="cancel" onClick={setStatus}>
        Hủy bỏ
      </button>
    </div>
  );
};

export default AddNewTodo;
