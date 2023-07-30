import styled, {css} from 'styled-components';

type ToolbarType = {
    height : any
}

const ToolbarBox = styled.div.attrs<ToolbarType>((props) => ({
    height : props.height,
  }))`
  
    display: flex;
    flex-direction: column;
    width: 56px;
    height: 200px;
    margin-left: 20px;
    margin-top: 100px;
    border-radius: 100px;
    background-color: ${props => props.theme.colors.lightpurple};
    border : 3px solid ${props => props.theme.colors.purple};
    position: absolute;
    left: 60%;
    top: ${({ height }) => (height > 320 ? height : -20)}px;
  `;
  
  const Toolbar_InnerBox = styled.div.attrs({})`
    display: flex;
    width: 56px;
    height: 56px;
    border: none;
    padding: 27px 9.8px;
  `;
  
  export { ToolbarBox, Toolbar_InnerBox };