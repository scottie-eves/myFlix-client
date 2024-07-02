import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://flix-vault-253ef352783e.herokuapp.com/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data)
}).then((response) => {
    if (response.ok) {
        onLoggedIn(username);
    } else {
        alert("Login Failed");
    }
});
};

    return (
        <Form onSubmit={handleSubmit} action="/">
        <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
            />
        </Form.Group>

        <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    );
};