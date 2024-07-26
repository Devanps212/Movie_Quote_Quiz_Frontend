
const RenderOptions = ({ data, selectedOption, correctAnswer, setOption } : { data: string[], selectedOption: string | null, correctAnswer: string, setOption: (option: string) => void }) => {
    const firstRow = data.slice(0, 2);
    const secondRow = data.slice(2, 4);

    const getOptionClassName = (option: string) => {
        if (!selectedOption) return 'option text-center';
        if (option === correctAnswer) return 'option text-center correct';
        if (option === selectedOption && option !== correctAnswer) return 'option text-center incorrect';
        return 'option text-center';
    };

    const handleOptionClick = (option: string) => {
        if (!selectedOption) setOption(option);
    };

    return (
        <div className="options mt-5">
            <div className="row">
                {firstRow.map((option, index) => (
                    <div className="col-6" key={`firstRow-${index}`}>
                        <div
                            onClick={() => handleOptionClick(option)}
                            className={getOptionClassName(option)}
                            data-label={String.fromCharCode(97 + index)}
                            style={{ pointerEvents: selectedOption ? 'none' : 'auto' }}
                        >
                            {option}
                        </div>
                    </div>
                ))}
            </div>
            <div className="row">
                {secondRow.map((option, index) => (
                    <div className="col-6" key={`secondRow-${index}`}>
                        <div
                            onClick={() => handleOptionClick(option)}
                            className={getOptionClassName(option)}
                            data-label={String.fromCharCode(99 + index)}
                            style={{ pointerEvents: selectedOption ? 'none' : 'auto' }}
                        >
                            {option}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RenderOptions;
