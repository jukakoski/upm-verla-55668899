

import React, { useCallback } from 'react'

import "survey-react/modern.min.css";

import "./SurveyWrapper.css"

// import 'survey-react/survey.min.css';
import { Survey, StylesManager, Model, modernCss } from "survey-react";


const myCss = {
  matrix: {
    root: "table table-striped"
  },
  navigationButton: "button btn-lg",
  completedButton: "button btn-s",
};


var defaultThemeColors = StylesManager.ThemeColors["modern"];

console.log(StylesManager.ThemeColors)
defaultThemeColors["$main-color"] = "#7aba28";

StylesManager.applyTheme("modern");

const surveyJson = {
  title: "Mitä mieltä olet?",
  "elements": [
    {
      "title": "Seuraavalla kerralla kiinnitän huomiota pakkausmateriaaliin?",
      "type": "radiogroup",
      "isRequired": true,
      "hasNone": false,
      "colCount": 3,
      "choices": [
        "Kyllä",
        "Ehkä",
        "En"
      ]
    }
  ]
};

export const SurveyWrapper = () => {
  const survey = new Model(surveyJson);
  survey.focusFirstQuestionAutomatic = false;
  survey.showQuestionNumbers = "off";
  survey.showTitle = true
  survey.requiredText = ""

  survey.completeText = "Vastaa"
  survey.completedHtml = "<h1>Kiitos vastauksesta</h1>"

  const surveyHandler = useCallback((sender) => {

    const results = JSON.stringify(sender.data);
    console.log(results)

  }, [])

  survey.onComplete.add(surveyHandler);

  survey.onValueChanged.add(() => {

    survey.completeLastPage()
    // alert('moi')
  })

  return (
    <div className='survey-wrapper' >
      <Survey model={survey} />
    </div>
  )
}


export default SurveyWrapper
