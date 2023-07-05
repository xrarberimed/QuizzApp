import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from 'react-native-modal';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i --) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const Quiz = ({ navigation }) => {
  const [questions, setQuestions] = useState();
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  //const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const getQuiz = async () => {
    const url = 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&encode=url3986';
    const res = await fetch(url);
    const data = await res.json();

    console.log(data.results)
  
    const shuffledQuestions = shuffleArray(data.results); // Soruları karıştırıyoruz
    setQuestions(shuffledQuestions);
    setQuestions(data.results)
    setOptions(generateOptionsAndShuffle(data.results[0]))
  };

  useEffect(() => {
    getQuiz();
  }, []);
  

  


  const handleNextQuestion = () => {
    if(ques!==9) {
      setQues(ques+1)
      setOptions(generateOptionsAndShuffle(questions[ques+1]))
    } else {
      handleShowResult();
    }
   // console.log(_option === questions[ques].correct_answer)
  };

  const generateOptionsAndShuffle = (_question) => {
    const options = [..._question.incorrect_answers]
    options.push(_question.correct_answer)
    shuffleArray(options)

    return options
  }

  const handleSelectedOption = (_option) => {
    setSelectedOption(_option);

    if(_option === questions[ques].correct_answer) {
      setCorrectAnswers(correctAnswers + 1)
    } else {
      setWrongAnswers(wrongAnswers + 1)
    }
   
  }

  const handleShowResult = () => {
     const totalQuestions = questions.length
     const wrongAnswers = totalQuestions - correctAnswers;
     const successPercentage = (correctAnswers / totalQuestions) * 100;
    navigation.navigate('Result', { correctAnswers, wrongAnswers, successPercentage });

  }


  /* const handleSkipQuestion = () => {
    if (ques < questions.length - 1) {
      setQues(ques + 1);
      setOptions(generateOptionsAndShuffle(questions[ques + 1]));
    } else {
      // Soruların sonuna geldiğinizde yapılacak işlemler
      handleShowResult();
    }
  }; */
   

  if (!questions || questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {questions &&
        <View style={styles.parent}>

          <View style={styles.top}>
            <Text style={styles.question}>Q. {decodeURIComponent(questions[ques].question)}</Text>
          </View>
          <View style={styles.options}>
           
           <TouchableOpacity style={[styles.optionButton, selectedOption === options[0] && styles.selectedOption]} onPress={()=>handleSelectedOption(options[0])}>
              <Text style={styles.option}>{decodeURIComponent(options[0])}</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.optionButton, selectedOption === options[1] && styles.selectedOption]} onPress={()=>handleSelectedOption(options[1])}>
              <Text style={styles.option}>{decodeURIComponent(options[1])}</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.optionButton, selectedOption === options[2] && styles.selectedOption]} onPress={()=>handleSelectedOption(options[2])}>
              <Text style={styles.option}>{decodeURIComponent(options[2])}</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.optionButton, selectedOption === options[3] && styles.selectedOption]} onPress={()=>handleSelectedOption(options[3])}>
              <Text style={styles.option}>{decodeURIComponent(options[3])}</Text>
           </TouchableOpacity>
          </View>

           <View style={styles.bottom}>

            {ques !==9 && <TouchableOpacity style={styles.button} onPress={handleNextQuestion}>
              <Text style={styles.buttonText}> NEXT </Text>
            </TouchableOpacity>}

            {ques ===9 && <TouchableOpacity style={styles.button} onPress={handleShowResult}>
              <Text style={styles.buttonText}> SHOW RESULTS </Text>
            </TouchableOpacity>}
          </View>


          <Modal isVisible={showWarning}>
            <View style={styles.modalContainer}>
              <Text style={styles.warningText}>Please make a choice</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowWarning(false)}>
                <Text style={styles.closeButtonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      }
    </View>
  )
}

export default Quiz

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 30,
    height: '100%'
  },
  top: {
    marginVertical: 50,
    marginHorizontal: 10,
    backgroundColor: '#240046',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  options: {
    marginVertical: 16,
    flex: 1
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: '#240046',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white'

  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  option: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white'
  },
  optionButton: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#FF8500',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  parent: {
    height: '100%'
  },
  selectedOption: {
    backgroundColor: '#240046'

  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  warningText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  
})

