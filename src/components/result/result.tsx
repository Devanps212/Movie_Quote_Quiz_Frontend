import { useEffect, useState } from 'react';
import './result.css';
import { allUser } from '../../features/axios/userAxios';
import { user } from '../../utils/userInter';
import { useNavigate } from 'react-router-dom';

const Result = () => {

    const navigate = useNavigate()
    const [userData, setUserData] = useState<user[]>([])


    useEffect(()=>{
        localStorage.removeItem('userName')
        const findUsers = async()=>{
            const user = await allUser()
            setUserData(user)
        }

        findUsers()
    }, [])

    return (
        <div className="container-fluid main-body">
            <div className='overlay-background'></div>
            <div className="row">
                <div className="col-12">
                    <div className="bg-dark">
                        <h2 className="text-center text-light">Result</h2>
                    </div>
                </div>
                <div className="col-12 table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData && userData.map((data, index)=>(
                                    <tr>
                                        <td>{index+ 1}</td>
                                        <td>{data.name}</td>
                                        <td>{data.score}</td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
                <div className='col-12 d-flex justify-content-center align-items-center mt-3'>
                    <button className='go-home-button' onClick={()=>navigate('/')}>
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Result;
