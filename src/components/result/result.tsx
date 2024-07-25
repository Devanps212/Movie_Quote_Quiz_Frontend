import './result.css';

const Result = () => {
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
                            <tr>
                                <td>1</td>
                                <td>John Doe</td>
                                <td>12</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Result;
