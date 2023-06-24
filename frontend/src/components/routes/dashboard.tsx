/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuth } from "../auth/authProvider";
import { API_URL } from "../auth/constans";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
interface Todo {
    _id: string;
    title: string;
    completed: boolean;
    idUser: string;
}

export default function Dashboard() {
    const auth = useAuth();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");
    useEffect(() => {
        loadTodos();
    },[]);

    async function loadTodos() {
        try {
            const response = await fetch(`${API_URL}/todos`, {
                headers: {
                    method: "POST",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                }
            });
            if (response.ok) {
                const json = await response.json();
                setTodos(json);
            } else {
                console.log("Error de coneccion.");
                
            }
        const json = await response.json();
            setTodos(json);
        } catch (error) {
            console.log(error);
        }
    }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        createTodo();
    }
    async function createTodo() {
        try {
            const response = await fetch(`${API_URL}/todos`, {
                headers: {
                    method: "POST",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                },
                body: JSON.stringify({
                title,
            })
            });
            if (response.ok) {
                const json = await response.json();
                setTodos([json, ...todos]);
            } else {
                console.log("Error de coneccion.");
                
            }
        const json = await response.json();
            setTodos(json);
        } catch (error) {
            //console.log(error);
        }
    }

    return (
        <div className="callout overflow-hidden text-center">
            <h1>Dashboard of {auth.getUser()?.firstName || ""} {auth.getUser()?.lastName || ""}.</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">New Todo.</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Nuevo todo..." onChange={(e) => setTitle(e.target.value)}
                    value={title} />
                </div>
            </form>
            <p>
                {todos.map((todo) => (
                    <div key={todo._id}>{todo.title}</div>
                ))}
            </p>
        </div>
    )
}