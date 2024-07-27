import './questions.css';
import { BsAlarm } from 'react-icons/bs';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { movie } from '../../utils/movieInterface';
import RenderOptions from '../options/options';
import { questionFinder } from '../../features/axios/movieAxios';
import { useNavigate } from 'react-router-dom';
import { userUpdate } from '../../features/axios/userAxios';
import toast from 'react-hot-toast';

const Questions = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<movie[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName") ?? '';

    const questionsList = async () => {
        try {
            console.log("finding questions");
            const question = await questionFinder();
            console.log("questions : ", question);
            setQuestions(question);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        questionsList();
    }, []);

    useEffect(() => {
        if (selectedOption && questions[currentQuestionIndex]) {
            if (selectedOption === questions[currentQuestionIndex].answer) {
                setScore(prevScore => prevScore + 1);
            }
        }
    }, [selectedOption, currentQuestionIndex, questions]);

    useEffect(() => {
        if (questions.length > 0) {
            const id = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer <= 1) {
                        clearInterval(id);
                        nextQuestion();
                        return 30;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
            setIntervalId(id);

            return () => {
                clearInterval(id);
            };
        }
    }, [questions, currentQuestionIndex]);

    const nextQuestion = async () => {
        setSelectedOption('');
        const nextIndex = (currentQuestionIndex + 1) % questions.length;

        if (nextIndex === 0 && currentQuestionIndex !== 0) {
            try {
                await userUpdate(userName, score);
                localStorage.removeItem("userName");
                navigate(`/result`);
            } catch (error) {
                console.error('Error saving user:', error);
            }
        } else {
            setCurrentQuestionIndex(nextIndex);
            setTimer(30);
        }
    };

    const handleQuestion = async () => {
        console.log('Selected option before handling:', selectedOption);
        if (selectedOption) {
            setSelectedOption('');

            const nextIndex = (currentQuestionIndex + 1) % questions.length;

            if (nextIndex === 0 && currentQuestionIndex !== 0) {
                try {
                    await userUpdate(userName, score);
                    localStorage.removeItem("userName");
                    navigate(`/result`);
                } catch (error) {
                    console.error('Error saving user:', error);
                }
            } else {
                setCurrentQuestionIndex(nextIndex);
                setTimer(30);
            }
        } else {
            toast.error("Select an option to move forward");
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            localStorage.removeItem("userName");
            event.returnValue = ''; // Standard for most browsers
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div className="container-fluid back">
            <div className="question-background vh-100">
                <div className="overlay-img"></div>
                <div className="row" style={{ width: '100vw' }}>
                    <div className="col-12">
                        <div className="question-header bg-dark p-3 text-white">
                            <div className="d-flex align-items-center text-center">
                                <BsAlarm className="me-2" /> {timer}s
                            </div>
                            <div className="hint">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id="top">View Hint 💡</Tooltip>}
                                >
                                    <img
                                        alt="hint"
                                        onClick={() => setShowModal(true)}
                                        src="/logo/suggestion.png"
                                        width={30}
                                        height={30}
                                    />
                                </OverlayTrigger>
                            </div>
                        </div>
                        {questions.length > 0 && questions[currentQuestionIndex] && (
                            <div className="question-body mt-5 p-5">
                                <div className='question-box d-flex justify-content-center align-items-center'>
                                    <h3 className='txt'>{currentQuestionIndex + 1}. {questions[currentQuestionIndex].quote}</h3>
                                </div>
                                <RenderOptions
                                    data={questions[currentQuestionIndex].options}
                                    selectedOption={selectedOption}
                                    correctAnswer={questions[currentQuestionIndex].answer}
                                    setOption={setSelectedOption}
                                />
                                <div className='d-flex justify-content-center align-items-center mt-3'>
                                    <button onClick={() => handleQuestion()} className='next-button'>Next</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} style={{ zIndex: '1050' }}>
                <Modal.Header>
                    <Modal.Title>Hint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {questions[currentQuestionIndex]?.hint || "No hint found"}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Questions;
