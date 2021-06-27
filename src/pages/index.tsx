import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import useStore, { Todo } from "../store";

const INITIAL_TODO: Omit<Todo, "id"> = {
  title: "",
  isCompleted: false,
};

export default function Home() {
  const [newTodo, setNewTodo] = useState(INITIAL_TODO);

  const todos = useStore((state) => state.todos);
  const createTodo = useStore((state) => state.createTodo);
  const deleteTodo = useStore((state) => state.deleteTodo);
  const updateTodo = useStore((state) => state.updateTodo);

  function handleChange(e) {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const todo = { ...newTodo, id: uuid() };
    createTodo(todo);
    setNewTodo(INITIAL_TODO);
  }

  return (
    <Box px={4} py={5}>
      <form onSubmit={handleSubmit}>
        <Input
          required
          type="text"
          name="title"
          value={newTodo.title}
          onChange={handleChange}
          placeholder="Todo"
          mb={4}
        />
        <Button type="submit" colorScheme="cyan">
          Add todo
        </Button>
      </form>

      <Box mt={4}>
        {todos.map((todo) => (
          <div key={todo.id}>
            <Text
              fontSize="xl"
              mb={2}
              textDecoration={todo.isCompleted ? "line-through" : "none"}
            >
              {todo.title}
            </Text>
            <Button
              mr={2}
              onClick={() =>
                updateTodo({ ...todo, isCompleted: !todo.isCompleted })
              }
            >
              {todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}
            </Button>
            <Button
              colorScheme="red"
              disabled={!todo.isCompleted}
              onClick={() => deleteTodo(todo)}
            >
              Remove
            </Button>
          </div>
        ))}
      </Box>
    </Box>
  );
}
