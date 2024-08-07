import { Link } from "react-router-dom";

export function Header() {
    return (
        <nav data-bs-theme="dark" className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Todo App React
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="d-flex ms-auto gap-2">
                        <Link to="/register" className="btn btn-primary">Register</Link>
                        <Link to="/log-in" className="btn btn-success">Log In</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
