import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import ImageIcon from '/public/survey/ImageIcon.png'
import {DeleteButton,AddButton,Short_content_Box,Short_Box,MultipleCheck} from './Short.styled';

const Short = ({ componentKey }: { componentKey: string }) => {
        const [items, setItems] = useState<any[]>([
          { id: `${componentKey}_1`, date: ''},
        ]);
        
        useEffect(() => {
          const storedItems = loadShortFromLocalStorage(`SHORT_FORM_${componentKey}`);
          if (storedItems) {
            setItems(storedItems);
          }
        }, [componentKey]);
    
    
        useEffect(() => {
          saveShortToLocalStorage(`SHORT_FORM_${componentKey}`, items);
        }, [componentKey,items]);

        const saveShortToLocalStorage = (componentKey: string, items: any[]) => {
          localStorage.setItem(`SHORT_FORM_${componentKey}`, JSON.stringify(items));
        };
      
        const loadShortFromLocalStorage = (componentKey: string) => {
          const storedData = localStorage.getItem(`SHORT_FORM_${componentKey}`);
      
          return storedData ? JSON.parse(storedData) : null;
        };
        const handleDeleteItem = (index: number) => {
          const upShortdItems = [...items];
          upShortdItems.splice(index, 1);
          setItems(upShortdItems);
        };

        const handleItemTextChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
          const updatedItems = [...items];
          updatedItems[index].date = event.target.value;
          setItems(updatedItems);
        };

        return (
          <Short_Box>
            {items.map((item, index) => (
              <Short_content_Box key={item.id}>
            
                {items.length > 1 && <DeleteButton onClick={() => handleDeleteItem(index)}>X</DeleteButton>}
                <MultipleCheck 
                  name="DateGroup"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleItemTextChange(index, event)}
                  value={item.date} />
              </Short_content_Box>
            ))}
          </Short_Box>
        );
      };


export default Short;