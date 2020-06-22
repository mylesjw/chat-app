import React, {useEffect, useState, FunctionComponent, MouseEvent} from 'react';
import {
  ChannelContainer,
  AddChannelButton,
  ChannelItem
} from './styles'

interface IChannel {
  name: String,
  id: String
}

interface IChannelProps {
  channels: Array<IChannel>,
  onChannelClick: (channel: IChannel) => void,
  onNewChannel: (event: MouseEvent<HTMLDivElement>) => void
}

const Channel: FunctionComponent<IChannelProps> = (props: IChannelProps) => {
  return (
    <ChannelContainer>
      {props.channels && props.channels.map(channel => (
        <ChannelItem onClick={(e: MouseEvent<HTMLDivElement>) =>{
          e.preventDefault();
          props.onChannelClick(channel);
        }}>
          <span>{channel.name}</span>
        </ChannelItem>
      ))}
      <AddChannelButton onClick={props.onNewChannel}>
        <span>&#43;</span>
      </AddChannelButton>
    </ChannelContainer>
  )
}

export default Channel;