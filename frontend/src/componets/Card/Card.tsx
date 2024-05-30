import React, { useState } from "react";

interface CardProps {
  id: number;
  heading: string;
  number: number;
  onRemove: (id: number) => void; // Callback to remove card from parent state
}

const Card: React.FC<CardProps> = ({ id, heading, number, onRemove }) => {
  const [done, setDone] = useState<"pending" | "Complete">("pending");
  const [card, setCard] = useState<boolean>(true);

  async function updateStatus() {
    const newStatus = done === "pending" ? "Complete" : "pending";
    try {
      const response = await fetch(`http://localhost:5000/api/updateTodo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: newStatus === "Complete" })
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      setDone(newStatus);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  async function handleRemoveCard() {
    try {
      const response = await fetch(`http://localhost:5000/api/delTodo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setCard(false);
      onRemove(id); // Notify parent to remove card from state
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  if (card) {
    return (
      <div className="Card">
        <h2>
          {number} : {heading}
        </h2>
        <h3>Status: {done}</h3>
        <button className="btn" onClick={updateStatus}>
          Update Status
        </button>
        <button className="btn" onClick={handleRemoveCard}>
          Remove
        </button>
      </div>
    );
  }

  return null;
};

export default Card;
