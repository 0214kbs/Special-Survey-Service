import React, {useState,useEffect} from 'react';
import styled, {ThemeProvider} from 'styled-components'
import theme from '@/styles/DefaultTheme'
import {Move_Container,ImageWrapper,Essential_Question_Title,LinkSelectBox,LinkSelect_List,LinkSelect_Option,Link_Question_Title,Essential_Question_Box,Elements_Box,Link_Question_Box,Bottom_Box, Question_Inner_Container,SelectBox_Option,SelectBox_List,SelectBox,Main_Container,Question_Container
    ,Question_Header,Question_Header_Container,
    Question_Content,Question_Content_Container,
    CheckBox_Input,CheckBox_Label,CheckBox_Switch} from '@/components/survey/Survey.styled';
import SurveyType from './Survey.type';
import Image from 'next/image'
import etc from '/public/survey/etc.png'
import shuffle_small from '/public/survey/shuffle_small.png'
import MultipleChoice from './multiplechoice';
import CheckBox from './checkbox';
import DropDown from './dropdown';
import Dates from './dates';
import Time from './time';

const SurveyComponent = ({ componentKey }: { componentKey: string }) => {
    const [surveyState,setSurveyState] = useState('multiplechoice')
    const [selectedOption, setSelectedOption] = useState(''); 
    const [checked, setChecked] = useState(false); 
    const [headerText, setHeaderText] = useState('');
    const [headerDetailText, setHeaderDetailText] = useState('');
    

    const saveComponentDataToLocalStorage = (componentKey: string, data: any) => {
        localStorage.setItem(componentKey, JSON.stringify(data));
      };

    const loadComponentDataFromLocalStorage = (componentKey: string) => {
        const storedData = localStorage.getItem(componentKey);
        return storedData ? JSON.parse(storedData) : null;
      };

    useEffect(() => {
        const storedData = loadComponentDataFromLocalStorage(componentKey);
        if (storedData) {
          setSurveyState(storedData.surveyState);
          setSelectedOption(storedData.selectedOption);
          setChecked(storedData.checked);
          setHeaderText(storedData.headerText);
          setHeaderDetailText(storedData.headerDetailText)
        }
      }, [componentKey]);

    useEffect(() => {
        const componentData = {
          surveyState,
          selectedOption,
          checked,
          headerText,
          headerDetailText,
        };
        saveComponentDataToLocalStorage(componentKey, componentData);
      }, [surveyState, selectedOption, checked,headerText,headerDetailText]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked)
    };
    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value);
      setSurveyState(event.target.value);
    };

    const handleHeaderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeaderText(event.target.value);
      };
    
    const handleHeaderDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeaderDetailText(event.target.value);
      };

    return (
        <ThemeProvider theme={theme}>
            <Main_Container>
                <Move_Container>
                    <Image src={shuffle_small} alt="옮기기"></Image>
                </Move_Container>
                <Question_Inner_Container>
                    <Question_Container>
                        <Question_Header_Container>
                            <Question_Header onChange={handleHeaderChange} value={headerText}/>
                        </Question_Header_Container>            
                        <Question_Content_Container>
                            <Question_Content onChange={handleHeaderDetailChange} value={headerDetailText} />
                        </Question_Content_Container>
                    </Question_Container>
                    <SelectBox>
                            <SelectBox_List onChange={handleOptionChange} value={selectedOption}>
                                <SelectBox_Option value="multiplechoice">객관식 답변</SelectBox_Option>
                                <SelectBox_Option value="checkbox">체크 박스</SelectBox_Option>
                                <SelectBox_Option value="dropdown">드롭 다운</SelectBox_Option>
                                <SelectBox_Option value="dates">날짜 선택</SelectBox_Option>
                                <SelectBox_Option value="time">시간 선택</SelectBox_Option>
                            </SelectBox_List>
                    </SelectBox>
                </Question_Inner_Container>
                {surveyState === 'multiplechoice' && <MultipleChoice componentKey={componentKey} />}
                {surveyState === 'checkbox' && <CheckBox componentKey={componentKey} />}
                {surveyState === 'dropdown' && <DropDown componentKey={componentKey} />}
                {surveyState === 'dates' && <Dates componentKey={componentKey} />}
                {surveyState === 'time' && <Time componentKey={componentKey} />}
                        
                <hr/>
                <Bottom_Box>
                    <Link_Question_Box>
                        <Link_Question_Title>질문 연계</Link_Question_Title>
                        <LinkSelectBox>
                                <LinkSelect_List onChange={handleOptionChange} value={selectedOption}>
                                    <LinkSelect_Option value="Option 1">1번 질문</LinkSelect_Option>
                                    <LinkSelect_Option value="Option 2">2번 질문</LinkSelect_Option>
                                    <LinkSelect_Option value="Option 3">3번 질문</LinkSelect_Option>
                                    <LinkSelect_Option value="Option 4">1번 질문</LinkSelect_Option>
                                </LinkSelect_List>
                        </LinkSelectBox>
                    </Link_Question_Box>
                    <Elements_Box>
                        <ImageWrapper>
                        </ImageWrapper>
                            <Image src={etc} alt="etc"></Image>
                        </Elements_Box>
                    <Essential_Question_Box>
                        <Essential_Question_Title>필수 여부</Essential_Question_Title>
                        <CheckBox_Label>
                            <CheckBox_Input checked={checked} onChange={handleChange} />
                            <CheckBox_Switch />
                        </CheckBox_Label>
                    </Essential_Question_Box>
                </Bottom_Box>
            </Main_Container>
        </ThemeProvider>
    )
}

export default SurveyComponent;