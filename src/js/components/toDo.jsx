import React, { useState } from "react";

const Body = ({handleChange, inputValue,addTask}) => {
    return (
        <div className="container-fluid text-center ">
            <form onSubmit={addTask}>
            
                <input 
                    type="text"
                    value={inputValue} 
                    placeholder="Ingresa la tarea"
                    onChange={handleChange}
                    className="form-control me-2"
                    maxLength={120}
                />
        
                

            </form>
            </div>


        
    )
}

export default Body



