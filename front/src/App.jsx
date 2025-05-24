import { useEffect, useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const useref = useRef(null);
  console.log(useRef())

  useEffect(() => {
    getdata();
  }, [])
  

  const adddata = async () => {
    const name = useref.current.value;
    if (name === "") {
      useref.current.focus();
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      });

      const data = await res.json();
      
      if (res.ok) {
        setName("");
        getdata();
      } else {
        alert("Failed to add data");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getdata = async() => {
    try {
      const res = await fetch("http://localhost:3000/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json();
      if (data) {
        setData(data);
      }
      else {
        alert("No data found");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const deldata = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/data", {
        method: "Delete",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: data.name }),
      })

      if (res.ok) {
        getdata();
      }
      else{
        console.log("not found");
      }
    } catch (e) {
      console.log(e)
    }
  }

  const update = async (data) => {
    const name = useref.current.value;
    if (name === "") {
      useref.current.focus();
      return;
    }
    try {
      const res=await fetch("http://localhost:3000/data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data:data.name,new:name }),
      })

      if (res.ok) {
        getdata();
        setName("");
      } else {
        console.log("update failed");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <h1>TODO LIST</h1>
      <input type="text" ref={useref} value={ name } placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
      <button onClick={adddata}>Add</button>
      {data.map((data) => (
        <li type="1" key={data._id}>
          <span>{`${data.name} : ${ data.count} `}</span>
          <div className="buttons">
            <button onClick={() => deldata(data)}>delete</button>
            <button onClick={() => update(data)}>update</button>
          </div>
        </li>
      ))}
    </>
  );
};

export default App;
