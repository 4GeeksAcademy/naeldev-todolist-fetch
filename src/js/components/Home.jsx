import React, { useEffect, useState } from "react";
import Body from "./toDo";



//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState('');
	const [tasks, setTask] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const username = "nael-dev";

	useEffect(() => {
		const fetchTasks = async () => {
			setLoading(true);
			try { 
				const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`);
				const data = await response.json();
				setTask(data.todos);
			} catch (err) {
				setError("Error al cargar tareas");
				console.error(err);
			}
			setLoading(false);

		};

		fetchTasks();
	}, [username]);


	const handleChange = (e) => {
		setInputValue(e.target.value);


	}
	const addTask = async (e) => {
		e.preventDefault();
		if (!inputValue.trim()) return;

		try {
			setLoading(true);
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ label: inputValue })
			});
			const newTask = await response.json();
			setTask([...tasks, newTask]);
			setInputValue('');
		} catch (error) {
			console.error("Error adding task:", error);
		}
		
		setLoading(false)
	}



	const deleteTask = async (taskId) => {
		try {
			setLoading(true);
			await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
				method: "DELETE"
			});
			setTask(tasks.filter(task => task.id !== taskId));
		} catch (error) {
			setError("Error al eliminar tarea");
			console.error(error);
		}
		setLoading(false);
	};

	if (loading) return <div>Cargando...</div>;
	if (error) return <div className="text-danger">{error}</div>;


	return (
		<>
			<div className=" text-center container-fluid m-5 p-2">
			<h1>Bienvenido a la lista de tareas del usuario : {username}</h1>
				<div className=" d-flex justify-content-center ">
				
					<h1 className="center">To DoS...</h1>
				</div>
			</div>
			<div className="post-it">
				<Body
					handleChange={handleChange}
					value={inputValue}
					addTask={addTask}
				/>
				<div className="mt-3 text-center">
					{tasks.map((task) => (

						<div key={task.id} className="text-center p-2 d-flex align-items-center">
							<input
								className="form-check-input me-2"
								type="checkbox"
								

							/>
							<span className="flex-grow-1 text-center">
								{task.label}
							</span>
							<button
								onClick={() => deleteTask(task.id)}
								type="button"
								className="btn boton">
								x
							</button>
						</div>

					))}



				</div>
				<div>
					{tasks.length === 0 ? "No hay tareas pendientes" :
						`${tasks.length} tarea${tasks.length !== 1 ? 's' : ''} en la lista`}


				</div>
			</div>




		</>
	);


};

export default Home;