import React, { useEffect, useState } from "react";
import Body from "./toDo";



//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState('');
	const [tasks, setTask] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null)
	const userName = "nael-dev";

	useEffect(() => {
		const fetchTasksandCreateUser = async () => {
			setLoading(true);
			try {

				const existUser = await fetch("https://playground.4geeks.com/todo/users?offset=0&limit=100");
					
				if (!existUser.ok) {
					throw new Error(`HTTP error! status: ${existUser.status}`);
				}
				const users = await existUser.json();
				
				const filterUser = users.users.find(user => user.name === userName);
			

				if (filterUser) {
					setUser(filterUser.name);
				} else {

					const createUser = await fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' }
					});
					if (!createUser.ok) {

						throw new Error('Error creating user');
					}


					setUser(userName);

				}
				

				//si todo falla,esto hay que dejarlo(cargar las tareas una vez ya se ha creado el usuario.)
				const response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`);
				const data = await response.json();
				setTask(data.todos);

			} catch (err) {
				setError("Error al cargar tareas");
				console.error(err);
			}
			setLoading(false);

		};

		fetchTasksandCreateUser();
	}, []);


	const handleChange = (e) => {
		setInputValue(e.target.value);


	}
	const addTask = async (e) => {
		e.preventDefault();
		if (!inputValue.trim()) return;

		try {
			setLoading(true);
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
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
				<h1>Bienvenido a la lista de tareas del usuario : {user}</h1>
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