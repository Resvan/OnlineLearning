import { useEffect, useState } from "react";

const QuizQuestion = ({ questionData, onAnswered }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState([]);
  const correctAnswer = questionData.answer;
  const [submit, setSubmit] = useState(true);

  useEffect(() => {
    const shuffledOptions = shuffleArray([...questionData.options, correctAnswer]);
    setOptions(shuffledOptions);
  }, [questionData, correctAnswer]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };



  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const submitAnswers = () => {
    setSubmit(false)
    // Calculate progress and time taken based on results
    const userResults = options.map((option, index) => {
      const isSelected = index === selectedOption;
      const isCorrect = option === correctAnswer;

      return {
        isSelected,
        isCorrect,
      };
    });

    setResults(userResults);
    
    const totalQuestions = options.length;
    const correctCount = userResults.filter((result) => result.isCorrect && result.isSelected).length;
    console.log(correctCount);



    onAnswered({
      correctCount,
    });
  };

  return (
    <div>
      <h3>{questionData.question}</h3>
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionSelect(index)}
            style={{
              backgroundColor:
                index === selectedOption
                  ? results[index]?.isCorrect
                    ? 'green' 
                    : 'red'  
                  : results[index]?.isCorrect
                    ? 'green' 
                    : 'white',
            }}
          >
            {option}
          </li>
        ))}
      </ul>
      <button onClick={submitAnswers} disabled={selectedOption === null}>
        Submit
      </button>
    </div>
  );
};

export default QuizQuestion;
