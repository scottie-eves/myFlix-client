import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from "react-bootstrap/Container";
import "./index.scss";

// this will be the main component. (and will eventually use all the others)
const MyFlixApplication = () => {
    return (
        <Container>
            <MainView />
        </Container>
    );
};

// finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// tells react to render the app in the root DOM element
root.render(<MyFlixApplication />);