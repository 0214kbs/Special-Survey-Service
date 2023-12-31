"use client";
import React,{useState,useEffect} from 'react';
import imgStorage from '../../../../../firebase/firebaseStorage'
import { ref,uploadBytes,getDownloadURL, deleteObject } from "firebase/storage"
import Toolbar from '@/components/survey/toolbar';
import {Component_Container,Survey_Inner_Container,ImagePreiew_Box,ImagePreview,Image_Delete_Button,UploadImage,Image_Text_Content,Image_Text_Header,Inner_Icon_Container,Inner_Text_Container,Image_Inner_Container,Title_Content,Title_input,Title_Inner_Container,Survey_Container, Background_Container, Survey_MainImage_Container,Survey_Title_Container } from './MakeQuestion.styled';
import Main_Image from '/public/survey/Main_Image.png'
import Image from 'next/image'
import useMakeSurveyApiStore from '@/stores/makesurvey/useMakeSurveyApiStore';
import useSurveyStore from '@/stores/makesurvey/useSurveyStore';
import useSettingSurveyApiStore from '@/stores/makesurvey/useSettingSurveyApiStore';
import { v4 as uuid } from 'uuid';


function MakeQuestion() {
  const {surveyComponents} = useSurveyStore();
  const {title,setTitle,content,setContent,img,setImg} = useSettingSurveyApiStore();
  const {uploadFileName,setUploadFileName} = useMakeSurveyApiStore();
  const [previewImg, setPreviewImg] = useState('');

  const saveComponentDataToLocalStorage = (data: any) => {
      localStorage.setItem('entire', JSON.stringify(data));
    };

  const loadComponentDataFromLocalStorage = () => {
      const storedData = localStorage.getItem('entire');
      return storedData ? JSON.parse(storedData) : null;
    };

  useEffect(() => {
    if (img) {
      setPreviewImg(img)
    }
    }, []);

  useEffect(() => {
      const componentData = {
        img,
      };

      saveComponentDataToLocalStorage(componentData);
    }, [img]);


    const handleTextareaInput = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const textarea = event.currentTarget;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTitle(event.target.value);
    };
    const handlecontentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.target.value);
    };
  const handleImageClick = () => {
    const uploadButton = document.getElementById(`upload-button`);
    if (uploadButton) {
      uploadButton.click();
    }
  };     
  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];


    if (file) {
      const fileName = uuid();
      setUploadFileName(fileName);
      const reference = ref(imgStorage, fileName);
      const uploadTask = uploadBytes(reference, file);


      uploadTask.then(async () => {
        
        const imgUrl = await getDownloadURL(reference);
        setImg(imgUrl);

      }).then(async () => {
        const imgUrl = await getDownloadURL(reference);
        setPreviewImg(imgUrl);
        event.target.value = null;
      })
    }

  };




  const handleImageDelete = async () => {
    if (img) {
      try {
        const imageRef = ref(imgStorage, uploadFileName);
        await deleteObject(imageRef);
        setImg('');
      } catch(error) {
        console.error("이미지 삭제 실패",error)
      }
    }

  };

  return (
    
      <Survey_Container>
        <Survey_Inner_Container>
        <Survey_Title_Container>
          <Title_Inner_Container>
          <Title_input minRows={1} maxRows={2} placeholder="설문지 제목" onKeyDown={handleTextareaInput} onKeyUp={handleTextareaInput} onChange={handleTitleChange} value={title}/>
          <Title_Content minRows={1} maxRows={4} placeholder="설문에 대한 설명을 적어주세요 (필수사항)" onKeyDown={handleTextareaInput} onKeyUp={handleTextareaInput}  onChange={handlecontentChange} value={content} />
          </Title_Inner_Container>
        </Survey_Title_Container>
        <Survey_MainImage_Container>
          <Image_Inner_Container>
              <Inner_Text_Container>
                <Image_Text_Header>설문 대표 이미지 1장</Image_Text_Header>
                <Image_Text_Content>jpg 또는 png 이미지 (선택사항)</Image_Text_Content>    
              </Inner_Text_Container>
              <UploadImage id={`upload-button`} onChange={(e: any) => handleImageChange(e)} />
              {img ?  (
                <ImagePreiew_Box>
                  <ImagePreview src={previewImg} alt='메인 이미지' />
                  <Image_Delete_Button onClick={() => handleImageDelete()}>X</Image_Delete_Button>
                </ImagePreiew_Box>
              )  : <Inner_Icon_Container onClick={() => handleImageClick()}>
                <Image src={Main_Image} alt="메인 이미지" />
              </Inner_Icon_Container>
              }
          </Image_Inner_Container>
        </Survey_MainImage_Container>
        <Component_Container>
          <Toolbar />
        </Component_Container>  
        </Survey_Inner_Container>




    </Survey_Container>
  );
}

export default MakeQuestion;