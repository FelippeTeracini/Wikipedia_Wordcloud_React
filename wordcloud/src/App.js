import React from 'react';
import ReactDOM from 'react-dom';
import ReactWordcloud from 'react-wordcloud';

import words from './words';

const options = {
  colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
  enableTooltip: true,
  deterministic: false,
  fontFamily: 'impact',
  fontSizes: [5, 60],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 1,
  rotations: 1,
  rotationAngles: [0, 90],
  scale: 'sqrt',
  spiral: 'archimedean',
  transitionDuration: 1000,
};


const dictFake = {
  'um': {
    'dois': 40,
    'tres': 23,
  },
  'dois': {
    'tres': 12,
    'um': 53
  },
  'tres': {
    'dois': 13,
    'um': 41
  }
}

const formatData = (dic) => {
  let newDic = []
  Object.entries(dic).forEach(e => {
    newDic.push({ text: e[0], value: e[1] })
  });

  return newDic
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsData: formatData(dictFake['um'])
    }
  }
  
  onWordClick = (word) => {
    const dic = dictFake[word.text]
    console.log(formatData(dic))
    this.setState({ wordsData: formatData(dic) })
  }
  
  callbacks = {
    // getWordColor: word => (word.value > 50 ? 'orange' : 'purple'),
    // getWordTooltip: word =>
    //   `The word "${word.text}" appears ${word.value} times.`,
    onWordClick: this.onWordClick,
    // onWordMouseOut: getCallback('onWordMouseOut'),
    // onWordMouseOver: getCallback('onWordMouseOver'),
  }

  handleChange = (event) => {
    const word = event.target.value
    if(word in dictFake){
      const dic = dictFake[word]
      this.setState({ wordsData: formatData(dic) })
      console.log(event.target.value)
    }
  }

  render() {
    return (
      <div className="Body">
        <p>Wikipedia Word Cloud</p>
        <form>
          <label>
            word:
            <input type="text" name="name" onChange={this.handleChange}/>
          </label>
        </form>
        <div style={{height: 400, width: 600}}>
          <ReactWordcloud callbacks={this.callbacks} options={options} words={this.state.wordsData} />
        </div>
      </div>
    )
  }
}

export default App;
