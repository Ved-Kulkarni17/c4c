import { useState } from 'react';

export default function Custom() {
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [expertise, setExpertise] = useState(1);

  const handleInterestChange = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
    } else if (interests.length < 3) {
      setInterests([...interests, interest]);
    }
  };

  const handleLanguageChange = (language) => {
    if (languages.includes(language)) {
      setLanguages(languages.filter((item) => item !== language));
    } else if (languages.length < 3) {
      setLanguages([...languages, language]);
    }
  };

  return (
    <div className="relative w-full h-screen text-gray-800">
      {/* Background with gradient particle wave */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/gradient-particle-wave-background_23-2150521668.jpg?t=st=1738838105~exp=1738841705~hmac=dbc872a13353510e2e6758704c12b9dd0a21a48ef2c2de4e47dd9bfd998e687c&w=1800')",
        }}
      ></div>

      {/* Semi-transparent tech pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 scale-y-[-1]"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/technology-background-with-hexagonal-net_79603-303.jpg?semt=ais_hybrid')",
        }}
      ></div>

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-white/6 backdrop-blur-lg"></div>

      {/* Main content box with gradient */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[90vw] max-w-3xl bg-gradient-to-br from-[#e6f7ff] to-[#f2eaff] rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">
            Customize Your Profile
          </h2>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-lg text-gray-600 font-medium">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your city"
              className="w-full p-2 mt-2 bg-transparent border-2 border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Interests */}
          <div className="mb-6">
            <label className="block text-lg text-gray-600 font-medium">Interests:</label>
            <div className="mt-2 overflow-y-auto h-32 bg-transparent border-2 border-gray-300 rounded-lg">
              <div className="flex flex-wrap gap-2 p-2">
                {["Music", "Travel", "Technology", "Machine Learning", "AI", "Blockchain", "Cybersecurity", "Web Development", "Cloud Computing"].map((interest) => (
                  <div
                    key={interest}
                    onClick={() => handleInterestChange(interest)}
                    className={`cursor-pointer text-sm font-medium px-4 py-2 rounded-lg ${
                      interests.includes(interest) ? "bg-green-500 text-white" : "bg-transparent text-gray-800 border-2 border-gray-300"
                    }`}
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="mb-6">
            <label className="block text-lg text-gray-600 font-medium">Languages:</label>
            <div className="mt-2 overflow-y-auto h-32 bg-transparent border-2 border-gray-300 rounded-lg">
              <div className="flex flex-wrap gap-2 p-2">
                {["Python", "Java", "JavaScript", "C++", "Go", "Ruby", "PHP", "Swift", "Kotlin", "Rust"].map((language) => (
                  <div
                    key={language}
                    onClick={() => handleLanguageChange(language)}
                    className={`cursor-pointer text-sm font-medium px-4 py-2 rounded-lg ${
                      languages.includes(language) ? "bg-green-500 text-white" : "bg-transparent text-gray-800 border-2 border-gray-300"
                    }`}
                  >
                    {language}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expertise */}
          <div className="mb-6">
            <label className="block text-lg text-gray-600 font-medium">Expertise (1 to 5):</label>
            <input
              type="number"
              value={expertise}
              onChange={(e) => setExpertise(Math.min(Math.max(e.target.value, 1), 5))}
              min="1"
              max="5"
              className="w-full p-2 mt-2 bg-transparent border-2 border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Submit Button */}
          <button
  onClick={() => alert("Profile customized!")}
  className="w-full px-6 py-3 bg-gradient-to-br from-[#6a0dad] to-[#0077ff] text-white font-semibold rounded-lg shadow-md hover:from-[#5c0ca5] hover:to-[#0066dd] transition-all"
>
  Save Customizations
</button>

        </div>
      </div>
    </div>
  );
}