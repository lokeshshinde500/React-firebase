import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,  
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase";

export default function Todo() {
  const [user, setUser] = useState({
    todo: "",
    password: "",
  });

  const [editId, setEditId] = useState(null);

  const [todoList, setTodoList] = useState([]);

  const todoCollection = collection(db, "react");

  // post data in firebase
  async function handleSubmit(e) {
    e.preventDefault();

    if (editId) {
      try {
        const data = doc(todoCollection, editId);
        await updateDoc(data, { todo: user.todo, password: user.password });
        getData();
        console.log("Document successfully updated!");
        setEditId(null);
        setUser({ todo: "", password: "" });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      try {
        await addDoc(todoCollection, {
          todo: user.todo,
          password: user.password,
        });
        alert("data added to firebase");
        setUser({ todo: "", password: "" });
        getData();
      } catch (error) {
        console.log("something wrong");
      }
    }
  }

  // Get / View data to firebase
  async function getData() {
    const data = await getDocs(todoCollection);
    setTodoList(data.docs.map((v) => ({ ...v.data(), id: v.id })));
  }

  useEffect(() => {
    getData();
  }, []);

  // delete data
  async function handleDelete(id) {
    const data = doc(todoCollection, id);
    await deleteDoc(data);
    setTodoList(todoList.filter((v) => v.id !== id));
  }

  // Update data
  async function handleUpdate(item) {
    setUser({ todo: item.todo, password: item.password });
    setEditId(item.id);
  }

  return (
    <>
      <section>
        <div className="form-item p-5 ">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-2">
              <input
                className="border-2 border-black outline-none px-2"
                type="text"
                value={user.todo}
                onChange={(e) => setUser({ ...user, todo: e.target.value })}
                placeholder="Enter Todo"
              />
            </div>
            <div className="input-group mb-2">
              <input
                className="border-2 border-black outline-none px-2"
                type="text"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter Password"
              />
            </div>
            <div className="submit-btn">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                type="submit"
              >
                {editId ? "UPDATE" : "ADD"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            {todoList.map((v) => {
              return (
                <>
                  <div className="col-span-5">
                    <div className="todo-item bg-green-400 m-2 p-2">
                      <h2>{v.id}</h2>
                      <h2>{v.todo}</h2>
                      <h2>{v.password}</h2>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded m-1"
                        type="button"
                        onClick={() => handleDelete(v.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded m-1"
                        type="button"
                        onClick={() => handleUpdate(v)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
