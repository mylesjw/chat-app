import styled from "styled-components";

export const ChannelContainer = styled.div`
  flex-basis: 20%;
  height: 100%;
  border-right: 1px solid rgba(55, 0, 179, 0.5);
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const AddChannelButton = styled.div`
  border-radius: 50%;
  background-color: rgba(55, 0, 179, 0.5);
  height: 40px;
  width: 40px;
  margin-top: auto;
  text-align: center;
  cursor: pointer;
  align-self: center;
  
  span {
    font-size: 24px;
    margin-top: 5px;
    display: block;
  }
`;

export const ChannelItem = styled.div<IChannelItem>`
  padding: 12px 8px;
  background-color: ${props => props.isActive 
    ? '#3700B3' : '#6200EE'};
  cursor: pointer;
  text-align: center;
  color: #ffffff;
  
  &:hover {
    background-color: #3700B3;
  }
`;

interface IChannelItem {
  isActive: boolean
}