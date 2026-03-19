function About() {
    return (
        <section id="about">
            <h2>About this application!</h2>
            <p>
                This project is a Single Page Application (SPA) built entirely with React. It serves as a 
                practical demonstration of modern front-end development techniques.
            </p>

            <h3>Key Features:</h3>
            <ul style={{ lineHeight: '1.8', textAlign: 'left' }}>
                <li>
                <strong>Client-Side Routing:</strong> Powered by React Router, navigating between pages 
                is instant and doesn't require the browser to fetch a new HTML document.
                </li>
                <li>
                <strong>State Management:</strong> The Contact page features a fully controlled form, 
                utilizing React's <code>useState</code> hook to manage user input efficiently.
                </li>
                <li>
                <strong>Component Architecture:</strong> The user interface is cleanly divided into 
                modular, functional components.
                </li>
            </ul>
        </section>
    );
}

export default About;