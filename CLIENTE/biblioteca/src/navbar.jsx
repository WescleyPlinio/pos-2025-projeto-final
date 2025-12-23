export function Navbar() {
    return (
        <div className="container">
            <a className="navbar-brand" href="#">
                <i className="bi bi-bootstrap-fill me-2"></i>Meu Site
            </a>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Sobre</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Contato</a>
                    </li>
                    <li className="nav-item">
                        <a className="btn btn-light ms-2" href="#">
                            <i className="bi bi-box-arrow-in-right me-1"></i>Entrar
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}