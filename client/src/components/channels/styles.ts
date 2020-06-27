import styled from "styled-components";

export const ChannelContainer = styled.div`
  flex-basis: 20%;
  height: 100%;
  border-right: 1px solid rgba(55, 0, 179, 0.5);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
`;

export const AddChannelButton = styled.div<IAddChannelButton>`
  border-radius: ${props => props.isForm 
    ? '0' : '50%'};
  background-color: rgba(55, 0, 179, 0.5);
  height: 40px;
  width: ${props => props.isForm
  ? '100%' : '40px'};
  margin-top: auto;
  text-align: center;
  cursor: pointer;
  align-self: center;
  transition: width 0.5s, border-radius 0.3s 0.1s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  
  span {
    transition: all 0.5s;
    font-size: 24px;
    display: block;
    transform: rotate(${props => props.isForm ? '45deg' : '0'});
  }
`;

export const ChannelItem = styled.li<IChannelItem>`
  padding: 12px 8px;
  background-color: ${props => props.isActive 
    ? '#3700B3' : '#6200EE'};
  cursor: pointer;
  text-align: center;
  color: #ffffff;
  word-break: break-all;
  
  &:hover {
    background-color: #3700B3;
  }
`;

export const ChannelScroll = styled.ul`
  overflow: auto;
  margin: 0;
  padding-left: 0;
  list-style: none;
`;

export const ChannelForm = styled.form<IAnimation>`
  display: 
    ${props => props.state ? 'block' : 'none'};
  form {
    width: ${props => props.state ? '90%' : '0'};
  }
`;

export const ChannelInput = styled.input<IAnimation>`
  transition: all 1s;
  width: ${props => (props.state == 'entered') ? '90%' : '0'};
`;

interface IAnimation {
  state: boolean | string;
}

interface IChannelItem {
  isActive: boolean
}

interface IAddChannelButton {
  isForm: boolean
}