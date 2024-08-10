import { FC, useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import debounce from "lodash.debounce";

import { NewTaskWrapper } from "./NewTask.styled";

import { getErrorMsg } from "../../config";
import { addTodoService } from "../../services/todoService";
import { fetchUsersService } from "../../services/userService";
import { OptionType } from "../../utils/interfaces";

interface NewTaskProps {}

const NewTask: FC<NewTaskProps> = () => {
  const [text, setText] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [taskDate, setTaskDate] = useState<string>("");
  const [options, setOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

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
          setInputValue("");
          setErrors({
            text: "",
            assignedBy: "",
            userId: "",
            taskDate: "",
          });
        } else {
          alert(res.message);
        }
      })
      .catch((e) => {
        alert(getErrorMsg(e.message));
      });
  };

  const fetchOptions = async (query: string) => {
    setLoading(true);
    fetchUsersService()
      .then((res) => {
        if (res.status === "success") {
          res.data &&
            setOptions(
              res.data.map((item: any) => ({
                label: item.username,
                value: item._id,
              }))
            );
        } else {
          alert(res.message);
        }
      })
      .catch((e) => {
        alert(getErrorMsg(e.message));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {}, []);

  // Debounced version of fetchOptions to avoid excessive API calls
  const debouncedFetchOptions = useMemo(() => debounce(fetchOptions, 500), []);

  useEffect(() => {
    if (inputValue) {
      debouncedFetchOptions(inputValue);
    } else {
      setOptions([]);
    }
  }, [inputValue, debouncedFetchOptions]);

  const handleChange = (
    event: React.SyntheticEvent,
    value: OptionType | null
  ) => {
    if (value) {
      setUserId(value.value);
    }
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
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label}
            filterOptions={(x) => x} // Disable built-in filtering to rely entirely on API search
            renderInput={(params) => (
              <TextField
                {...params}
                label="Assigned To"
                variant="outlined"
                onChange={(e) => setInputValue(e.target.value)}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                error={Boolean(errors.userId)}
                helperText={errors.userId}
              />
            )}
            onChange={handleChange}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            loading={loading}
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
