
import { qna } from "../constants/qna";

const QnAList = ({toggleAnswer}:{toggleAnswer:(index:number)=>void}) => {


  return (
    <div  className="space-y-4 questions">
      {qna.map((item, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg cursor-pointer question"
          onClick={() => toggleAnswer(index)}
        >
          <h3 className="font-medium text-lg">{item.question}</h3>
          <div className="answer mt-2 text-gray-200">{item.answer}</div>
        </div>
      ))}
    </div>
  );
}

export default QnAList;
