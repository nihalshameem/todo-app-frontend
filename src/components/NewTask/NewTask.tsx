import { FC, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { NewTaskWrapper } from "./NewTask.styled";

import { getErrorMsg } from "../../config";
import { addTodoService } from "../../services/todoService";

interface NewTaskProps {}

const NewTask: FC<NewTaskProps> = () => {
  const [text, setText] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [taskDate, setTaskDate] = useState<string>("");

  const [errors, setErrors] = useState({
    text: "",
    assignedBy: "",
    userId: "",
    taskDate: "",
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {
      text: "",
      assignedBy: "",
      userId: "",
      taskDate: "",
    };

    if (!text) {
      newErrors.text = "Task description is required.";
      isValid = false;
    }

    if (!userId) {
      newErrors.userId = "User ID is required.";
      isValid = false;
    }

    if (!taskDate) {
      newErrors.taskDate = "Task date is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addTodo = async () => {
    if (!validate()) return;

    addTodoService({ text: text, user_id: userId, task_date: taskDate })
      .then((res) => {
        if (res.status === "success") {
          setText("");
          setUserId("");
          setTaskDate("");
          setErrors({
            text: "",
            assignedBy: "",
            userId: "",
            taskDate: "",
          });
          alert(res.message);
        } else {
          alert(res.message);
        }
      })
      .catch((e) => {
        alert(getErrorMsg(e.message));
      });
  };

  return (
    <NewTaskWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          New Task
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <TextField
            label="Task Description"
            variant="outlined"
            margin="normal"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            error={Boolean(errors.text)}
            helperText={errors.text}
          />
          <TextField
            label="Assigned To"
            variant="outlined"
            margin="normal"
            fullWidth
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            error={Boolean(errors.userId)}
            helperText={errors.userId}
          />
          <TextField
            label="Task Date"
            type="date"
            variant="outlined"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            error={Boolean(errors.taskDate)}
            helperText={errors.taskDate}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Task
          </Button>
        </Box>
      </Box>
    </NewTaskWrapper>
  );
};

export default NewTask;
