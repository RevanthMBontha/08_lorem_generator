import React, { useEffect, useState } from 'react';
// import data from './data';

const url =
  'https://api-for-basic-projects.netlify.app/lorem-generator/lorem_generator_data.json';

function App() {
  const [data, setData] = useState([]);
  const [paragraphs, setParagraphs] = useState(3);
  const [words, setWords] = useState(30);
  const [output, setOutput] = useState([]);
  const [isOutputVisible, setIsOutputVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLorem = async () => {
    const response = await fetch(url);
    const loremData = await response.json();
    setData(loremData);
    setIsLoading(false);
  };

  const createParagraphs = (noOfParagraphs, wordsPerParagraph) => {
    let paraCount = 0;
    const paragraphsArray = [];
    if (noOfParagraphs <= 0) {
      noOfParagraphs = 1;
    }
    if (wordsPerParagraph <= 0) {
      wordsPerParagraph = 20;
    }
    while (paraCount < noOfParagraphs) {
      let wordCount = 0;
      let sentenceLength = Math.floor(Math.random() * 4) + 12;
      let para = '';
      while (wordCount < wordsPerParagraph) {
        if (
          (wordCount >= sentenceLength && wordCount % sentenceLength === 0) ||
          wordCount === wordsPerParagraph - 1
        ) {
          let index = Math.floor(Math.random() * data.length);
          para = para + `${data[index]}. `;
        } else {
          let index = Math.floor(Math.random() * data.length);
          para = para + `${data[index]} `;
        }
        wordCount++;
      }
      paragraphsArray.push(para);
      paraCount++;
    }
    return paragraphsArray;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(`No of paragraphs: ${paragraphs}`);
    // console.log(`No of words per paragraph: ${words}`);
    setOutput((output) => (output = createParagraphs(paragraphs, words)));
    output.map((each) => console.log(each));
    setIsOutputVisible(true);
    setParagraphs(3);
    setWords(30);
  };
  useEffect(() => {
    fetchLorem();
  }, []);

  if (isLoading) {
    return (
      <main>
        <section className="section section-center">
          <h2>loading...</h2>
          <h4>an awesome lorem generator</h4>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="section section-center">
        <h3>Tired of boring lorem ipsum?</h3>
        <h4>click to generate an awesome variation</h4>
        <form className="lorem-form" onSubmit={handleSubmit}>
          <div className="lorem-set">
            <label htmlFor="noOfParagraphs">paragraphs:</label>
            <input
              type="text"
              inputMode="numeric"
              name="noOfParagraphs"
              id="noOfParagraphs"
              value={paragraphs}
              onChange={(e) => setParagraphs(e.target.value)}
            />
          </div>
          <div className="lorem-set">
            <label htmlFor="noOfSentences">words per paragraph:</label>
            <input
              type="text"
              inputMode="numeric"
              name="noOfSentences"
              id="noOfSentences"
              value={words}
              onChange={(e) => setWords(e.target.value)}
            />
          </div>
          <p>
            Enter the number of paragraphs and the number of words you want for
            each paragraph and click GENERATE to generate an awesome version of
            lorem ipsum
          </p>
          <button type="submit" className="btn">
            Generate
          </button>
        </form>
        <div className={isOutputVisible ? 'result' : 'result hidden'}>
          {output && output.map((each, index) => <p key={index}>{each}</p>)}
        </div>
      </section>
    </main>
  );
}

export default App;
