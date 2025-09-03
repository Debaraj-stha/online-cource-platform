import React, { useState } from 'react'

const AskQuestionForm = () => {
    const [question, setQuestion] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-2 max-w-xl mx-auto mb-8"
        >
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your question..."
                className="flex-1 p-2 border-0 ring-2 ring-inset focus:border-0 focus:outline-0 focus:ring-2 focus:ring-blue-500 rounded-lg bg-transparent"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg"
            >
                Ask
            </button>
        </form>

    )
}

export default AskQuestionForm
