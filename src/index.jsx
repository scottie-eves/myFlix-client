import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

// Import statement to indicate that you need to bundle the index.scss file
import "./index.scss";

// this will be the main component. (and will eventually use all the others)
const MyFlixApplication = () => {
    return (
        <div className="my-flix">
            <MainView />
        </div>
    );
};

// finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// tells react to render the app in the root DOM element
root.render(<MyFlixApplication />);