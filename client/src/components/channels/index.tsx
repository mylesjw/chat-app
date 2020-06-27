import React, {useState, useEffect, useRef, FunctionComponent} from 'react';
import {Transition} from 'react-transition-group';
import {
  ChannelContainer,
  AddChannelButton,
  ChannelItem,
  ChannelInput,
  ChannelForm,
  ChannelScroll
} from './styles'

interface IChannel {
  name: String,
  id: String
}

interface IChannelProps {
  channels: Array<IChannel>,
  onChannelClick: (channel: IChannel) => void,
  createChannel: (channelName: string) => void,
  currentChannel: IChannel,
}



const Channel: FunctionComponent<IChannelProps> = (props: IChannelProps) => {
  const [showNewChannelForm, setShowNewChannelForm] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");

  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef])

  const showNewChannelModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowNewChannelForm(!showNewChannelForm);
  }

  const createNewChannel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.createChannel(newChannelName);
    setShowNewChannelForm(false);
    setNewChannelName('');
  }

  const onChannelNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChannelName(e.target.value);
  }

  return (
    <ChannelContainer>
      <ChannelScroll>
        {props.channels && props.channels.map(channel => (
          <ChannelItem isActive={props.currentChannel?.id == channel.id} onClick={(e: React.MouseEvent<HTMLLIElement>) =>{
            e.preventDefault();
            props.onChannelClick(channel);
          }}>
            <span>{channel.name}</span>
          </ChannelItem>
        ))}
      </ChannelScroll>
      <AddChannelButton isForm={showNewChannelForm} onClick={showNewChannelModal}>
        <Transition timeout={0} in={showNewChannelForm}>
          {state => (
            <ChannelForm onClick={(e: React.MouseEvent<HTMLFormElement>) => e.stopPropagation()}
                onSubmit={createNewChannel}
                state={showNewChannelForm}>
              <ChannelInput type="text" placeholder="Enter Channel Name"
                    ref={inputRef}
                    value={newChannelName}
                    onChange={onChannelNameChange}
                    state={state}/>
            </ChannelForm>
          )}
        </Transition>
            <span>&#43;</span>
      </AddChannelButton>
    </ChannelContainer>
  )
}

export default Channel;