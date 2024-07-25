import './questions.css';
import { BsAlarm } from 'react-icons/bs';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Questions = () => {
    return (
        <div className="container-fluid back">
            <div className="question-background vh-100">
                <div className="overlay-img"></div>
                <div className="row" style={{width:'100vw'}}>
                    <div className="col-12">
                            <div className="question-header bg-dark p-3 text-white">
                                <div className="d-flex align-items-center text-center">
                                    <BsAlarm className="me-2" /> 1:00
                                </div>
                                <div className="hint">
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="top">View Hint 💡</Tooltip>}
                                    >
                                        <img
                                            alt="hint"
                                            src="/logo/suggestion.png"
                                            width={30}
                                            height={30}
                                        />
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <div className="question-body mt-5 p-5">
                                <div className='question-box d-flex justify-content-center align-items-center'>
                                    <h3 className='txt'>a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </h3>
                                </div>
                                <div className="options mt-5">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="option text-center" data-label="a.">Option 1</div>
                                        </div>
                                        <div className="col-6">
                                            <div className="option text-center" data-label="b.">Option 2</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="option text-center" data-label="c.">Option 3</div>
                                        </div>
                                        <div className="col-6">
                                            <div className="option text-center" data-label="d.">Option 4</div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questions;
