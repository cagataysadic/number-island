import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setUsername, submitUsername } from '../redux/gameSlice';
import { Score, ScoreBoardProps } from '@/types/interface';

const UsernameModal: React.FC<ScoreBoardProps> = ({ scores }) => {
  const username = useSelector((state: RootState) => state.game.username);
  const isUsernameSubmitted = useSelector((state: RootState) => state.game.isUsernameSubmitted);
  const dispatch = useDispatch();
  const names = [...scores.map(item => item.username)];
  const handleUsernameSubmit = ()  => {
    if (names.indexOf(username) >= 0) {
      alert("Username already exists");
      dispatch(submitUsername(false));
    } else {
      dispatch(submitUsername(true));
    }
  }

  return (
    !isUsernameSubmitted && (
      <div className='mt-5'>
        <form
          onSubmit={() => handleUsernameSubmit()}
          className='bg-cyan-300 p-8 rounded-lg flex flex-col gap-8 w-96'
        >
          <h2 className='text-lg'>Kullanıcı Adı</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
            placeholder="Username"
            className='p-2 text-base border border-black rounded-sm'
            required
          />
          <button
            type="submit"
            className='p-2 text-base bg-blue-500 text-white border-none rounded-sm cursor-pointer'
          >
            Başla
          </button>
        </form>
      </div>
    )
  );
}

export default UsernameModal;
