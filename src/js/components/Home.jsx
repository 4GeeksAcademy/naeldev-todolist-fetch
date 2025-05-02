import React, { useState } from "react";
import Body from "./toDo";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState('');
	const [tasks, setTask] = useState([]);
	let count =tasks.length;

	const handleChange = (e) => {
		setInputValue(e.target.value);
		
		
	}
	const addTask = (e) => {
		const limite=10;
		e.preventDefault();
		if(inputValue.trim()=== ''){
			alert('Debe contener un valor')
			return;
		}

		if(tasks.length < limite){
			setTask([...tasks, inputValue]);
			setInputValue('');
		} else{
			alert("No puedes tener tantas tareas pendientes, termina o elimina una para agregar otra")
		}
		
		
	
	}
	const deleteTask=(index) =>{
		const newTasks = tasks.filter((_, i) => i !== index);
        setTask(newTasks);
		
	}
	
	
	


	return (
		<>
			<div className=" text-center container-fluid m-5 p-2">
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
					{tasks.map((task, index) => (
						
						<div key={index} className="text-center p-2 d-flex align-items-center">
						<input 
							className="form-check-input me-2" 
							type="checkbox" 
							value="" 
						/>
						<span className="flex-grow-1 text-center">
							{task}
						</span>
						<button
							onClick={() => deleteTask(index)}
							type="button"
							className="btn boton">
							x
						</button>
					</div>

					))}



				</div>
				<div>
					{count === 0 ? "No hay tareas pendientes, añadir tareas" : `${count} tareas pendientes`}

				</div>
			</div>




		</>
	)

};

export default Home;