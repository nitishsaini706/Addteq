import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask, addTask, updateTask } from '../handler/TaskHandler';
import { Button, Form, ListGroup, Container, Row, Col, InputGroup, Toast } from 'react-bootstrap';
import EditTask from './EditTask';

export default function TaskList() {
    // State for managing tasks list
    const [tasks, setTasks] = useState([]);
    // State to control the visibility of the edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    // State for storing the current task to edit
    const [currentTask, setCurrentTask] = useState({});
    // State for managing the input of a new or updated task
    const [updateInput, setUpdateInput] = useState('');
    // State to control the visibility of the toast notification
    const [show, setShow] = useState(false);

    // Function to toggle the visibility of the toast notification
    const toggleShow = () => setShow(!show);

    useEffect(() => {
        // Async function to fetch tasks from an API and handle errors
        const getData = async () => {
            try {
                const data = await fetchTasks();
                return data;
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        // Function to call getData and update the tasks state with fetched data
        const fetchData = async () => {
            const data = await getData();
            if (data) {
                setTasks(data.data);
            }
        };

        // Call fetchData when the component mounts
        fetchData();
    }, []);

    // Function to open the edit modal with the selected task
    const handleEditClick = (task) => {
        setCurrentTask(task);
        setShowEditModal(true);
    };

    // Function to save the updated task and close the edit modal
    const saveTask = (taskId, newTitle) => {
        const body = {
            id: taskId,
            title: newTitle
        };
        updateTask(body).then((res) => {
            if (res.status) {
                const data = res.data.data;
                setTasks(data);
                setShow(true);
                setUpdateInput('');
            }
        }).catch((e) => {
            console.log(e);
        });
        setShowEditModal(false);
    };

    // Function to add a new task
    const add = async () => {
        if (!updateInput.trim()) return;
        const newTask = {
            title: updateInput,
        };
        addTask(newTask).then((res) => {
            if (res.status) {
                const data = res.data.data;
                setTasks(data);
                setShow(true);
                setUpdateInput('');
            }
        }).catch((e) => {
            console.log(e);
        });
    };

    // Function to delete a task
    const taskDelete = async (taskId) => {
        const body = { id: taskId };
        deleteTask(body).then((res) => {
            if (res.status) {
                const list = res.data.data;
                setTasks(list);
                setShow(true);
            }
        }).catch((e) => {
            console.log(e);
        });
    };

    return (
        <>
            {/* Edit Task Modal Component */}
            <EditTask
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                task={currentTask}
                saveTask={saveTask}
            />
            {/* Toast Notification for feedback */}
            <Toast show={show} onClose={toggleShow} position={"top-end"} bg={"danger"} style={{ zIndex: 1, display: "flex", justifyContent: "center", width: "150px", position: "absolute", top: "5px", left: "1300px" }} autohide>
                <Toast.Header>
                    <strong>Done successfully</strong>
                </Toast.Header>
            </Toast>
            {/* Task List Container */}
            <Container style={{ marginTop: "100px" }}>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8}>
                        {/* Form for adding a new task */}
                        <Form onSubmit={add}>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    value={updateInput}
                                    onChange={(e) => setUpdateInput(e.target.value)}
                                    placeholder="Add a new task"
                                />
                                <Button variant="primary" type="submit">
                                    Add Task
                                </Button>
                            </InputGroup>
                        </Form>
                        {/* List of tasks */}
                        {tasks?.length ? (
                            <ListGroup>
                                {tasks?.map((task, index) => (
                                    <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
                                        <span style={{ maxWidth: "70%", overflow: "scroll" }} key={index}><b>Title: </b>{task.title}</span>
                                        <div>
                                            {/* Edit and Delete buttons for each task */}
                                            <Button variant="info" style={{ marginRight: "5px" }} onClick={() => handleEditClick(task)}>Edit</Button>
                                            <Button variant="danger" onClick={() => taskDelete(task.id)}>Delete</Button>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <h1>No Tasks Present, Start Adding tasks</h1>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}
