import { useState, useEffect, ChangeEvent } from "react";
import Card from "./Card/Card";

interface CardItem {
    id: number;
    heading: string;
}

function SearchBar() {
    const [listCard, setListCard] = useState<string>("");
    const [cardItems, setCardItems] = useState<CardItem[]>([]);

    // Utiliser useEffect pour récupérer les todos lors du montage du composant
    useEffect(() => {
        async function fetchTodos() {
            try {
                const response = await fetch('http://localhost:5000/api/todos/all'); 
                const data = await response.json();
                const todos = data.map((todo: { id: number, name: string }) => ({ id: todo.id, heading: todo.name }));
                setCardItems(todos);
            } catch (error) {
                console.error('Erreur lors de la récupération des todos:', error);
            }
        }

        fetchTodos();
    }, []);

    function searchChangeText(e: ChangeEvent<HTMLInputElement>): void {
        setListCard(e.target.value);
    }

    async function addDataCard(): Promise<void> {
        const trimmedHeading = listCard.trim();

        if (trimmedHeading === "") {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/addTodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: trimmedHeading })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création du todo');
            }

            const newTodo = await response.json();
            console.log(newTodo);
            
            setCardItems((prevCardItems) => [
                ...prevCardItems,
                { id: newTodo.todoId, heading: newTodo.todoName }
            ]);

            setListCard("");
        } catch (error) {
            console.error(error);
        }
    }

    function removeCard(id: number): void {
        setCardItems((prevCardItems) => prevCardItems.filter(card => card.id !== id));
    }

    return (
        <>
            <div className="searchBar">
                <input
                    type="text"
                    onChange={searchChangeText}
                    value={listCard}
                    placeholder="Enter your List"
                />
                <button id="inputBtn" onClick={addDataCard}>
                    Add
                </button>
            </div>
            <div className="Cards">
                {cardItems.map((card, index) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        number={index + 1}
                        heading={card.heading}
                        onRemove={removeCard}
                    />
                ))}
            </div>
        </>
    );
}

export default SearchBar;
