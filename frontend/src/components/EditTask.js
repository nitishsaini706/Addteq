import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditTask = ({ show, onHide, task, saveTask }) => {
    console.log('task', task)
    const [title, setTitle] = useState(task.title);

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSave = () => {
        saveTask(task.id, title);
        onHide(); // Close the modal
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label><b>Task Title</b>: {task.title}</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={handleChange}
                            placeholder="Enter task title"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTask;
