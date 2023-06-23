// we also need to remove "{component} from import to get rid of the error because it is only for class based component"
import React from 'react'

import { Link } from 'react-router-dom'

// Changing class based component into "function based component" by converting "class extends" to "function NavBar(){}" and we also remove render method because it is not required in function based component

function NavBar (){
        return (
            <>
                <nav style={{width:'100%', zIndex: '1'}} className="navbar navbar-expand-lg bg-light position-fixed">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">News Monkey</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/business">Business</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/entertainment">Entertainment</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/general">General</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/health">Health</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/science">Science</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/sports">Sports</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/technology">Technology</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>

            </>
        )
   
}

export default NavBar