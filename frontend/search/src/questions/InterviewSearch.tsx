import React, { useState } from 'react';

const techOptions = [
  'React',
  'Node.js',
  'Python',
  'Java',
  'TypeScript',
  'Angular',
  'NestJS',
];
const countOptions = [5, 10, 15, 20];

export default function InterviewSearchPage() {
  const [difficulty, setDifficulty] = useState<string>();
  const [techStackInput, setTechStackInput] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [results, setResults] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const response = await fetch('/api/questions/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ difficulty, techStack, count }),
    });

    const data = await response.text();
    setResults(data);
  };

  const handleTechSelect = (tech: string) => {
    if (!techStack.includes(tech)) {
      setTechStack([...techStack, tech]);
    }
    setTechStackInput('');
  };

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const filteredTechOptions = techOptions.filter(
    (tech) =>
      tech.toLowerCase().includes(techStackInput.toLowerCase()) &&
      !techStack.includes(tech)
  );

  return (
    <div className="w-full px-4">
      <div
        className={`transition-all duration-500 max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 ${
          submitted ? 'mt-6' : 'mt-24'
        }`}
      >
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          🎯 Search Interview Questions
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Top Row: Tech Stack */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Tech Stack
            </label>
            <div className="relative">
              <input
                type="text"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                placeholder="Type to search..."
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {techStackInput && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-40 overflow-y-auto">
                  {filteredTechOptions.map((tech) => (
                    <li
                      key={tech}
                      onClick={() => handleTechSelect(tech)}
                      className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="text-white hover:text-gray-200"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Second Row: Difficulty + Count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Difficulty Radio Buttons */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <div className="flex gap-6">
                {['Easy', 'Medium', 'Hard'].map((level) => (
                  <label
                    key={level}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <input
                      type="radio"
                      name="difficulty"
                      value={level}
                      checked={difficulty === level}
                      onChange={() => setDifficulty(level)}
                      className="accent-purple-600"
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            {/* Count Dropdown */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Question Count
              </label>
              <select
                value={count ?? ''}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select count</option>
                {countOptions.map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition font-semibold"
          >
            🚀 Submit
          </button>
        </form>
      </div>

      {/* Results */}
      {results && (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">
            📦 Results
          </h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-800">
            {results}
          </pre>
        </div>
      )}
    </div>
  );
}
