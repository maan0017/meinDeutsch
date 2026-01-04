import { useState } from "react";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";

interface Question {
  id: number;
  text: string;
  topic: string;
}

interface Blank {
  index: number;
  answer: string;
}

interface TextPart {
  type: "text";
  content: string;
}

interface BlankPart {
  type: "blank";
  index: number;
  answer: string;
}

type Part = TextPart | BlankPart;

export default function FillInTheBlanks() {
  // Store questions with blanks marked by {answer}
  const [questions] = useState<Question[]>([
    {
      id: 1,
      text: "The capital of France is {Paris}. It is known for the {Eiffel Tower}.",
      topic: "Geography",
    },
    {
      id: 2,
      text: "React was developed by {Facebook}. It uses a virtual {DOM} for efficient updates.",
      topic: "Technology",
    },
    {
      id: 3,
      text: "The largest planet in our solar system is {Jupiter}. It has {79} known moons.",
      topic: "Science",
    },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  // Parse question to extract blanks and answers
  const parseQuestion = (text: string) => {
    const parts: Part[] = [];
    const blanks: Blank[] = [];
    let lastIndex = 0;
    const regex = /\{([^}]+)\}/g;
    let match;
    let blankIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      // Add text before the blank
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: text.slice(lastIndex, match.index),
        });
      }

      // Add the blank
      const answer = match[1];
      blanks.push({ index: blankIndex, answer: answer.toLowerCase().trim() });
      parts.push({ type: "blank", index: blankIndex, answer });
      blankIndex++;

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({ type: "text", content: text.slice(lastIndex) });
    }

    return { parts, blanks };
  };

  const getCurrentQuestionData = () => {
    const q = questions[currentQuestion];
    const parsed = parseQuestion(q.text);
    return { ...q, ...parsed };
  };

  const handleAnswerChange = (
    questionId: number,
    blankIndex: number,
    value: string,
  ) => {
    setUserAnswers((prev) => ({
      ...prev,
      [`${questionId}-${blankIndex}`]: value,
    }));
  };

  const checkAnswer = (
    questionId: number,
    blankIndex: number,
    correctAnswer: string,
  ) => {
    const userAnswer = userAnswers[`${questionId}-${blankIndex}`] || "";
    return (
      userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
    );
  };

  const calculateScore = () => {
    const q = getCurrentQuestionData();
    let correct = 0;
    q.blanks.forEach((blank) => {
      if (checkAnswer(q.id, blank.index, blank.answer)) {
        correct++;
      }
    });
    return { correct, total: q.blanks.length };
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResults(false);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const questionData = getCurrentQuestionData();
  const score = showResults ? calculateScore() : null;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Fill in the Blanks
            </h1>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                {questionData.topic}
              </span>
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
          </div>

          {/* Question with blanks */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl">
            <p className="text-lg leading-relaxed">
              {questionData.parts.map((part, idx) => {
                if (part.type === "text") {
                  return <span key={idx}>{part.content}</span>;
                } else {
                  const key = `${questionData.id}-${part.index}`;
                  const isCorrect =
                    showResults &&
                    checkAnswer(questionData.id, part.index, part.answer);
                  const isIncorrect =
                    showResults &&
                    !checkAnswer(questionData.id, part.index, part.answer);

                  return (
                    <span key={idx} className="inline-flex items-center mx-1">
                      <input
                        type="text"
                        value={userAnswers[key] || ""}
                        onChange={(e) =>
                          handleAnswerChange(
                            questionData.id,
                            part.index,
                            e.target.value,
                          )
                        }
                        disabled={showResults}
                        className={`
                          inline-block px-3 py-1 border-b-2 bg-white
                          focus:outline-none focus:border-indigo-500
                          transition-colors min-w-[120px] text-center
                          ${
                            showResults
                              ? isCorrect
                                ? "border-green-500 bg-green-50"
                                : "border-red-500 bg-red-50"
                              : "border-gray-300"
                          }
                        `}
                        placeholder="______"
                      />
                      {showResults && (
                        <span className="ml-2">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </span>
                      )}
                    </span>
                  );
                }
              })}
            </p>
          </div>

          {/* Show correct answers if wrong */}
          {showResults && score && score.correct < score.total && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="font-semibold text-yellow-800 mb-2">
                Correct Answers:
              </p>
              <ul className="space-y-1">
                {questionData.blanks.map((blank, idx) => {
                  const userAnswer =
                    userAnswers[`${questionData.id}-${blank.index}`] || "";
                  const isWrong =
                    userAnswer.toLowerCase().trim() !==
                    blank.answer.toLowerCase().trim();
                  if (isWrong) {
                    return (
                      <li key={idx} className="text-yellow-700">
                        Blank {blank.index + 1}: <strong>{blank.answer}</strong>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          )}

          {/* Score display */}
          {showResults && score && (
            <div
              className={`
              mb-6 p-6 rounded-xl text-center
              ${
                score.correct === score.total
                  ? "bg-green-100 border-2 border-green-300"
                  : "bg-orange-100 border-2 border-orange-300"
              }
            `}
            >
              <p className="text-2xl font-bold mb-2">
                {score.correct === score.total
                  ? "🎉 Perfect!"
                  : "📝 Keep Learning!"}
              </p>
              <p className="text-lg">
                Score: {score.correct} / {score.total}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            {!showResults ? (
              <button
                onClick={handleSubmit}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                Check Answers
              </button>
            ) : (
              <>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </button>
                {currentQuestion < questions.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                  >
                    Next Question →
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Info card */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold text-gray-800 mb-2">How it works:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Questions stored with blanks marked as {"{answer}"}</li>
            <li>
              • Answers stored in state object with keys like
              "questionId-blankIndex"
            </li>
            <li>
              • Automatic parsing extracts blanks and creates input fields
            </li>
            <li>• Case-insensitive checking with trimmed whitespace</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
