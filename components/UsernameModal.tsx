import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setUsername, submitUsername } from '../redux/gameSlice';
import { ScoreBoardProps } from '@/types/interface';

const UsernameModal: React.FC<ScoreBoardProps> = ({ scores }) => {
  const username = useSelector((state: RootState) => state.game.username);
  const isUsernameSubmitted = useSelector((state: RootState) => state.game.isUsernameSubmitted);
  const dispatch = useDispatch();
  const names = [...scores.map(item => item.username)]
  const handleUsernameSubmit = ()  => {
    if (names.indexOf(username) >= 0) {
      alert("Username already exists")
      dispatch(submitUsername(false))
    } else {
      dispatch(submitUsername(true))
    }
  }

  return (
    !isUsernameSubmitted && (
      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000
      }}>
        <form
          onSubmit={() => handleUsernameSubmit()}
          style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '300px'
          }}
        >
          <h2>Kullanıcı Adı Gir</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
            placeholder="Username"
            style={{ padding: '10px', fontSize: '16px' }}
            required
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              fontSize: '16px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Başla
          </button>
        </form>
      </div>
    )
  );
}

export default UsernameModal;
