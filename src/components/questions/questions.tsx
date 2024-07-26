import './questions.css';
import { BsAlarm } from 'react-icons/bs';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { movie } from '../../utils/movieInterface';
import RenderOptions from '../options/options';
import { questionFinder } from '../../features/axios/movieAxios';
import { useNavigate } from 'react-router-dom';

const Questions = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [questions, setQuestions] = useState<movie[]>([])
    const [showModal, setShowModal] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
    const [score, setSecore] = useState(0)
    const currentQuestion = questions[currentQuestionIndex]
    const navigate = useNavigate()

    useEffect(()=>{
        if(selectedOption && currentQuestion){
            if(selectedOption === currentQuestion.answer){
                setSecore(prevScore=>prevScore + 1)
            }
        }
    },[selectedOption, currentQuestion])


    const questionsList = async()=>{
        try{
            const question = await questionFinder()
            setQuestions(question)

        } catch(error){
            console.error(error)
        }
    }

    const handleQuestion = ()=>{
        setSelectedOption('')
        setCurrentQuestionIndex((prevIndex)=>{
            const nextIndex = (prevIndex + 1) % questions.length
            if(nextIndex === 0 && prevIndex !== 0){
                navigate(`/result?score=${score}`)
                return prevIndex
            }

            return nextIndex
        })
    }

    

    useEffect(()=>{
        questionsList()
    }, [])


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
                                            onClick={()=>setShowModal(true)}
                                            src="/logo/suggestion.png"
                                            width={30}
                                            height={30}
                                        />
                                    </OverlayTrigger>
                                </div>
                            </div>
                            {
                                currentQuestion && (
                                    <div className="question-body mt-5 p-5">
                                        <div className='question-box d-flex justify-content-center align-items-center'>
                                            <h3 className='txt'>{currentQuestionIndex + 1}.{currentQuestion.quote}
                                            </h3>
                                        </div>
                                        <RenderOptions
                                            data={currentQuestion.options} 
                                            selectedOption={selectedOption} 
                                            correctAnswer={currentQuestion.answer} 
                                            setOption={setSelectedOption} 
                                        />
                                        <div className='d-flex justify-content-center align-items-center mt-3'>
                                            <button onClick={()=>handleQuestion()} className='next-button'>Next</button>
                                        </div>
                                        
                                </div>
                                )
                            }
                            
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={()=>setShowModal(false)}  style={{ zIndex: '1050' }}>
                <Modal.Header>
                    <Modal.Title>Hint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {
                        currentQuestion.hint || "no Hint found"
                    } */}
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    );
};

export default Questions;
